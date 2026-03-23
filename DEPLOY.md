# ProposalPilot — Deploy in 5 Minutes

## Quick Start (Local)

```bash
cd proposalpilot
npm install
npm run dev
# Open http://localhost:3000
```

The app works immediately with the built-in template engine. No API keys needed for basic proposal generation.

## Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ProposalPilot v1"
   gh repo create proposalpilot --public --push
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Vercel auto-detects Next.js — click **Deploy**

3. **Add Environment Variables** (in Vercel dashboard → Settings → Environment Variables)

   | Variable | Required | Description |
   |----------|----------|-------------|
   | `OPENAI_API_KEY` | Optional | Enables AI-powered proposals (falls back to templates without it) |
   | `STRIPE_SECRET_KEY` | Optional | Enables paid subscriptions |
   | `STRIPE_PRICE_ID_PRO` | Optional | Stripe Price ID for the $49/mo Pro plan |
   | `STRIPE_PRICE_ID_AGENCY` | Optional | Stripe Price ID for the $199/mo Agency plan |
   | `NEXT_PUBLIC_APP_URL` | Optional | Your production URL (e.g., `https://proposalpilot.com`) |

4. **Done!** Your app is live at `your-project.vercel.app`

## Set Up Stripe (When Ready for Payments)

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. In Stripe Dashboard → Products, create two products:
   - **Pro** — $49/month recurring
   - **Agency** — $199/month recurring
3. Copy the Price IDs (starts with `price_...`) into your Vercel env vars
4. Copy your Secret Key (starts with `sk_...`) into `STRIPE_SECRET_KEY`

## Set Up AI Generation (Optional)

Without an API key, ProposalPilot uses a sophisticated template engine that generates professional proposals instantly. To enable AI-powered generation:

1. Get an [OpenAI API key](https://platform.openai.com/api-keys)
2. Add `OPENAI_API_KEY` to your Vercel environment variables
3. Redeploy

## Custom Domain

1. Buy a domain (e.g., `proposalpilot.com` — ~$12/year on Namecheap)
2. In Vercel → Settings → Domains, add your domain
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_APP_URL` to your new domain

## Architecture

```
proposalpilot/
├── app/
│   ├── page.tsx              # Landing page (speed-focused)
│   ├── generate/page.tsx     # Proposal generation tool
│   ├── api/generate/route.ts # AI + template generation API
│   └── api/checkout/route.ts # Stripe checkout API
├── components/               # React components
├── lib/                      # Usage tracking utilities
└── public/                   # Static assets
```

## Cost Breakdown

- **Vercel Hobby** (free): Handles up to ~100K requests/month
- **Domain**: ~$12/year
- **OpenAI**: ~$0.002 per proposal (GPT-3.5-turbo)
- **Stripe**: 2.9% + 30¢ per transaction

**Total to launch: ~$12** (just the domain)
