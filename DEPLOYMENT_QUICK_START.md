# 🚀 Celebrity Browser - Deployment Quick Start

This is a quick reference guide for deploying the Celebrity Browser application. For detailed information, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📋 Pre-Deployment Checklist (5 minutes)

1. **Validate Project Status**
   ```bash
   # Windows
   scripts\validate-deployment.bat
   
   # Linux/Mac
   bash scripts/validate-deployment.sh
   ```

2. **Environment Variables Ready?**
   - [ ] `DB_URL` (PostgreSQL connection string)
   - [ ] `JWT_SECRET` (random 32+ char string)
   - [ ] `STRIPE_SECRET_KEY` (from Stripe dashboard)
   - [ ] `STRIPE_PUBLIC_KEY` (from Stripe dashboard)
   - [ ] `CORS_ORIGIN` (your deployment domain)

3. **Git Status Clean?**
   ```bash
   git status
   # Should show nothing to commit
   ```

---

## 🔵 Deploy to Vercel (2 minutes)

### Option A: CLI Deployment

```bash
# 1. Install Vercel CLI (one time)
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Set environment variables when prompted
# Or set in Vercel Dashboard afterward
```

### Option B: GitHub Auto-Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select your repo
4. Vercel auto-detects `vercel.json`
5. Add environment variables in project settings
6. Deploy completes automatically

### Vercel Environment Variables

Set these in **Project Settings** → **Environment Variables**:

```
DB_URL = postgresql://...
JWT_SECRET = your-secret-key
STRIPE_SECRET_KEY = sk_live_...
STRIPE_PUBLIC_KEY = pk_live_...
CORS_ORIGIN = https://your-domain.vercel.app
NODE_ENV = production
```

### Vercel Production URL

```
Frontend: https://your-project.vercel.app
API calls automatically route to /api endpoints
```

---

## 🟢 Deploy to Render (2 minutes)

### Option A: YAML Configuration (Automated)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Select your GitHub repository
5. Render automatically detects `render.yaml`
6. Add environment variables (see below)
7. Click "Create Web Service"

### Option B: Manual Configuration

1. Create Web Service for backend
   - Name: `celebrity-browser-backend`
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`
   - Plan: Starter (free)

2. Create Static Site for frontend
   - Name: `celebrity-browser-frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

### Render Environment Variables

Set in service dashboard → **Environment**:

```
DB_URL=postgresql://...
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...
CORS_ORIGIN=https://celebrity-browser-backend.onrender.com
NODE_ENV=production
PORT=5000
```

### Render Production URLs

```
Backend: https://celebrity-browser-backend.onrender.com
Frontend: https://celebrity-browser-frontend.onrender.com
```

---

## ✅ Post-Deployment Verification (5 minutes)

### 1. Health Check

```bash
# Test backend is running
curl https://your-app.onrender.com/api/health

# Expected response:
# {"status":"Server is running","timestamp":"2024-02-28T...","env":"production"}
```

### 2. Database Connection

Check backend logs:
- Vercel: Dashboard → Deployments → Function Logs
- Render: Dashboard → Logs
- Look for: `✅ PostgreSQL connected`

### 3. CORS Configuration

1. Open frontend in browser
2. Open DevTools (F12)
3. Try signing up or logging in
4. Should see successful API calls in Networks tab
5. No CORS errors in Console

### 4. Test Sign Up Flow

1. Go to frontend URL
2. Click "Sign Up"
3. Fill in form and submit
4. Should see success message
5. Check database via Supabase dashboard

### 5. Test Authentication

1. Log in with test account
2. Should get JWT token
3. Should see protected pages (Home, Admin)
4. Logout should work

---

## 🔧 Quick Troubleshooting

### "Database connection refused"

```bash
# Check DB_URL is set correctly
# Format: postgresql://username:password@host:port/database

# For Supabase: Use Connection Pooling URL (Port 6543)
# Not direct connection URL
```

### "CORS blocked requests"

```bash
# Update CORS_ORIGIN to match frontend URL exactly
# For Vercel: https://your-project.vercel.app
# For Render: https://your-project.onrender.com

# Restart backend after changing
```

### "Stripe key invalid"

```bash
# Use test keys for development/staging
# sk_test_* and pk_test_*

# Use live keys only in production
# sk_live_* and pk_live_*
```

### "Files not uploading"

```bash
# For Vercel: Uploads are temporary
# Solution: Use AWS S3 or Cloudinary

# For Render: Should persist
# Check: /uploads directory exists
# Check: File permissions
```

---

## 📊 Vercel vs Render Comparison

| Feature | Vercel | Render |
|---------|--------|--------|
| **Setup Time** | 2 min | 2 min |
| **Best For** | Frontend + lightweight API | Full-stack apps |
| **File Uploads** | ❌ Temporary | ✅ Persistent |
| **Function Timeout** | 60 sec | 30 min |
| **Free Tier** | Generous | Generous |
| **Auto Scaling** | ✅ | ✅ |

### Recommendation

- **Choose Vercel if**: Lightweight API, no file uploads
- **Choose Render if**: File uploads, longer operations, full-stack

---

## 📈 Monitoring After Deployment

### Daily Checks (2 minutes)

1. Check health endpoint responds
2. Monitor error logs
3. Check database uptime

### Weekly Checks (10 minutes)

1. Test critical user flows
2. Review performance metrics
3. Update security patches

### Monthly Checks (30 minutes)

1. Security audit
2. Performance optimization
3. Database maintenance
4. Backup verification

---

## 🔄 Updating Production

### Deploy Latest Changes

#### Vercel

```bash
git push origin main
# Auto-deploys if GitHub connected
# Or: vercel --prod
```

#### Render

```bash
git push origin main
# Auto-deploys from GitHub webhook
```

### Rollback to Previous Version

#### Vercel
1. Go to Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

#### Render
1. Go to Deployments
2. Click on previous version
3. Click "Deploy this version"

---

## 🆘 Getting Help

- **Vercel Issues**: https://vercel.com/support
- **Render Issues**: https://render.com/support
- **Database Issues**: https://supabase.com/docs
- **Stripe Issues**: https://stripe.com/docs

---

## 📞 Emergency Contacts

**If production is down:**

1. Check health endpoint: `/api/health`
2. Check service dashboard for errors
3. View logs: Platform Dashboard → Logs
4. Roll back to previous deployment
5. Post-incident review after fix

---

**Updated**: February 28, 2026
**Version**: 1.0.0
**Status**: Ready for Production ✅
