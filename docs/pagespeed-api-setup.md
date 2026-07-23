# PageSpeed Insights API Key Setup (Optional)

The `/website-audit` tool calls Google's **PageSpeed Insights v5** API to generate
real Lighthouse reports. It works out of the box with **no API key** — but
unauthenticated requests are subject to Google's stricter rate limits. Setting
a free API key raises those limits.

## 1. Enable the API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project (or select an existing one).
3. Go to **APIs & Services → Library**.
4. Search for **"PageSpeed Insights API"** and click **Enable**.

## 2. Create an API key

1. Go to **APIs & Services → Credentials**.
2. Click **Create Credentials → API key**.
3. Copy the generated key.
4. (Recommended) Click **Restrict key** and limit it to the **PageSpeed Insights API**
   so it can't be used for anything else if it leaks.

## 3. Add it to your environment

**Local development** — add to `.env.local` (never commit this file):

```env
PAGESPEED_API_KEY=your_key_here
```

**Vercel (production)**:

1. Go to your project on [vercel.com](https://vercel.com/) → **Settings → Environment Variables**.
2. Add a variable named `PAGESPEED_API_KEY` with your key as the value.
3. Redeploy. No code changes are needed — `src/app/api/audit/route.ts` automatically
   appends `&key=...` to the PageSpeed Insights request when the variable is set,
   and simply omits it (still working, just rate-limited) when it isn't.

## Notes

- The API is free; Google's PageSpeed Insights API has no billing requirement for
  typical usage volumes, but very high traffic may eventually hit Google's quotas.
- No key is required for local development or to ship this feature — it's purely
  an optional upgrade to avoid rate-limit errors under heavier traffic.
