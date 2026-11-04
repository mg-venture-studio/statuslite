# StatusLite Deployment Guide

## Current Status (2026-11-04)

✅ **Completed:**
- Build verified locally — all routes compile successfully
- Code pushed to GitHub: https://github.com/mg-venture-studio/statuslite
- Supabase schema ready: `supabase/schema.sql`
- SEO blog content complete (5 posts, see MGV-137)

⚠️ **Blocked — Missing Credentials:**
Deployment requires external account connections that need board decision or credential provision.

## Prerequisites

### 1. Supabase Setup

Create a Supabase project and apply the schema:

```bash
# After creating project at https://supabase.com
export SUPABASE_URL="your-project-url"
export SUPABASE_SERVICE_KEY="your-service-role-key"

# Apply schema
psql "$SUPABASE_URL" -f supabase/schema.sql
```

**Required environment variables:**
- `NEXT_PUBLIC_SUPABASE_URL` — Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Anonymous public key
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key (server-side only)

### 2. Resend Setup

Create a Resend account for email notifications:

1. Sign up at https://resend.com
2. Get API key from dashboard
3. Set environment variable:
   - `RESEND_API_KEY` — Your Resend API key

### 3. Vercel Deployment

Deploy the application:

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
cd statuslite
vercel

# Set environment variables in Vercel dashboard
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
vercel env add NEXT_PUBLIC_SITE_URL
```

**Required environment variables:**
- `NEXT_PUBLIC_SITE_URL` — Your deployed site URL (e.g., https://statuslite.app)

## Deployment Verification Checklist

After deployment, verify:

- [ ] Landing page loads at root URL
- [ ] Signup flow works (creates user in Supabase)
- [ ] Login flow works
- [ ] Dashboard loads and shows empty state
- [ ] Create new status page (CRUD works)
- [ ] Add components to status page
- [ ] Create and manage incidents
- [ ] Public status page renders at `/status/[slug]`
- [ ] Subscriber signup works
- [ ] Email notifications send correctly

## GitHub Repository

- **URL:** https://github.com/mg-venture-studio/statuslite
- **Branch:** master
- **Status:** Ready for Vercel connection

## SEO Content

Five blog posts are ready to publish on launch:

1. **StatusLite vs Statuspage** — Comparison targeting "statuspage alternative"
2. **How to Set Up a Status Page** — How-to guide
3. **5 Best Status Page Tools** — Listicle for indie hackers
4. **Why Every SaaS Needs a Status Page** — Educational guide
5. **Case Study: User Trust** — Social proof piece

All posts include SEO frontmatter, proper heading structure, and internal links.

## Next Actions

**For Board Decision:**
1. Create Supabase account (requires email verification)
2. Create Resend account (requires email verification)
3. Connect Vercel to GitHub repo and deploy
4. Configure all environment variables
5. Run deployment verification checklist

**Estimated Time:** 30-60 minutes once accounts are created

**Estimated Cost:**
- Supabase: Free tier (sufficient for launch)
- Resend: Free tier (100 emails/day)
- Vercel: Free tier (sufficient for launch)
- Domain: ~$10-15/year (optional)
