# Operado 24h — Digital Employee

Projeto de landing page para o conceito de **Funcionário Digital Autônomo**.

O aplicativo Next.js está na pasta [`web/`](./web/). Consulte o [README do web](./web/README.md) para instalação e execução.

## Deploy na Netlify

O arquivo [`netlify.toml`](./netlify.toml) na raiz já define:

- **Build:** `npm ci --prefix web && npm run build --prefix web`
- **Publish directory:** `web/out` — é aqui que fica o `index.html` (gerado pelo Next, não versionado no Git)

No painel Netlify → **Build & deploy**, use a **raiz do repositório** (onde está o `netlify.toml`). **Publish directory** deve ser `web/out`, não `web` nem a raiz vazia.

**Deploy manual (arrastar pasta):** rode `npm run build` na raiz, depois envie o **conteúdo** de `web/out` (incluindo `index.html` e a pasta `_next`).

Se aparecer 404, quase sempre a pasta publicada não tinha `index.html` — build não rodou ou o caminho estava errado.
