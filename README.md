# Portfolio de Esneider Bravo

Portafolio profesional construido con **Next.js 16 + TypeScript**, inspirado en el sistema visual KINETIC (minimalist developer stack).

## Requisitos

- Node.js 20+
- npm 10+

## Inicio rapido

```bash
cd /Users/esneiderbravo/LendingFront/portfolio
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Validacion

```bash
cd /Users/esneiderbravo/LendingFront/portfolio
npm run validate
```

`validate` ejecuta: lint + typecheck + tests + build.

## Estructura principal

- `app/page.tsx`: pagina principal y secciones del portafolio
- `app/globals.css`: tokens visuales y layout
- `src/content/portfolio.ts`: contenido personal editable
- `src/types/portfolio.ts`: tipado del contenido
- `tests/content.test.ts`: pruebas de humo del contenido
- `scripts/validate.mjs`: pipeline local de validacion

## Personalizar tus datos

Edita `src/content/portfolio.ts` para actualizar:

- perfil (nombre, rol, bio, contacto)
- proyectos destacados
- stack tecnologico
- links sociales

