---
title: Feature flags para equipos pequeños, sin plataforma
description: Una tabla de flags, un decorador y tres reglas de ciclo de vida. Todo lo que un equipo backend pequeño necesita antes de comprar una plataforma de feature flags.
date: 2026-01-28
tags:
  - python
  - fastapi
  - devops
---

Las plataformas de feature flags son geniales, y la mayoría de equipos
pequeños las adopta unos dos años antes de necesitarlas. Este es el setup de
menos de 100 líneas que llevó a nuestro equipo por docenas de rollouts
graduales, y las reglas de ciclo de vida que importan más que la herramienta.

## La implementación completa

Una tabla, un loader cacheado y un check:

```python
class FeatureFlag(Base):
    __tablename__ = "feature_flags"
    name: Mapped[str] = mapped_column(primary_key=True)
    enabled: Mapped[bool] = mapped_column(default=False)
    rollout_percent: Mapped[int] = mapped_column(default=0)
    allow_list: Mapped[list[str]] = mapped_column(JSONB, default=list)

async def is_enabled(flag: str, subject_id: str) -> bool:
    f = await flags_cache.get(flag)          # TTL de 30s
    if f is None or not f.enabled:
        return False
    if subject_id in f.allow_list:
        return True
    bucket = crc32(f"{flag}:{subject_id}".encode()) % 100
    return bucket < f.rollout_percent
```

El hash hace el rollout pegajoso por sujeto: un cliente en el 20% se queda en
el 20% mientras subes el dial, en lugar de parpadear entre caminos de código
en cada request. Cambiar un flag es un `UPDATE`, efectivo dentro del TTL de la
caché, sin deploy.

## Las reglas que lo mantienen sano

**Los flags son ramas en el sentido de code review.** Ambos caminos se
testean, y el PR del flag incluye el ticket de eliminación. Un flag sin fecha
de retiro no es un rollout, es configuración permanente disfrazada.

**Un flag por comportamiento, nunca anidados.** En el momento en que aparece
`if flag_a and not flag_b`, tienes cuatro estados y nadie ha corrido tres.
Aplana a un solo flag o a un setting explícito con valores de enum.

**Loguea la decisión.** Cada check registra nombre del flag, sujeto y
resultado en el contexto del request. Cuando soporte pregunta "por qué este
cliente vio el flujo viejo", la respuesta es una consulta, no una
investigación.

## Cuándo graduarse

Nos movimos a una plataforma hospedada cuando gente no técnica necesitó
manejar flags y cuando quisimos rollouts porcentuales coordinados entre tres
servicios. Esas son necesidades reales; un equipo de cinco personas con un
solo backend todavía no las tiene. La versión de tabla cuesta una tarde y te
enseña exactamente qué exigirle a la plataforma después.
