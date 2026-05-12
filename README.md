# 🐕 PawDocs — Dog Documentation System
### Deployment Guide (Free, ~15 minutes)

---

## What you're setting up
- A live web app accessible from any phone or computer
- A free cloud database that stores all 150+ dog records
- Any staff member can view and edit from their phone

---

## Step 1 — Set up the Database (Supabase)

1. Go to **https://supabase.com** and click **"Start your project"**
2. Sign up for a free account (GitHub or email)
3. Click **"New project"** → name it `pawdocs` → choose a region close to you → set a database password → click **Create project** (takes ~2 minutes)
4. Once loaded, click **"SQL Editor"** in the left sidebar
5. Click **"New query"**, paste the entire contents of `setup.sql`, and click **Run**
6. You should see "Success. No rows returned" — your database is ready!
7. Go to **Settings → API** (left sidebar)
8. Copy your **Project URL** (looks like `https://xxxx.supabase.co`)
9. Copy your **anon public** key (long JWT string)

---

## Step 2 — Deploy the App (GitHub + Vercel)

### 2a. Upload to GitHub
1. Go to **https://github.com** and sign up / log in
2. Click **"New repository"** → name it `pawdocs` → Public → Create
3. Click **"uploading an existing file"**
4. Upload ALL the files from this folder (keeping the folder structure)
5. Click **"Commit changes"**

### 2b. Deploy on Vercel
1. Go to **https://vercel.com** and sign up with your GitHub account
2. Click **"Add New Project"**
3. Select your `pawdocs` repository → click **Import**
4. Framework Preset: **Vite** (auto-detected)
5. Click **Deploy** — takes about 1 minute
6. Vercel gives you a URL like `https://pawdocs-xyz.vercel.app`

---

## Step 3 — Connect & Share

1. Open your Vercel URL on any phone or computer
2. On the setup screen, paste your Supabase **Project URL** and **anon key**
3. Click **Connect Database** — you're in!
4. Share the Vercel URL with your staff — they open it, enter the same credentials, and they're connected

> **Tip:** Bookmark the URL on every staff phone for quick access.

---

## Features

| Feature | Details |
|---|---|
| Dog profiles | Name, breed, age, weight, sex, color, microchip |
| Vaccination tracking | Rabies, Distemper, Bordetella, Leptospira with expiry alerts |
| Medical records | Vet info, heartworm, flea/tick, medications, medical notes |
| Intake records | Date, reason, previous owner contact info |
| Behavior notes | Good with kids/dogs/cats, training notes |
| Adoption tracking | Adopter info, adoption date |
| Dashboard | Expiring vaccine alerts, status summary, recent intakes |
| Search | Search by name, breed, or ID tag |
| Filter | Filter by status (available, adopted, fostered, medical, hold) |
| Multi-device | Any phone/tablet/computer, no app install needed |

---

## Keeping credentials safe

The Supabase anon key is safe to share with staff — it only allows access to YOUR database. If you ever need to restrict access (e.g., hide adopter info from volunteers), you can add Supabase authentication later.

---

## Need help?

The app is built with:
- **React + Vite** (frontend)
- **Supabase** (database)
- **Vercel** (hosting)

All free tiers are generous enough for 150+ dogs with daily use.
