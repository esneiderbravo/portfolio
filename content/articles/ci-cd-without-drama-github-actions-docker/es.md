---
title: 'CI/CD sin drama: GitHub Actions + Docker'
description: El pipeline mínimo que uso para desplegar con confianza varias veces al día, y las pocas reglas que lo mantienen aburrido.
date: 2026-06-15
tags:
  - devops
  - aws
  - docker
---

Cada pipeline de deploy que he heredado era o tan delgado que no probaba nada
o tan elaborado que nadie se atrevía a tocarlo. El punto medio al que siempre
vuelvo cabe en un archivo de workflow y cuatro reglas.

## Las cuatro reglas

1. **La imagen que pruebas es la imagen que despliegas.** Se construye una
   vez, se etiqueta con el SHA del commit, los tests corren contra esa imagen
   exacta y esa imagen exacta se publica. Nada de reconstruir entre CI y
   producción.
2. **Todos los checks corren en todos los PRs.** Lint, tipos, tests, build.
   Si un check es demasiado lento para PRs, hazlo más rápido en lugar de
   saltártelo.
3. **Los deploys los disparan los merges, no los humanos.** `main` siempre es
   desplegable; hacer merge es el botón de deploy.
4. **El rollback es redesplegar el tag anterior.** Nada de procedimientos
   artesanales de fix-forward a las 2 a. m.

## El workflow

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t app:${{ github.sha }} .
      - run: docker run --rm app:${{ github.sha }} make check

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR
          docker push $ECR/app:${{ github.sha }}
          aws ecs update-service --force-new-deployment \
            --cluster prod --service app
```

Eso es de verdad casi todo. El target `make check` corre los mismos comandos
de lint, tipos y tests que los desarrolladores corren en local, así que un
fallo de CI se reproduce en cualquier laptop con Docker.

## Las partes que la gente se salta

**Los health checks controlan el rollout.** ECS solo mueve tráfico cuando la
tarea nueva pasa su endpoint de salud, y el endpoint verifica dependencias
reales (la base de datos responde, las migraciones están aplicadas), no solo
"el proceso está vivo".

**Las migraciones corren antes que el código nuevo, en una tarea aparte.**
Deben ser retrocompatibles con el release anterior, porque durante unos
minutos ambos conviven. Esa restricción suena molesta y en realidad es un
regalo: obliga a cambios de esquema aditivos.

**La caché de build lo mantiene rápido.** El orden de capas (dependencias
primero, código al final) más la caché del registry de GitHub deja el pipeline
promedio por debajo de seis minutos. Un pipeline rápido es la diferencia entre
desplegar a diario y acumular una semana de riesgo en un deploy de viernes.

Lo aburrido es la funcionalidad. Cuando el pipeline es lo bastante pequeño
para leerse de una sentada, cualquiera del equipo puede arreglarlo y nadie
construye un proceso manual paralelo alrededor.
