---
title: Construyendo un blog bilingüe con Next.js
description: Cómo este blog publica cada artículo en inglés y español desde markdown plano, con un contrato de frontmatter tipado y cero servicios en runtime.
date: 2026-07-18
tags:
  - nextjs
  - typescript
  - i18n
featured: true
---

Bienvenido al blog. Este primer post es también una prueba de humo del
pipeline de publicación: markdown de entrada, HTML generado estáticamente de
salida, en dos idiomas, sin servicios en runtime.

## Cómo funcionan los posts aquí

Cada post vive en su propia carpeta con un archivo markdown por idioma:

```text
content/articles/building-a-bilingual-blog-with-nextjs/
├── en.md
└── es.md
```

Los nombres de carpeta y los slugs son siempre kebab-case en inglés, incluso
para contenido que se lee sobre todo en español, para que las URLs se
mantengan estables y predecibles. El frontmatter se valida en build: una
traducción faltante, una fecha malformada o un tag que no sea kebab-case
rompe el build en lugar de publicar una página rota.

```ts
const post = getArticleBySlug('building-a-bilingual-blog-with-nextjs', 'en')
```

## Una fuente de verdad por dato

Los campos invariantes al idioma (`date`, `tags`, `featured`, `draft`) se
leen solo de `en.md`, así los dos archivos nunca pueden estar en desacuerdo
sobre cuándo se publicó un post o cómo está categorizado. Los títulos y
descripciones son por idioma, porque un buen título se escribe, no se traduce
palabra por palabra.

## ¿Por qué no i18n por rutas?

El enfoque clásico son espejos `/es/blog/...` de cada página. Este sitio
mantiene deliberadamente una URL por post y cambia el idioma del lado del
cliente: ambos payloads de idioma se incrustan en build y el toggle los
intercambia sin navegación. El lector conserva su posición de scroll, la URL
que comparte funciona para cualquiera y la salida estática sigue siendo una
sola página por post.

## Lo que el pipeline se niega a hacer

Sin base de datos, sin CMS, sin llamadas a APIs al momento del request. El
blog completo son archivos en un repositorio git, revisados en pull requests
como cualquier otro código y renderizados a HTML estático en build. Si este
post es visible, el pipeline funciona.
