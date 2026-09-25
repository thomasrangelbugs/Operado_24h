# Digital Employee — Landing Page

Landing page responsiva do conceito **Funcionário 100% Digital** (nome provisório). Apresentação visual e técnica de um agente autônomo capaz de operar computadores como uma pessoa.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v3 (compatível com ambientes que bloqueiam bindings nativos do Tailwind v4)
- Framer Motion
- Lucide Icons
- Componentes no estilo shadcn/ui

## Estrutura

```
src/
  app/              # Layout, página principal, estilos globais
  components/       # UI, layout, hero, shared
  sections/         # Seções da landing (uma responsabilidade por arquivo)
  data/             # Conteúdo editável (brand, navegação, stack, copy)
  lib/              # Utilitários
  types/            # Tipos compartilhados
```

### Alterar identidade

Edite `src/data/brand.ts` para nome, slogans, SEO e CTAs.

Conteúdos longos e listas estão em `src/data/content.ts`. Links oficiais das tecnologias em `src/data/technologies.ts`.

## Executar

```bash
cd web
cp .env.example .env.local   # opcional
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build e qualidade

```bash
npm run lint
npm run build   # usa Webpack (recomendado neste ambiente Windows)
npm start
```

Se o Windows bloquear binários nativos (`@next/swc-win32-x64-msvc`), o Next.js usa fallback WASM; o build deve concluir mesmo assim.

## Notas

- Página **conceitual**: mockups e animações, sem automação real.
- Dark mode padrão, mobile-first, `prefers-reduced-motion` respeitado nas animações principais.
