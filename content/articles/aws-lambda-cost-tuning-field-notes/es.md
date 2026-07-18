---
title: 'Ajuste de costos en AWS Lambda: notas de campo'
description: Cómo recortamos una factura serverless aproximadamente a la mitad con memoria bien dimensionada, batching y preguntas honestas sobre qué necesitaba ser una Lambda.
date: 2026-03-30
tags:
  - aws
  - devops
---

Las facturas serverless crecen en silencio. Cada función cuesta centavos,
nadie mira el total, y un día finanzas pregunta por qué el rubro se duplicó.
Estas notas salen de una de esas auditorías en una plataforma de ingesta
orientada a eventos.

## La memoria también es CPU

Lambda asigna CPU en proporción a la memoria, así que la configuración más
barata rara vez es la más baja. Un parser limitado por CPU a 128 MB corría 9
segundos; a 1024 MB terminaba en un segundo. Ocho veces el precio por
milisegundo, nueve veces menos milisegundos: un poco más barato *y*
dramáticamente más rápido.

No adivines: [AWS Lambda Power Tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning)
corre tu función en varios tamaños de memoria y dibuja la curva costo-duración.
Casi todas nuestras funciones tenían un codo claro; casi ninguna estaba en él.

## Deja de pagar por evento

Nuestro peor caso procesaba mensajes de SQS de a uno: una invocación por
mensaje, la mayor parte gastada abriendo conexiones. Tres ajustes cambiaron la
economía:

- **Batch size** subido de 1 a 50, con reporte de fallos parciales de batch
  para que un mensaje malo no envenene el lote.
- **Ventana de batching** de 20 segundos, dejando que las colas llenen lotes
  en horas tranquilas en lugar de invocar por goteo.
- **Reutilización de conexiones** moviendo los clientes fuera del handler,
  algo que el diseño por-mensaje había vuelto inútil.

Las invocaciones cayeron ~95% y el costo de la función dejó de ser visible en
la factura.

## Algunas Lambdas deberían ser contenedores

Una función corría cada cinco minutos, tardaba cuatro y necesitaba 3 GB. Eso
no es un manejador de eventos; es un batch job disfrazado. Movida a una tarea
programada de Fargate costó un tercio y perdió su ansiedad por el timeout. El
caso inverso también se dio: un servicio ECS 24/7 que atendía doce requests al
día se volvió Lambda y quedó prácticamente gratis.

El patrón detrás de todo: el pricing serverless es una lupa sobre la
honestidad arquitectónica. El trabajo pesado y constante quiere capacidad
reservada; el trabajo liviano y esporádico quiere Lambda: la factura solo te
dice cuál de los dos tienes en realidad.
