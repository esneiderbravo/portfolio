---
title: 'TDD práctico: cuándo sí y cuándo no'
description: Test-first es una herramienta, no una religión. Los tipos de código donde el TDD se gana su lugar, y aquellos donde escribo los tests después.
date: 2026-05-06
tags:
  - tdd
  - python
---

Escribo tests primero para cierto código y tests después para otro, y la
división no es pereza. Tras años de construir backends, el patrón es lo
bastante consistente como para dejarlo por escrito.

## Donde test-first gana de verdad

**Reglas de negocio con muchos casos.** Devengo de intereses, cascadas de
comisiones, reglas de elegibilidad. La lista de tests hace de especificación,
y escribirla primero expone los casos que el ticket olvidó. Cuando la
implementación existe, los casos borde ya están codificados.

**Corrección de bugs, siempre.** Reproduce el bug en un test que falla antes
de tocar el código. Mantiene el arreglo honesto y hace imposible reintroducir
la regresión en silencio. Es el hábito de mayor retorno de todo este post.

**Parsers y validadores.** Todo lo que convierte entrada sucia en datos
estructurados tiene ejemplos adversariales que vale listar de entrada: el
string vacío, el delimitador doble, la fecha que solo existe en una zona
horaria.

## Donde test-first pelea contigo

**Código exploratorio.** Cuando todavía no sé cuál debería ser la interfaz,
los tests escritos primero calcifican una suposición. Hago un spike, aprendo
la forma, tiro el spike y entonces escribo tests para lo real.

**Pegamento delgado.** Un router que parsea un request y llama a un servicio
no necesita un test escrito primero; necesita un test de integración escrito
alguna vez.

**Detalles de UI.** TDD guiado por snapshots sobre código visual produce tests
que afirman lo que sea que el código hizo.

## La disciplina real

La parte valiosa del TDD nunca fue la ceremonia; son dos propiedades que
puedes conservar incluso escribiendo tests después:

1. **Los tests describen comportamiento, no implementación.** Si renombrar una
   función privada rompe tests, estaban mirando lo equivocado.
2. **Has visto fallar cada test.** Un test cuyo fallo nunca presenciaste es
   una esperanza, no una verificación. Al escribir tests después, rompe el
   código a propósito un segundo para ver al test atraparlo.

Regla práctica: cuanto más el código son *decisiones* (reglas, matemática,
ramificación), más temprano los tests. Cuanto más es *cableado*, más tarde, y
más deberían tener forma de integración.
