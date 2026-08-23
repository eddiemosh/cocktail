# 🍹 Cocktail Bar

A family cocktail ordering app built with Next.js 16 and Tailwind CSS.

## Features

- 🍸 **Order cocktails** — choose from 6 base cocktails
- 🎨 **Customise** — add flavours, syrups, garnishes, ice level & grenadine colouring
- 📋 **Kitchen view** — outstanding orders page that auto-refreshes every 10 seconds
- ✅ **Mark as done** — complete orders from the kitchen view
- 🏷️ **Named orders** — submit orders with your name

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

### With file storage (local/simple hosting)

Deploy normally — orders are stored in `data/orders.json` on the server.  
**Note:** Vercel's serverless functions have ephemeral storage; data resets on cold starts.

### With Vercel KV (recommended for Vercel)

1. In your Vercel project dashboard, go to **Storage → Create Database → KV**
2. Link the database to your project (this adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars automatically)
3. Deploy — orders will be persisted in Redis

```bash
npm i -g vercel
vercel
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Order form (select cocktail → customise → confirm) |
| `/orders` | Kitchen view — all pending/completed orders |
