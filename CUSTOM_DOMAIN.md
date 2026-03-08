# Connecting a GoDaddy Domain to Vercel

A step by step guide for the first time you do this and have absolutely no idea what's happening.

---

## The Big Picture — What is Actually Going On

When someone types `yourclient.com` into a browser, the internet has no idea where that website lives. It needs a forwarding address. That forwarding address is managed by something called **DNS — Domain Name System**. Think of it as the internet's phone book.

GoDaddy sold your client the domain name. That means GoDaddy currently holds the phone book entry for `yourclient.com`. Right now that entry points nowhere useful.

Vercel is hosting the actual website. It has an address — either an IP address (a string of numbers like `76.76.21.21`) or a hostname (like `cname.vercel-dns.com`).

What you're doing in this process is going into GoDaddy's phone book and writing: **"when someone asks for `yourclient.com`, send them to Vercel's address."**

That's it. That's the whole thing.

---

## The Two DNS Records You're Adding

DNS has different record types for different purposes. You need exactly two:

**A Record — the root domain**
- Connects `yourclient.com` (no www) to Vercel's IP address
- Name: `@` (means root — the domain itself with nothing before it)
- Value: an IP address Vercel gives you, e.g. `76.76.21.21`

**CNAME Record — the www version**
- Connects `www.yourclient.com` to Vercel's hostname
- Name: `www`
- Value: `cname.vercel-dns.com` (Vercel gives you this exact string)

Vercel then handles redirecting `www` to the root (or vice versa) automatically.

**TTL** stands for Time To Live — how long other DNS servers around the world cache your record before checking for updates. Leave it as default. It doesn't matter for setup.

---

## What You Need Before Starting

- Access to a GoDaddy account (customer ID + password + phone for MFA)
- Your project already deployed on Vercel
- The domain bought for the client — e.g. `yourclient.com`

---

## Step by Step

### 1. Open both dashboards side by side
- GoDaddy: [sso.godaddy.com](https://sso.godaddy.com) — log in with your credentials, enter MFA SMS
- Vercel: [vercel.com](https://vercel.com) — log into your account

---

### 2. Get the DNS values from Vercel

1. In Vercel, open the project you want to connect the domain to
2. Go to **Settings → Domains**
3. Click **Add Domain**
4. Type the domain name exactly — e.g. `yourclient.com`
5. Click **Save**

Vercel will now show you two values:
- An **IP address** for the A record — looks like `76.76.21.21`
- A **hostname** for the CNAME record — looks like `cname.vercel-dns.com`

Keep this screen open. You're about to copy from it.

---

### 3. Get into GoDaddy DNS management

1. In GoDaddy, find the domain under **My Products** or **Domains**
2. Click **DNS** or **Manage DNS** next to the domain
3. You'll see a table of existing DNS records — GoDaddy adds a bunch of defaults

---

### 4. Delete the default records that will interfere

GoDaddy pre-populates some A records and CNAME records pointing nowhere useful. These will conflict with what you're about to add.

Delete any existing:
- **A records** with name `@`
- **CNAME records** with name `www`

Leave anything else (MX records for email etc.) — only touch A and CNAME.

---

### 5. Add the CNAME record

1. Click **Add New Record**
2. Type: **CNAME**
3. Name: `www`
4. Value: copy the hostname from Vercel — e.g. `cname.vercel-dns.com`
5. TTL: leave as default
6. Save

---

### 6. Add the A record

1. Click **Add New Record** again
2. Type: **A**
3. Name: `@`
4. Value: copy the IP address from Vercel — e.g. `76.76.21.21`
5. TTL: leave as default
6. Save

---

### 7. Wait and verify

Go back to Vercel's **Settings → Domains** and hit refresh. Vercel will check whether the DNS records have propagated — meaning whether the internet's phone books have updated with your new entries.

This can take anywhere from **2 minutes to 48 hours** depending on GoDaddy's TTL settings and how quickly DNS servers around the world update. In practice it's usually under 30 minutes, often instant.

When Vercel shows a green checkmark next to the domain, you're live. Vercel also automatically provisions an **SSL certificate** (the padlock in the browser, the `https://`) — no action needed from you.

---

## What Vercel Does Automatically (That You Don't Have to Worry About)

- **SSL certificate** — Vercel provisions HTTPS via Let's Encrypt automatically once DNS is verified. No manual certificate management.
- **www redirect** — Vercel redirects `www.yourclient.com` to `yourclient.com` (or vice versa) automatically based on which you set as primary.
- **Renewals** — the SSL certificate renews itself. You will never need to touch it.

---

## If It Doesn't Work

**Vercel still shows "Invalid Configuration":**
DNS hasn't propagated yet. Wait 30 minutes and refresh. If it's been several hours, double-check that you added `@` for the A record name and not the full domain name.

**Site loads but shows "Not Secure":**
SSL certificate is still provisioning. Give it a few minutes after DNS verifies.

**GoDaddy won't let you delete the existing records:**
Some GoDaddy plans lock certain records. Look for an edit option instead of delete — change the value in place rather than deleting and recreating.

---

## The One-Line Summary

You told GoDaddy's phone book to forward `yourclient.com` to Vercel's address. Vercel already knew the site was coming because you added the domain in the dashboard first. Everything else is automatic.

