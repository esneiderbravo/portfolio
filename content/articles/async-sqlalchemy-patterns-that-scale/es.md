---
title: Patrones de SQLAlchemy async que sobreviven a producción
description: Alcance de sesión, trampas de lazy loading y dimensionamiento del pool de conexiones para servicios FastAPI sobre SQLAlchemy 2.0 async.
date: 2026-02-10
tags:
  - python
  - postgresql
  - fastapi
---

El soporte async de SQLAlchemy 2.0 es excelente e implacable. Los patrones que
eran levemente derrochadores en código síncrono se convierten en deadlocks y
errores crípticos de `MissingGreenlet` en async. Estas son las reglas en las
que convergió nuestro equipo tras un año corriéndolo en producción.

## Una sesión por request, inyectada

La sesión tiene alcance de request, la crea una dependencia, hace commit en
éxito, rollback en error y siempre se cierra:

```python
async def get_session() -> AsyncIterator[AsyncSession]:
    async with session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
```

Nada de sesiones creadas dentro de servicios, nada de sesión-por-query, nada
de sesión global. Cada violación de esta regla termina apareciendo como una
fuga de conexiones bajo carga.

## El lazy loading es una trampa; conviértelo en error

Acceder a una relación no cargada en async lanza `MissingGreenlet`,
normalmente lejos de la query, durante la serialización de la respuesta. En
lugar de regar `await session.refresh()` por todos lados, hicimos el lazy
loading imposible y la carga explícita:

```python
class Base(DeclarativeBase):
    __mapper_args__ = {"lazy": "raise"}
```

Ahora cada relación se carga con `selectinload()` o `joinedload()` en la
query, donde se ve, o la query falla ruidosamente en tests en lugar de
silenciosamente en producción.

## El tamaño del pool es un presupuesto, no una intuición

Cada worker mantiene su propio pool. La aritmética que importa:

```text
workers x (pool_size + max_overflow) <= max_connections de postgres - margen
```

Corremos 4 workers con `pool_size=10, max_overflow=5`, que topa en 60
conexiones contra las 100 de Postgres, dejando espacio para migraciones, crons
y humanos con `psql`. Cuando violamos esto (8 workers, defaults), el síntoma
no fue un error sino picos de latencia p99 mientras los requests hacían fila
por conexiones. `pool_timeout=5` con un log ruidoso convirtió esa fila
silenciosa en una señal visible.

## El resumen en una línea

Las sesiones tienen alcance de request y se inyectan; la carga de relaciones
es explícita o es un error; la matemática del pool está escrita en el archivo
de configuración junto a los números. Todo lo demás de SQLAlchemy async ha
sido placenteramente aburrido.
