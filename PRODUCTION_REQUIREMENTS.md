# Production Setup Requirements

This document outlines all requirements for a stable production deployment on Vercel and Render.

## ✅ Backend Production Checklist

### 1. **Error Handling & Logging**
- [x] Global error handler in server.js
- [x] Graceful shutdown handling
- [x] Database error handling
- [x] Validation error responses
- [ ] Structured logging (consider Winston or Pino)
- [ ] Error tracking service (Sentry recommended)

### 2. **Security**
- [ ] HTTPS enforced (automatic on Vercel/Render)
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all routes
- [x] CORS properly configured
- [x] JWT authentication implemented
- [ ] Helmet.js for security headers (recommended)
- [ ] SQL injection prevention (using parameterized queries)
- [ ] CSRF protection if needed

### 3. **Performance**
- [ ] Database query optimization
- [ ] Connection pooling configured
- [ ] Caching strategy (Redis recommended for production)
- [ ] Compression middleware
- [ ] Asset compression (image optimization)
- [ ] Database indexing on frequently queried columns

### 4. **Monitoring & Analytics**
- [ ] Health check endpoint
- [ ] Performance monitoring
- [ ] Error tracking (e.g., Sentry, LogRocket)
- [ ] Database monitoring
- [ ] API response time tracking
- [ ] Uptime monitoring (e.g., UptimeRobot)

### 5. **Database**
- [x] PostgreSQL with SSL support
- [x] Connection string with pooling
- [x] Database backups configured
- [x] Migrations in place
- [ ] Read replicas for scaling
- [ ] Point-in-time recovery enabled

---

## ✅ Frontend Production Checklist

### 1. **Build & Optimization**
- [x] Vite build configuration optimized
- [x] Tree-shaking enabled
- [x] Code splitting implemented (chunk vendors, react libs)
- [x] Minification enabled with source map disabled
- [ ] Image optimization (lazy loading, WebP format)
- [ ] CSS minification

### 2. **Performance**
- [ ] Gzip compression enabled
- [ ] CDN caching configured
- [ ] Service Worker for caching (PWA)
- [ ] Preload critical assets
- [ ] Reduce JavaScript payload
- [ ] Implement virtualization for large lists

### 3. **Security**
- [x] HTTPS enforced (automatic)
- [ ] Content Security Policy (CSP) headers
- [ ] X-Frame-Options headers
- [ ] X-XSS-Protection headers
- [ ] Secure cookies (HttpOnly, Secure flags)
- [ ] No sensitive data in localStorage

### 4. **SEO & Analytics**
- [ ] Meta tags configured
- [ ] Robots.txt file
- [ ] Sitemap.xml
- [ ] Open Graph tags
- [ ] Google Analytics or equivalent
- [ ] Structured data markup (Schema.org)

### 5. **Accessibility**
- [ ] WCAG 2.1 compliance
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Color contrast ratios
- [ ] ARIA labels

---

## 🔐 Environment Variables Management

### Development (.env)
```
DB_URL=postgresql://postgres:password@localhost:5432/celebrity_browser
JWT_SECRET=dev-secret-key
STRIPE_SECRET_KEY=sk_test_xxx
NODE_ENV=development
```

### Production (Set in Vercel/Render Dashboard)
```
DB_URL=postgresql://user:pass@aws-host:6543/postgres
JWT_SECRET=production-secret-key-32-chars-minimum
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLIC_KEY=pk_live_xxx
CORS_ORIGIN=https://your-production-domain.com
NODE_ENV=production
```

### Critical Rules
- ✅ Use `.env.example` for documentation only
- ✅ Never commit `.env` file
- ✅ Use different secrets for dev/prod
- ✅ Rotate secrets quarterly
- ✅ Use strong random values for JWT_SECRET

---

## 📊 Performance Targets

### Backend
- API Response Time: < 200ms (p95)
- Database Query Time: < 100ms
- Server Uptime: > 99.9%
- Error Rate: < 0.1%

### Frontend
- First Contentful Paint (FCP): < 1s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

---

## 🛡️ Recommended Packages for Production

### Backend
```bash
npm install helmet          # Security headers
npm install express-rate-limit  # Rate limiting
npm install winston         # Logging
npm install redis          # Caching
npm install joi            # Validation
npm install dotenv-safe    # Env validation
```

### Frontend
```bash
npm install optimization-plugins  # Build optimization
npm install sharp          # Image optimization
npm install workbox-webpack-plugin  # PWA and caching
npm install react-helmet   # Meta tags management
```

---

## 🚀 Deployment Flow

### Initial Deployment
1. Set up repository on GitHub
2. Connect to Vercel/Render
3. Configure environment variables
4. Deploy main branch
5. Run health checks
6. Monitor for errors

### Continuous Deployment
```
Push to main
  ↓
GitHub triggers deployment
  ↓
Build runs (npm run build)
  ↓
Tests run (optional)
  ↓
Deploy to production
  ↓
Health checks run
  ↓
Alert on failure
```

### Rollback Procedure
```
1. Identify issue in production
2. Revert commit or redeploy previous version
3. Verify fix with health checks
4. Monitor error rates
5. Post-incident review
```

---

## 📈 Scaling Strategy

### Phase 1: MVP (Current)
- Single backend instance (Vercel Functions or Render Free Tier)
- Single database (Supabase Starter)
- CDN for static files (Vercel/Render default)

### Phase 2: Growth
- Auto-scaling backend (Render Pro or Vercel Enterprise)
- Database read replicas
- Redis for caching
- S3 for file storage

### Phase 3: Enterprise
- Multi-region deployment
- Load balancing
- Advanced monitoring (DataDog, New Relic)
- Database sharding

---

## 🧪 Testing Before Production

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm run test:integration
```

### Load Testing
```bash
npm install -g artillery
artillery run load-test.yml
```

### Security Testing
```bash
npm audit
npm audit fix
```

---

## 📞 Maintenance & Support

### Daily
- Monitor error rates
- Check uptime metrics
- Review error logs

### Weekly
- Review performance metrics
- Check database size
- Update dependencies (security patches)

### Monthly
- Full security audit
- Performance optimization review
- Database maintenance
- Backup verification

---

## 🔧 Quick Commands

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Render (via GitHub)
```
Push to main branch → Render auto-deploys
```

### View Backend Logs
```
Vercel: Dashboard → Deployments → Logs
Render: Dashboard → Logs
```

### SSH into Render Backend
```bash
# Not available on free tier
# Available on Pro tier
# Use: Render Dashboard → Shell
```

### Test API Endpoint
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-api.example.com/api/health
```

---

## 🎯 Success Criteria

You'll know the deployment is stable when:

- ✅ Health check endpoint responds with 200 status
- ✅ Database connections succeed
- ✅ No CORS errors in browser console
- ✅ Authentication flows work correctly
- ✅ API response times are consistent
- ✅ Zero unhandled exceptions in logs
- ✅ Users can complete purchase flow
- ✅ Admin dashboard functions properly
- ✅ Error rate < 0.1%
- ✅ 99.9%+ uptime over 7 days

---

**Last Updated**: February 28, 2026
**Version**: 1.0.0
