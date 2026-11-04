# AbbaFit

App de treino cristão: treino de musculação com a Palavra no descanso entre as séries, cardio de oração guiado, jornadas de leitura e perfil com marcos.

## Rodar

```bash
bun install
bun run dev        # desenvolvimento
bun run build      # gera dist/ (site estático)
PREVIA=1 bunx vite build   # gera dist-previa/index.html (um arquivo só)
```

## Estrutura

- `src/conteudo/` — conteúdo do app: versículos (Bíblia Livre, CC BY 4.0), treinos, jornadas, cardios e marcos.
- `src/lib/estado.tsx` — dados do usuário. Nesta versão ficam no celular (localStorage); a troca para o Supabase acontece aqui.
- `src/telas/` — telas (boas-vindas, início, treinar, sessão com descanso, cardio, jornada, perfil).
- `src/componentes/` — marca, cartão da Palavra, imagem para os stories.

## Identidade

Azul e branco. Archivo (largo nos títulos) + Newsreader (a Palavra). A tela de descanso em azul-noite é o momento marcante do app.

Texto bíblico: Bíblia Livre (BLIVRE), Creative Commons Atribuição 4.0 — https://ebible.org/porbr2018/
