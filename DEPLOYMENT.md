# Celebrity Browser - Deployment Guide

This guide provides comprehensive instructions for deploying the Celebrity Browser application to both **Vercel** and **Render**.

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Vercel Deployment](#vercel-deployment)
3. [Render Deployment](#render-deployment)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Database Configuration](#database-configuration)
6. [Post-Deployment Testing](#post-deployment-testing)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Pre-Deployment Checklist

Before deploying, ensure the following:

- [ ] All dependencies are listed in `package.json` files
- [ ] `vercel.json` is configured (included in project)
- [ ] `render.yaml` is configured (included in project)
- [ ] `.env.example` files document all required environment variables
- [ ] Database migrations are up to date
- [ ] All secrets are stored in environment variables (NOT in code)
- [ ] CORS is properly configured
- [ ] Error handling is implemented
- [ ] Graceful shutdown is configured

---

## 🔵 Vercel Deployment

### Option 1: Deploy from CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel
```

### Option 2: Deploy from GitHub

1. Connect your GitHub repository to Vercel
2. Vercel will automatically use the `vercel.json` configuration
3. Set environment variables in Vercel dashboard

### Configuration Details

The `vercel.json` file includes:
- **Frontend build**: Vite builds to `frontend/dist`
- **Backend serverless**: Node.js functions for API routes
- **Routes**: All `/api/*` routes go to backend, static files to frontend
- **Uploads**: Served from `backend/uploads` directory

### Environment Variables for Vercel

Set these in **Vercel Dashboard** → **Settings** → **Environment Variables**:

```
DB_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
CORS_ORIGIN=https://your-vercel-app.vercel.app
NODE_ENV=production
```

### Limitations to Know

- Serverless functions have a 60-second timeout (suitable for most API calls)
- File uploads will be temporary (consider using cloud storage like AWS S3)
- Database connections must support SSL
- Environment variables from `vercel.json` are read-only, override in dashboard

---

## 🟢 Render Deployment

### Setup Steps

1. **Create Render Account** at https://render.com

2. **Connect GitHub Repository**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Select your GitHub repository

3. **Render Configuration**
   - Render will automatically detect `render.yaml`
   - Configure secrets in Render dashboard

4. **Deploy**
   - Render will automatically deploy when you push to main branch

### Configuration Details

The `render.yaml` file defines:

```yaml
services:
  - Backend Web Service
  - Frontend Static Site
```

**Backend Service:**
- Runtime: Node.js
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`
- Plan: Starter (upgradeable)

**Frontend Service:**
- Static site publishing
- Build Command: `npm install && npm run build`

### Environment Variables for Render

Set these in **Render Dashboard** → **Environment** tab:

```
# Database
DB_URL=your_postgres_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key

# CORS
CORS_ORIGIN=https://your-frontend.onrender.com

# Server
NODE_ENV=production
PORT=5000
```

### Backend Service URL

After deployment, your backend will be at: `https://your-app-name.onrender.com`

Use this as your `CORS_ORIGIN` and in frontend API configuration.

---

## 🔑 Environment Variables Setup

### Vercel

1. Go to your project's dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable with its value
4. Select which environments (Production, Preview, Development)
5. Redeploy for changes to take effect

### Render

1. Go to your service's dashboard
2. Click **Environment** tab
3. Add each variable with its value
4. Render automatically redeploys when variables change

### Required Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DB_URL` | PostgreSQL connection | `postgresql://user:pass@host:6543/db` |
| `JWT_SECRET` | Token signing key | `your-secret-key-min-32-chars` |
| `STRIPE_SECRET_KEY` | Stripe API secret | `sk_live_...` |
| `STRIPE_PUBLIC_KEY` | Stripe API public | `pk_live_...` |
| `CORS_ORIGIN` | Allowed frontend origin | `https://your-app.vercel.app` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port (Render only) | `5000` |

---

## 🗄️ Database Configuration

### Using Supabase (Recommended)

1. Create a Supabase project at https://supabase.com
2. Get your connection string from **Settings** → **Database** → **Connection Pooling**
3. Use this URL as `DB_URL` environment variable
4. Run migrations on the database

### Connection String Example

```
postgresql://postgres.project:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

### Setup Database

```bash
# 1. Connect to your database
psql your_db_url

# 2. Run migrations (if using database.sql)
psql your_db_url < backend/database.sql

# 3. Verify connection
SELECT NOW();
```

### SSL Configuration

Both Vercel and Render require SSL. The server.js automatically enables SSL for remote databases.

---

## ✅ Post-Deployment Testing

### 1. Health Check

```bash
# Test backend health endpoint
curl https://your-app.vercel.app/api/health
# or
curl https://your-backend.onrender.com/api/health

# Expected response:
# {"status":"Server is running","timestamp":"2024-02-28T...","env":"production"}
```

### 2. Database Connection

```bash
# Backend logs show database status
# Look for: ✅ PostgreSQL connected
```

### 3. CORS Test

```bash
# Test from frontend that API calls work
# Check browser console for CORS errors
# Monitor Network tab in DevTools
```

### 4. Authentication Test

1. Sign up with a test account
2. Verify JWT tokens are generated
3. Test protected routes (admin endpoints)

### 5. Payment Integration

1. Use Stripe test keys (not production)
2. Test with Stripe test cards: `4242 4242 4242 4242`
3. Verify orders are created in database

---

## 🛠️ Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error**: `ECONNREFUSED` or `FATAL: password authentication failed`

**Solution**:
- Verify `DB_URL` is correct in environment variables
- Check database is running and accessible
- Ensure credentials are correct
- For Supabase, use connection pooling URL

#### 2. CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
- Set `CORS_ORIGIN` to your frontend's actual URL
- For multiple origins, use comma-separated list: `https://app.vercel.app,https://app-preview.vercel.app`
- Restart backend after changing CORS settings

#### 3. JWT Errors

**Error**: `JsonWebTokenError: invalid token`

**Solution**:
- Ensure `JWT_SECRET` is the same across all deployments
- Never commit `.env` file to git
- Use environment variables only

#### 4. File Upload Issues

**Error**: Uploaded files not persisting or showing 404

**Solution for Vercel**:
- File uploads are temporary on serverless
- **Recommended**: Use cloud storage (AWS S3, Cloudinary, etc.)
- Or use Render instead (persistent file system)

**Solution for Render**:
- File uploads persist on the filesystem
- Ensure `uploads` directory exists
- Check file permissions

#### 5. Stripe Integration Issues

**Error**: `Invalid API Key provided`

**Solution**:
- Use test keys (`sk_test_*` and `pk_test_*`)
- In production, use live keys (`sk_live_*` and `pk_live_*`)
- Verify keys in environment variables
- Check Stripe dashboard permissions

#### 6. Timeout Errors

**Vercel Error**: `Function timeout after 60 seconds`

**Solution**:
- Optimize database queries
- Implement caching
- Break long operations into smaller chunks
- Consider using background jobs (Render recommended)

**Render Error**: Function timeout after 30 minutes (configurable)

**Solution**:
- Similar to Vercel
- Use Render's background workers for long tasks

---

## 📊 Comparing Vercel vs Render

| Feature | Vercel | Render |
|---------|--------|--------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Pricing** | Free tier | Free tier |
| **Function Timeout** | 60 seconds | 30 minutes |
| **File Storage** | Temporary | Persistent |
| **Scaling** | Automatic | Automatic |
| **Best For** | Frontend + lightweight API | Full-stack with file uploads |

---

## 🚦 Deployment Checklist

### Before Deploying

- [ ] All dependencies installed
- [ ] No hardcoded secrets in code
- [ ] Environment variables documented
- [ ] Database ready with schema
- [ ] CORS configured correctly
- [ ] Error handling implemented
- [ ] Tests passing locally

### After Deploying

- [ ] Health check endpoint responds
- [ ] Database connection working
- [ ] CORS not blocking requests
- [ ] Authentication system working
- [ ] Payment system operational
- [ ] File uploads working (per platform)

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs

---

**Last Updated**: February 28, 2026
**Project**: Celebrity Browser v1.0.0
