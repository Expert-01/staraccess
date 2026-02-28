# Environment Variables Guide

This document provides comprehensive information about all environment variables used in the Celebrity Browser application.

## 📋 Quick Reference

### Required Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `DB_URL` | string | PostgreSQL connection string | `postgresql://user:pass@host:6543/db` |
| `JWT_SECRET` | string | Secret key for JWT signing | `your-super-secret-key-32-chars` |
| `NODE_ENV` | string | Environment (development/production) | `production` |

### Optional Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `PORT` | number | 5000 | Server port |
| `CORS_ORIGIN` | string | localhost | Allowed frontend origins |
| `STRIPE_SECRET_KEY` | string | - | Stripe API secret key |
| `STRIPE_PUBLIC_KEY` | string | - | Stripe public key |
| `MAX_FILE_SIZE` | number | 5242880 | Max upload size in bytes |
| `UPLOAD_DIR` | string | ./uploads | Directory for uploads |
| `LOG_LEVEL` | string | info | Logging level |
| `JWT_EXPIRY` | string | 7d | JWT token expiration |

---

## 🚀 Vercel Environment Setup

### 1. Access Environment Variables

- Go to **Vercel Dashboard** → Your Project
- Click **Settings** → **Environment Variables**

### 2. Add Variables

Click "Add New" and fill in:
- **Name**: Variable name (e.g., `DB_URL`)
- **Value**: Variable value
- **Environment**: Select `Production`, `Preview`, or `Development`

### 3. Vercel-Specific Variables

```
NODE_ENV=production                              # Always set for production
VERCEL_ENV=production                            # Vercel specific
VERCEL_URL=your-project.vercel.app              # Auto-set by Vercel
```

### 4. Deploy After Variables

Once variables are set, redeploy:
```bash
vercel --prod
```

---

## 🟢 Render Environment Setup

### 1. Access Environment Variables

- Go to **Render Dashboard** → Your Service
- Click **Environment** tab

### 2. Add Variables

Click "Add Environment Variable" and fill in:
- **Key**: Variable name (e.g., `DB_URL`)
- **Value**: Variable value

### 3. Render Auto-Redeploys

Changes to environment variables trigger automatic redeploy.

---

## 🐘 PostgreSQL Connection String

### Format

```
postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
```

### Examples

#### Local Development

```
postgresql://postgres:password@localhost:5432/celebrity_browser
```

#### Supabase (Recommended)

```
postgresql://postgres.projectname:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**Important**: Use the **Connection Pooling** URL (port 6543), not the direct connection URL.

#### Railway

```
postgresql://user:password@containers-us-west-123.railway.app:6545/railway
```

#### AWS RDS

```
postgresql://username:password@rds-endpoint.region.rds.amazonaws.com:5432/dbname
```

#### Heroku PostgreSQL

```
postgres://username:password@ec2-xx-xxx-xxx-x.compute-1.amazonaws.com:5432/dbname
```

### SSL Configuration

The server automatically enables SSL for:
- Supabase connections (includes SSL by default)
- Any connection to non-localhost host

To manually disable SSL (not recommended for production):
```javascript
// In db.js
ssl: false  // Only for local/trusted connections
```

---

## 🔑 JWT Secret Configuration

### Generation

Generate a secure JWT secret:

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Using OpenSSL:**
```bash
openssl rand -hex 32
```

**Using Python:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### Requirements

- Minimum 32 characters
- Use alphanumeric and special characters
- Different for each environment
- Change quarterly

### Storage

- **Development**: In `.env` file (NOT committed)
- **Production**: In platform environment variables (Vercel/Render)

### Usage

JWT tokens are signed with this secret. If changed:
- **All active tokens become invalid**
- Users must log in again
- Plan secret changes during low-traffic periods

---

## 💳 Stripe Configuration

### Test vs Live Keys

**Development**:
```
STRIPE_SECRET_KEY=sk_test_4eC39HqLyjWDarhtT657DG7P
STRIPE_PUBLIC_KEY=pk_test_0uqcJxKfQeJzZPfqqcZQDNmg
```

**Production**:
```
STRIPE_SECRET_KEY=sk_live_4eC39HqLyjWDarh...
STRIPE_PUBLIC_KEY=pk_live_9ecOvLBDLyjWDarh...
```

### Getting Your Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Switch to "Test" or "Live" mode
3. Copy Secret Key and Publishable Key
4. Add to environment variables

### Security

- **Secret Key**: Store only on backend
- **Public Key**: Can be exposed (frontend)
- Never commit keys to Git
- Use different keys per environment

---

## 🌐 CORS Configuration

### Format

```
CORS_ORIGIN=https://domain1.com,https://domain2.com
```

### Examples

**Single Domain**:
```
CORS_ORIGIN=https://celebrity-browser.vercel.app
```

**Multiple Domains**:
```
CORS_ORIGIN=https://app.com,https://preview.app.com,https://staging.app.com
```

**Localhost (Development)**:
```
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Auto-Detect in Code

The server automatically splits by comma:
```javascript
const origins = process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
```

### Testing CORS

```bash
# Your frontend origin
FRONTEND_URL="https://your-vercel-app.vercel.app"

# Test CORS
curl -H "Origin: $FRONTEND_URL" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-backend.onrender.com/api/health
```

---

## 📧 Email Configuration (Optional)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@celebritybrowser.com
```

### Gmail Setup

1. Enable 2FA on Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Create "App Password"
4. Use generated password in `SMTP_PASSWORD`

### SendGrid Alternative

```
SENDGRID_API_KEY=SG.xxx...
SENDGRID_FROM=noreply@celebritybrowser.com
```

---

## 🔴 Redis Configuration (Advanced Caching)

```
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-password
```

### Cloud Redis Services

**Redis Cloud**:
```
REDIS_URL=redis://:password@redis-host:port
```

**Heroku Redis**:
```
REDIS_URL=redis://h:password@host:port
```

---

## 🔍 Logging Configuration

```
LOG_LEVEL=info    # debug, info, warn, error
LOG_FORMAT=json   # json or text
LOG_FILE=./logs/app.log
```

### Log Levels

- **debug**: Verbose output for debugging
- **info**: General information (default)
- **warn**: Warnings about potential issues
- **error**: Only errors

---

## 📱 File Upload Configuration

```
UPLOAD_DIR=./uploads              # Directory for uploads
MAX_FILE_SIZE=5242880             # 5MB in bytes
ALLOWED_IMAGE_TYPES=jpg,png,webp  # Comma-separated
```

### Increasing File Size Limit

```
MAX_FILE_SIZE=10485760  # 10MB
```

### Valid Image Types

```
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp,gif
```

---

## 🧪 Testing Environment Variables

### Verify Variables are Loaded

```bash
# Check if environment variables are accessible
node -e "console.log(process.env.DB_URL ? '✓ DB_URL set' : '✗ DB_URL not set')"
```

### Local Testing

1. Create `.env` file in backend directory
2. Add all required variables
3. Run: `npm run dev`
4. Check console for "✅ PostgreSQL connected"

### Production Testing

After deployment:
```bash
# Health check
curl https://your-domain.com/api/health

# Should show environment in response
```

---

## ⚠️ Common Configuration Issues

### "Cannot find module 'dotenv'"

**Problem**: dotenv not installed
**Solution**: `npm install dotenv`

### "Cannot read properties of undefined (reading 'DB_URL')"

**Problem**: Environment variable not set
**Solution**: Add to platform environment variables

### "getaddrinfo ENOTFOUND host"

**Problem**: Database host is unreachable
**Solution**: Check `DB_URL` is correct and accessible

### "SSL: CERTIFICATE_VERIFY_FAILED"

**Problem**: SSL verification failing
**Solution**: Already handled in code with `ssl: { rejectUnauthorized: false }`

### "Invalid JWT signature"

**Problem**: `JWT_SECRET` doesn't match between services
**Solution**: Use same `JWT_SECRET` in all environments

---

## ✅ Environment Checklist

- [ ] `DB_URL` configured
- [ ] `JWT_SECRET` strong (32+ chars)
- [ ] `NODE_ENV` set to `production`
- [ ] `CORS_ORIGIN` matches frontend URL
- [ ] `STRIPE_SECRET_KEY` set (for payments)
- [ ] `STRIPE_PUBLIC_KEY` set (for payments)
- [ ] No secrets in `.env` file committed
- [ ] `.env.example` documents all variables
- [ ] Different secrets for dev/staging/production
- [ ] Secrets rotated quarterly
- [ ] Database SSL enabled
- [ ] Verified all variables load correctly

---

**Last Updated**: February 28, 2026
**Version**: 1.0.0
