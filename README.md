# Marvlosphere Technologies — Company Website

A professional 5-page company website for **Marvlosphere Technologies**
(CAC BN: 9652069), built with **Next.js 14** and **Tailwind CSS**, ready to
deploy on **Vercel** at `marvlosphere.xyz`.

## Pages

| Page    | URL         | Purpose                                            |
| ------- | ----------- | -------------------------------------------------- |
| Home    | `/`         | Hero, FUTABallot product, about brief, contact     |
| About   | `/about`    | Full company description + CAC registration details |
| Products| `/products` | FUTABallot in detail + "more coming soon"          |
| Contact | `/contact`  | Contact form (UI only) + company details           |
| Privacy | `/privacy`  | Privacy Policy                                      |

## Run it on your own computer

You need **Node.js 18.17 or newer** installed (get it from https://nodejs.org).

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the site at http://localhost:3000
```

Open http://localhost:3000 in your browser.

To make a production build:

```bash
npm run build
npm run start
```

## Edit company details

All company info (name, email, phone, CAC number, address, links) lives in
one file: **`lib/company.js`**. Change it there and it updates across every page.

## Deploy to Vercel

See the step-by-step guide your assistant provided, or in short:

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com, sign in with GitHub, and import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**.
4. Add your domain `marvlosphere.xyz` under **Settings → Domains**.

### Environment variable (optional)

In Vercel → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SITE_URL = https://marvlosphere.xyz
```

## Tech stack

- Next.js 14 (App Router)
- Tailwind CSS 3
- Fully static, responsive, and accessible (keyboard focus + reduced-motion)
