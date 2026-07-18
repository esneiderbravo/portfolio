---
title: Arquitectura limpia en FastAPI sin sobre-ingeniería
description: Dónde trazo las fronteras de capas en un servicio FastAPI real, y dónde dejo de trazarlas a propósito.
date: 2026-06-02
tags:
  - clean-architecture
  - fastapi
  - python
---

Las discusiones de arquitectura limpia suelen saltar directo a diagramas con
cinco círculos concéntricos. La mayoría de servicios FastAPI necesitan
exactamente tres capas, y la disciplina no está en añadir capas sino en
respetar las dos fronteras entre ellas.

## Las tres capas

```text
routers/      HTTP: parseo de requests, códigos de estado, dependencias de auth
services/     lógica de negocio: Python casi puro, sin HTTP, sin queries de ORM
repositories/ persistencia: todo SQLAlchemy vive aquí
```

Las reglas que importan:

- **Los routers nunca tocan el ORM.** Un router parsea la entrada, llama a una
  función del servicio y da forma a la respuesta. Si un router tiene un
  `select()` dentro, la frontera ya se perdió.
- **Los servicios nunca importan FastAPI.** Ni `Request` ni `HTTPException`.
  Los servicios lanzan errores de dominio (`InsufficientFunds`,
  `LoanNotFound`) y un exception handler los mapea a códigos de estado en un
  solo lugar.
- **Los repositorios devuelven objetos de dominio, no filas.** La capa de
  servicio no debería saber si los datos vinieron de Postgres, de una caché o
  de un fake de test.

## Lo que me salto a propósito

**Nada de clases use-case con un solo método.** Un módulo de funciones planas
hace el mismo trabajo con menos ceremonia. Cuando una función necesita
dependencias compartidas, un parámetro explícito gana a una clase que lo
guarda.

**Nada de interfaces de repositorio "por si cambiamos de base".** No vamos a
cambiar Postgres. Los tests usan la base real en un contenedor; los fakes
aparecen solo donde lo real es lento o externo (pasarelas de pago, llamadas a
LLMs).

**Nada de cadenas de mapeo DTO a entidad a modelo.** Esquemas Pydantic en el
borde, dataclasses de dominio adentro y una función honesta de mapeo entre
ambos. Tres representaciones ya es suficiente.

## El beneficio, en concreto

En una plataforma de préstamos esta estructura significó que las reglas de
underwriting vivieran en `services/underwriting.py` como funciones planas
sobre dataclasses. Cuando negocio preguntó "qué cambiaría si bajamos el score
mínimo", respondimos corriendo la capa de servicio contra un CSV de
solicitudes históricas. Sin HTTP, sin base de datos, solo imports. Ese
análisis tomó minutos porque la frontera ya existía.

La sobre-ingeniería y la sub-ingeniería fallan igual: el código deja de
decirte dónde va cada cosa. Tres capas y dos fronteras respetadas es la
estructura más pequeña que conozco que mantiene la respuesta obvia.
