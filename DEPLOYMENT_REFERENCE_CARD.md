# 🚀 Vercel & Render Deployment - Reference Card

**Print this page or bookmark it for quick reference!**

---

## ⚡ 60-SECOND DEPLOYMENT

### Vercel
```bash
npm install -g vercel
vercel --prod
# Add env vars → Done!
```

### Render
```bash
git push origin main
# Set env vars in dashboard → Auto-deploys!
```

---

## 📋 Required Environment Variables

```
DB_URL                    → PostgreSQL connection string
JWT_SECRET               → Random 32+ character string
STRIPE_SECRET_KEY        → sk_test_* or sk_live_*
STRIPE_PUBLIC_KEY        → pk_test_* or pk_live_*
CORS_ORIGIN              → Your frontend domain URL
NODE_ENV                 → production
```

---

## 🌐 Production URLs Format

### Vercel
```
Frontend: https://your-project.vercel.app
Backend: Auto-routed via /api
```

### Render
```
Backend: https://your-app-name.onrender.com
Frontend: https://your-app-name-frontend.onrender.com
```

---

## ✅ Post-Deployment Testing (In Order)

1. **Health Check**
   ```bash
   curl https://your-domain/api/health
   ```

2. **Sign Up** → Should create user account

3. **Log In** → Should receive JWT token

4. **Browse Home** → Should fetch celebrities from API

5. **View Admin** → Protected route (requires auth)

6. **Add to Cart & Pay** → Stripe test flow

---

## 🔧 Key Configuration Files

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel deployment config |
| `render.yaml` | Render deployment config |
| `backend/.env.example` | Backend env vars reference |
| `frontend/.env.example` | Frontend env vars reference |
| `backend/src/server.js` | Production server setup |
| `frontend/vite.config.js` | Build optimization |

---

## 🆘 Top 3 Issues & Fixes

### 1. "Cannot POST /api/auth/signup"
- ✅ Check backend is running
- ✅ Check `DB_URL` is correct
- ✅ Verify database is accessible

### 2. "CORS blocked requests"
- ✅ Update `CORS_ORIGIN` to your frontend URL
- ✅ Restart backend
- ✅ Clear browser cache

### 3. "Invalid database credentials"
- ✅ Verify `DB_URL` format
- ✅ For Supabase: Use pooling URL (port 6543)
- ✅ Test connection locally first

---

## 📊 Vercel vs Render

| Feature | Vercel | Render |
|---------|--------|--------|
| Easiest | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| File Uploads | ❌ Temp | ✅ Persist |
| Timeout | 60s | 30min |
| Best For | Frontend | Full-stack |

---

## 🔐 Security Reminders

- [ ] Never commit `.env` file
- [ ] Use different secrets per environment
- [ ] Use test Stripe keys before production
- [ ] Rotate JWT_SECRET quarterly
- [ ] CORS_ORIGIN must match frontend URL exactly
- [ ] Change all default passwords

---

## 📚 Documentation Links

| Topic | Document | Time |
|-------|----------|------|
| **Quick Start** | DEPLOYMENT_QUICK_START.md | 5 min |
| **Detailed Guide** | DEPLOYMENT.md | 20 min |
| **Env Variables** | ENVIRONMENT_VARIABLES.md | 10 min |
| **Production** | PRODUCTION_REQUIREMENTS.md | 30 min |
| **This Summary** | DEPLOYMENT_SUMMARY.md | 5 min |

---

## 🎯 Essential Checklist

Before you deploy:
- [ ] Validate: `npm run validate` (or scripts/validate-deployment.bat)
- [ ] Push to GitHub
- [ ] Get environment variables ready
- [ ] Database is running and accessible
- [ ] No console errors locally

After you deploy:
- [ ] Health check passes
- [ ] Can sign up
- [ ] Can log in
- [ ] Can see celebrities
- [ ] Can view admin panel

---

## 💡 Pro Tips

1. **Test Locally First**
   ```bash
   cd backend && npm run dev
   cd frontend && npm run dev
   ```

2. **Save Environment Variables**
   - Create a secure password manager entry
   - Note all secret keys
   - Share with team via password manager only

3. **Monitor Production**
   - Check health endpoint daily
   - Set up uptime monitoring
   - Review logs weekly

4. **Update Easily**
   ```bash
   git push origin main
   # Vercel/Render auto-deploy!
   ```

5. **Rollback if Issues**
   - Vercel: Dashboard → Deployments → Promote
   - Render: Dashboard → Deployments → Redeploy

---

## 🆘 Getting Help

- **Vercel Docs**: vercel.com/docs
- **Render Docs**: render.com/docs
- **DEPLOYMENT.md**: Troubleshooting section
- **ENVIRONMENT_VARIABLES.md**: Variable reference

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Read quick start | 5 min |
| Set environment variables | 10 min |
| Deploy to Vercel | 2 min |
| Deploy to Render | 2 min |
| Post-deployment testing | 10 min |
| **Total** | **~30 min** |

---

**Status**: ✅ Your project is production-ready!

**Next**: Follow DEPLOYMENT_QUICK_START.md to deploy in 5 minutes.
