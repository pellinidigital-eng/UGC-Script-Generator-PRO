# UGC Script Generator PRO

Micro-SaaS premium client-side per generare script UGC, Reels, TikTok, Meta Ads e YouTube Shorts pronti da registrare.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Nessun database
- Nessuna API esterna
- Motore euristico locale con randomizzazione pesata, seed dinamico e memoria temporanea in `localStorage`

## Comandi

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Deploy

Il progetto e' pronto per Vercel: importa la cartella, installa le dipendenze da `package.json` e usa il comando build standard `next build`.

## Accesso protetto

Il tool accetta accessi dal portale WordPress PelliniDigital tramite `GET /access?token=...`.
Il token WordPress viene verificato lato server e scambiato con un cookie `HttpOnly` firmato, valido 6 ore.

Variabili ambiente richieste:

```bash
PELLINIDIGITAL_TOOL_ACCESS_SECRET=
PELLINIDIGITAL_TOOL_ACCESS_KEY_ID=pd-tool-access-v1
PELLINIDIGITAL_TOKEN_ISSUER=https://pellinidigital.it
PELLINIDIGITAL_TOOL_ID=ugc-script-generator
```

`PELLINIDIGITAL_TOOL_ACCESS_SECRET` deve essere configurato solo nell'ambiente Vercel e non deve essere inserito nel repository.
