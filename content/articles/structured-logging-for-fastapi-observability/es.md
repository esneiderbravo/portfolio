---
title: Logging estructurado en FastAPI que sí puedes consultar
description: Cómo pasamos un servicio FastAPI de logs tipo print a eventos estructurados con contexto de request, y las consultas que se volvieron posibles.
date: 2026-04-14
tags:
  - observability
  - fastapi
  - python
---

La diferencia entre logs que grepeas y logs que consultas es la diferencia
entre "creo que fue la lógica de retry" y "los requests del cliente X
empezaron a fallar a las 14:32 con timeouts en la dependencia de pagos". Este
es el setup que nos llevó ahí.

## Eventos, no frases

Las entradas de log son diccionarios con un nombre de evento estable y campos
tipados, no prosa con valores interpolados:

```python
log.info("disbursement_created",
         loan_id=loan.id, amount_cents=amount, channel="ach")
```

El nombre del evento es una constante que puedes contar, alertar y graficar.
Los campos son dimensiones. `structlog` hace el trabajo pesado, renderizado
como JSON en producción y como pares clave-valor con color en desarrollo.

## El contexto viene del middleware, no de argumentos

Nadie debería pasar un request id por quince llamadas de función. Un
middleware enlaza el contexto del request una sola vez, usando contextvars, y
cada línea de log de ese request lo hereda:

```python
@app.middleware("http")
async def bind_request_context(request: Request, call_next):
    structlog.contextvars.bind_contextvars(
        request_id=request.headers.get("x-request-id", str(uuid4())),
        client_id=getattr(request.state, "client_id", None),
        path=request.url.path,
    )
    try:
        return await call_next(request)
    finally:
        structlog.contextvars.clear_contextvars()
```

Seguro con async, invisible para el código de negocio, y de repente cada
evento lleva el quién y el dónde.

## Las tres reglas que lo mantuvieron útil

1. **Un log de acceso por request, emitido por el middleware,** con status,
   duración y el contexto enlazado. Los handlers registran solo eventos de
   dominio.
2. **Nunca loguear payloads.** Se registran ids y hechos derivados
   (`item_count=3`), no cuerpos. En fintech es regla de cumplimiento y en
   todos lados es buena higiene.
3. **Los errores se loguean una vez, en el borde.** El exception handler
   loguea con contexto completo; las capas internas lanzan y guardan
   silencio. Loguear y relanzar en cada nivel es como un fallo se convierte
   en cuarenta líneas de ruido.

## ¿Valió la pena?

La semana después del rollout, un partner reportó fallos intermitentes. Una
sola consulta (filtrar por su `client_id`, agrupar por `event`) mostró sus
requests chocando con un timeout en una única dependencia downstream,
empezando exactamente cuando su tráfico se duplicó. Diez minutos, sin ambiente
de reproducción, sin arqueología de grep. Ese único incidente pagó toda la
migración.
