# Hosting and Deployment

How the website gets from this code to the live internet.

## The three pieces

| Piece | What it does | Who owns it |
|---|---|---|
| **GitHub** | Stores the code. Repo: `https://github.com/Nickt204/nick-alexander` | Nick (account `Nickt204`); Michelle is a collaborator |
| **Netlify** (free plan) | Builds and hosts the live site. Rebuilds automatically whenever `main` changes | Nick |
| **GoDaddy** | Holds the domain name and its DNS settings only. It does not host the site | Confirm with Nick |

Flow: push to `main` on GitHub → Netlify builds the site → live site updates (usually within a minute or two).

## Netlify settings

- Build command: `npm run build`
- Publish directory: `dist`
- Auto-deploys from the `main` branch
- HTTPS certificate is provided by Netlify

## GoDaddy / DNS

GoDaddy points the domain at Netlify. Netlify supports two ways of doing this:

- an `A` record for `@` plus a `CNAME` for `www`, or
- switching the domain's nameservers to Netlify's.

**Confirm with Nick which one he used** before changing any DNS records.

## Repo is public (and why)

The repo was originally private. Michelle, as a collaborator, could not see it when trying to connect Netlify, so Nick set Netlify up himself and **changed the repo to public** so Netlify could keep working with it.

It was never confirmed whether the private repo would have worked if the right Netlify access had been granted. It could be made private again later, but Nick would need to check that Netlify still has access to it afterwards.

Because the repo is public, anyone can read all the code and its history:

- **Never commit `.env` files, API keys, passwords or tokens.** `.env` is in `.gitignore`.
- Anything starting with `VITE_` is bundled into the public website code, so never put a real secret in a `VITE_` variable.
- Checked (Nov 2026): no `.env` files are tracked or in git history, and the `VITE_BIG_CARTEL_*` variables in `.env` are not used by any code in `src/`.

## Two things the site needs to work when deployed

1. **`public/_redirects`** contains `/*  /index.html  200`. The site uses `BrowserRouter` with routes like `/artwork/:slug`. Without this file, refreshing or sharing an artwork link gives a 404 on Netlify.
2. **Images live in `public/images/`**, not a root `images/` folder. Vite's build only copies the `public/` folder, so images anywhere else show locally (`npm run dev`) but 404 on the live site. Reference them as `/images/filename.webp`.

## Checking changes before they go live

- Locally: `npm run build && npm run preview` shows the real production build.
- Safer publishing (suggested, not yet tried): work on a branch and open a pull request. Netlify should post a Deploy Preview link on it. Merging into `main` makes it live.
- Pushing straight to `main` publishes immediately. Wiki-only changes don't affect how the site looks.
- Run `git pull` before starting work so you have the latest changes.
