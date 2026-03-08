# Rapport

**Communication Intelligence for People Leaders**

A production-ready waitlist landing page. Live, fast, and storing real emails — built in an afternoon.

---

## The Problem This Repo Solves

Your client is a small business owner, a salesman, or an indie hacker. They need a website — a waitlist, a booking page, a simple lead capture. Something real, something live, something that works.

You have two options.

**Option A:** Spin up a full-stack app. Set up a cloud provider. Wire up a database. Deal with connection strings, schema migrations, deployment pipelines, and a server that goes to sleep on Render's free tier. Your client wants to see their signups. Now you're explaining pgAdmin. They wanted an Excel sheet.

**Option B:** This.

Next.js on Vercel. Airtable as the database. No servers to manage. No SQL. No cloud bills at small scale. Your client logs into Airtable and sees a spreadsheet with every email, timestamped, ready to export. Deploys in a minute. Every `git push` ships automatically.

This repo exists as a personal reminder: **don't use Kubernetes for Flappy Bird.** Match the tool to the scale. Build things properly at the right level of complexity. Pure ROI — but with craft.

---

## Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Full-stack in one repo, API routes included |
| Language | TypeScript | Type safety without the overhead of a separate backend |
| Styling | Tailwind CSS v4 | Utility-first, design tokens in CSS, zero config files |
| Icons | Lucide React | Clean, consistent, tree-shakeable |
| Fonts | next/font/google | Self-hosted at build time, zero layout shift |
| Database | Airtable | Your client already knows how to use a spreadsheet |
| Deployment | Vercel | Git push to ship, environment variables in the dashboard |

---

## What We Learned

### Next.js App Router
The App Router (introduced in Next.js 13, now the default) changes how you think about rendering. Every component is a **server component by default** — it renders on the server and sends HTML to the browser. You only opt into client-side rendering when you actually need it, by adding `"use client"` at the top of the file.

The rule of thumb we used throughout this project:
- Static markup, no interactivity → server component, no directive needed
- Needs `useState`, `useEffect`, or browser APIs → add `"use client"`

This matters for performance. Server components never ship their JS to the browser. The Nav (scroll detection) and Waitlist form (form state) are client components. Everything else — Hero, Problem, Features, Quote, Audience, Footer — is server-rendered HTML. Fast by default.

### Next.js Route Handlers
Any file named `route.ts` inside `app/api/` automatically becomes an API endpoint. No Express, no separate server, no port management. The `/api/waitlist` endpoint runs serverlessly on Vercel — it spins up on demand and costs nothing at low volume.

This is also where secrets live. The Airtable token is only ever read server-side inside the route handler. It never touches the browser, never appears in a network request the client makes. The form POSTs to `/api/waitlist`, your backend talks to Airtable. Clean separation.

### Tailwind CSS v4
Version 4 dropped the `tailwind.config.js` file entirely. Custom design tokens — colours, fonts, spacing — now live inside your CSS using `@theme`:

```css
@theme {
  --color-terra: #c4613a;
  --font-serif: "Lora", serif;
}
```

Once defined, these become Tailwind utility classes automatically. `bg-terra`, `text-terra`, `font-serif` — all available everywhere. Less files, same power.

### next/font/google
Never use a `<link>` tag to load Google Fonts in Next.js. The built-in `next/font/google` system downloads fonts at **build time** and serves them from your own domain. No external requests at runtime, no flash of unstyled text, better Lighthouse scores.

```ts
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
```

### Airtable as a Database
Airtable is not a production database for complex applications. It has rate limits, no relational integrity, and it doesn't scale to millions of rows. For a waitlist at the scale of hundreds or low thousands of signups, it is completely correct and genuinely better than a SQL database — because your client can open it, read it, filter it, and export it without you involved.

Key things we set up:
- **Personal Access Token** with scoped permissions (`data.records:read`, `data.records:write`) on a specific base only — principle of least privilege
- **Duplicate check before insert** — query by email before creating a record, return a 409 if it exists
- **Server-side email validation** — never trust the client alone
- **Normalised emails** — `toLowerCase().trim()` before storing and querying

### Vercel Deployment
Vercel is purpose-built for Next.js (they make both). The deployment model is:

1. Connect a GitHub repo
2. Add environment variables in the dashboard
3. Every push to `main` triggers a build and deploy automatically

Environment variables set in the Vercel dashboard are injected at build time and runtime — same as `.env.local` locally. The `.env.local` file never gets committed to Git (it's in `.gitignore` by default) and never reaches Vercel. You manage secrets in one place per environment.

---

## Project Structure

```
src/
  app/
    page.tsx                  # Assembles all sections
    layout.tsx                # Fonts, metadata, root HTML
    globals.css               # Tailwind v4 @theme tokens, animations
    api/
      waitlist/
        route.ts              # POST handler — validates, dedupes, writes to Airtable
  components/
    Nav.tsx                   # Fixed nav with scroll-aware backdrop (client)
    Hero.tsx                  # Full-height hero with entrance animations
    Problem.tsx               # Two-col layout with stats
    HowItWorks.tsx            # Four-step cards with hover sweep
    Features.tsx              # Six-feature grid
    Quote.tsx                 # Dark interlude section
    Audience.tsx              # Three audience cards
    Waitlist.tsx              # Email form with loading/success/error states (client)
    Footer.tsx                # Simple footer
    Divider.tsx               # Reusable horizontal rule
    RevealOnScroll.tsx        # IntersectionObserver wrapper for scroll animations (client)
```

---

## Vercel Deployment — Step by Step

Vercel is where your Next.js app lives in production. It's built by the same team that makes Next.js, so the integration is seamless. Every push to your `main` branch deploys automatically. No manual steps, no CI/CD config, no server to manage.

### 1. Push your code to GitHub
If you haven't already, create a new repository on [github.com](https://github.com):

1. Click **New repository**
2. Name it `rapport`
3. Set it to **Private**
4. Do **not** initialise with a README, .gitignore, or licence — your project already has these
5. Click **Create repository**

Then push your local project:
```bash
git remote add origin https://github.com/YOURUSERNAME/rapport.git
git branch -M main
git push -u origin main
```

### 2. Create a Vercel account
Go to [vercel.com](https://vercel.com) and click **Sign Up**. Choose **Continue with GitHub** — this lets Vercel see your repositories without any extra configuration.

### 3. Import your project
1. From your Vercel dashboard, click **Add New Project**
2. You'll see a list of your GitHub repositories — find `rapport` and click **Import**
3. Vercel will automatically detect it's a Next.js project — leave all build settings as they are

### 4. Add your environment variables
Before clicking deploy, scroll down to the **Environment Variables** section. Add all three variables — one at a time:

| Name | Value |
|---|---|
| `AIRTABLE_TOKEN` | Your Personal Access Token (`patXXX...`) |
| `AIRTABLE_BASE_ID` | Your Base ID (`appXXX...`) |
| `AIRTABLE_TABLE_NAME` | `Waitlist` |

These are the same values from your local `.env.local` file. Vercel stores them securely and injects them at build and runtime — your Airtable token never appears in the browser or in your Git history.

### 5. Deploy
Click **Deploy**. Vercel will build your project — this takes about a minute. When it finishes you'll see a confetti animation and a live URL ending in `.vercel.app`.

Click the URL and verify the full page loads correctly.

### 6. Verify the waitlist works in production
Submit a real email address on your live site. Open your Airtable base and confirm the record appears. This confirms your environment variables are set correctly in Vercel.

### 7. Ongoing deployments
From this point on, the workflow is simply:
```bash
git add .
git commit -m "your message"
git push
```
Vercel picks up the push automatically, builds, and deploys. You'll get a new deployment URL for every push — Vercel keeps a full history, and you can roll back to any previous deployment in one click from the dashboard.

### Custom domain (optional)
If your client has a domain:
1. Go to your project in the Vercel dashboard
2. Click **Settings → Domains**
3. Add the domain and follow the DNS instructions Vercel gives you
4. Vercel provisions an SSL certificate automatically.

Find the detailed step-by-step instructions here (will take 2 min): [Setup Custom Domain for your website With GoDaddy](./CUSTOM_DOMAIN.md)

---

## Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Airtable credentials in .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `AIRTABLE_TOKEN` | Personal Access Token from airtable.com/create/tokens |
| `AIRTABLE_BASE_ID` | The `appXXXXXXXXXXXXXX` ID from your base URL |
| `AIRTABLE_TABLE_NAME` | Exact table name as it appears in Airtable (e.g. `Waitlist`) |

These are never exposed to the client. They are read exclusively inside the API route handler.

---

## Airtable Setup — Step by Step

Airtable is the "database" in this stack. Think of it as a spreadsheet that accepts API calls. Your client never needs to know that — they just see a spreadsheet.

### 1. Create an account
Go to [airtable.com](https://airtable.com) and sign up. The free tier is sufficient for a waitlist.

### 2. Create a Base
A **Base** is Airtable's word for a database. A **Table** is a sheet inside it.

1. From your Airtable home, click **Create a base**
2. Name it whatever the project is — e.g. `Rapport`
3. It creates a default table called `Table 1` — double click the tab at the bottom of the screen and rename it to `Waitlist`

### 3. Set up your fields
Airtable gives you some default columns. Delete all of them and create exactly these two:

| Field name | Field type | Notes |
|---|---|---|
| `Email` | Email | This will be your primary field |
| `Signed Up At` | Date | Click into field options and enable **Include time** |

To delete a field: click the field header → click the field settings icon → Delete field.
To add a field: click the **+** button at the end of the field headers.

### 4. Get your Base ID
With your base open, look at the URL:
```
https://airtable.com/appXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX/viwXXXXXXXXXXXXXX
```
- `appXXXXXXXXXXXXXX` → **Base ID** — this is what you need
- `tblXXXXXXXXXXXXXX` → Table ID — ignore this, we use the table name instead
- `viwXXXXXXXXXXXXXX` → View ID — ignore this entirely
- Anything after `?` → ignore this too

Copy just the `appXXXXXXXXXXXXXX` part.

### 5. Create a Personal Access Token
This is the password your API route uses to talk to Airtable. Airtable only shows it to you once, so copy it immediately.

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **Create token**
3. Give it a name — e.g. `rapport-waitlist`
4. Under **Scopes**, add both:
   - `data.records:read` — needed for the duplicate email check
   - `data.records:write` — needed for inserting new records
5. Under **Access**, click **Add a base** and select your `Rapport` base specifically — do not grant access to your entire workspace
6. Click **Create token**
7. **Copy the token now** — you cannot see it again after closing this screen

### 6. Fill in your environment variables
In your project, open `.env.local` and fill in:
```bash
AIRTABLE_TOKEN=patXXXXXXXXXXXXXX.XXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Waitlist
```

The table name must match **exactly** — same capitalisation, same spelling — as the tab name in your Airtable base.

### 7. Verify it works locally
Start your dev server (`npm run dev`), submit a test email on the form, then open your Airtable base. The email should appear as a new row with a timestamp. Submit the same email again — the form should return "You're already on the waitlist."

---

## When to Use This Stack

**Use this when:**
- The client needs to see their data without your help
- The data is simple and tabular
- You're building at a scale of hundreds to low thousands of records
- Speed of delivery matters
- Budget is limited

**Don't use this when:**
- You need relational data across multiple tables
- You're expecting tens of thousands of records
- You need complex querying or aggregations
- Multiple services need to write to the same data simultaneously

---

## TODO

- [ ] **Bot protection — Cloudflare Turnstile**
  Honeypots can be trivially bypassed by smarter bots, and the nextjs rate limiter resets on every serverless cold start making it unreliable in production. Replace both with [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) — free with no usage limits, invisible or single-checkbox UX, and privacy friendly. Implementation is ~30 minutes: register a site on Cloudflare to get a site key and secret key, install `@marsidev/react-turnstile`, drop the `<Turnstile />` component into `Waitlist.tsx` to get a token on completion, send that token to the API route alongside the email, verify it against Cloudflare's endpoint before touching Airtable. One layer that replaces everything.

---

## Principles

This project was built with one idea in mind: **the right tool for the right scale**.

A waiting list does not need a Postgres database, a Docker container, a Redis cache, and a Kubernetes cluster. It needs to store an email address and show it to someone. Airtable does that. Vercel serves the frontend. Next.js handles the API. The whole thing costs nothing at small scale and takes an afternoon to build properly.

No hacks. No shortcuts on the things that matter — the API key is server-side, emails are validated and deduplicated, the code is typed, the components are structured correctly. Just no unnecessary complexity.

> *Don't use Kubernetes for Flappy Bird.*