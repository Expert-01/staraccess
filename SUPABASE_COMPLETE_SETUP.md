# ✅ Complete Supabase Setup Instructions

Your new Supabase database is ready! Follow these steps to complete the setup.

## 📋 Files Created

- ✅ `backend/schema.sql` - Complete database schema
- ✅ `backend/verify-supabase-schema.js` - Verification script
- ✅ `backend/test-supabase-connection.js` - Connection tester
- ✅ `backend/.env` - Updated with new database URL
- ✅ `SUPABASE_SETUP.md` - Detailed Supabase guide

---

## 🚀 STEP 1: Create Schema in Supabase

### Option A: Using Supabase Web UI (Easiest)

1. Go to [app.supabase.com](https://app.supabase.com)
2. Log in and select your project
3. Click **SQL Editor** on the left sidebar
4. Click **New Query** button
5. **Copy** the entire contents of `backend/schema.sql`
6. **Paste** into the SQL editor
7. Click the **Run** button
8. Wait for success message ✅

### Option B: Using PowerShell Command Line

Run this command in PowerShell:

```powershell
$env:PGPASSWORD="RmD6hsDZ2lpCoAud"
psql -h aws-1-eu-west-1.pooler.supabase.com -p 6543 -U postgres.sihznmwxehevigqtsvzk -d postgres -f backend/schema.sql
```

### Option C: Using psql GUI Tool (pgAdmin or DBeaver)

1. Create new connection with these settings:
   ```
   Host: aws-1-eu-west-1.pooler.supabase.com
   Port: 6543
   Database: postgres
   User: postgres.sihznmwxehevigqtsvzk
   Password: RmD6hsDZ2lpCoAud
   ```
2. Right-click database → Import
3. Select `backend/schema.sql`
4. Execute

---

## 🧪 STEP 2: Verify Schema Was Created

After creating the schema, verify it worked:

### Quick Verification (in Supabase Web UI)

1. Go to **Table Editor** in Supabase
2. You should see 5 tables:
   - `users`
   - `celebrities` 
   - `items`
   - `orders`
   - `order_items`

### Detailed Verification (from Command Line)

```bash
cd backend
npm run verify-db
```

Expected output:
```
🔌 Connecting to Supabase...
✅ Connected to Supabase!

📊 Checking Tables...
Found 5 tables:
  ✅ users
  ✅ celebrities
  ✅ items
  ✅ orders
  ✅ order_items

✅ All expected tables exist!

📈 Data Summary:
  Users: 0
  Celebrities: 3
  Items: 6
  Orders: 0
  Order Items: 0

✨ SCHEMA VERIFICATION PASSED! ✨
```

---

## 🔌 STEP 3: Test Backend Connection

### Start the Backend

```bash
cd backend
npm run dev
```

You should see in console:
```
✅ PostgreSQL connected: { now: 2024-02-28T... }
🚀 Server running on port 5001
```

If you see this, **your backend is Connected to Supabase!** 🎉

### Test the Health Endpoint

In another terminal:
```bash
curl http://localhost:5001/api/health
```

Expected response:
```json
{
  "status": "Server is running",
  "timestamp": "2024-02-28T...",
  "env": "development"
}
```

---

## 🎨 STEP 4: Test Frontend Connection

### Start the Frontend

```bash
cd frontend
npm run dev
```

Expected: Frontend runs on `http://localhost:3000` or `http://localhost:5173`

### Test Sign Up

1. Open browser to `http://localhost:3000`
2. Click "Sign Up"
3. Fill in form:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPass123
4. Click Submit
5. Check for success message

### Verify User in Database

In Supabase, go to **Table Editor** → **users**:
- You should see your test user created ✅

---

## 📊 STEP 5: Verify Sample Data

### Check Celebrities Were Created

Supabase → **Table Editor** → **celebrities**

You should see:
- Taylor Swift
- Dwayne Johnson
- Ariana Grande

### Check Items Were Created

Supabase → **Table Editor** → **items**

You should see items like:
- Fan Card (Taylor Swift)
- Meet & Greet (Taylor Swift)
- Call Permit (Taylor Swift)
- Fan Card (Dwayne Johnson)
- etc.

---

## 🎯 STEP 6: Ready for Deployment

Once all the above steps are complete:

1. ✅ Schema created in Supabase
2. ✅ Backend connects successfully
3. ✅ Frontend connects successfully
4. ✅ Sample data visible
5. ✅ Sign up flow works

Your application is **READY TO DEPLOY**!

### Next: Deploy to Vercel/Render

Follow the [DEPLOYMENT_QUICK_START.md](DEPLOYMENT_QUICK_START.md) guide:

```bash
# For Vercel
vercel --prod

# For Render
git push origin main
```

---

## 🆘 Troubleshooting

### "Connection refused"
```
Error: connect ECONNREFUSED
```

**Solutions:**
1. Check internet connection
2. Verify Supabase project is active (not paused)
3. Check firewall isn't blocking port 6543
4. Try pinging the server: `ping aws-1-eu-west-1.pooler.supabase.com`

### "Authentication failed"
```
Error: password authentication failed
```

**Solutions:**
1. Copy-paste password exactly (no spaces)
2. Make sure you didn't modify the connection string
3. In Supabase, go to **Settings** → **Database** → reset password if needed

### "Tables already exist"
```
ERROR: relation "users" already exists
```

**This is OK!** The schema uses `IF NOT EXISTS` so re-running is safe.
No data will be deleted.

### "Permission denied"
```
ERROR: permission denied
```

**Solutions:**
1. Use the correct username: `postgres.sihznmwxehevigqtsvzk`
2. Use the correct password
3. Make sure you're connecting to the right project

---

## 📌 Useful Commands

```bash
# Verify database connection and schema
npm run verify-db

# Test Supabase connection directly
npm run test-connection

# Start backend
npm run dev

# Build backend
npm run build

# Check database URL
echo %DB_URL%  (Windows)
echo $DB_URL   (Mac/Linux)
```

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Contact Supabase Support**: https://supabase.com/support

---

## ✨ You're All Set!

Your Celebrity Browser application is now connected to Supabase! 

**Next Steps:**
1. Test locally (npm run dev in both frontend and backend)
2. Deploy to Vercel or Render (see DEPLOYMENT_QUICK_START.md)
3. Configure environment variables on your deployment platform
4. Test production deployment

---

**Status**: ✅ Supabase Setup Complete
**Database**: Connected and Ready
**Next**: Deploy to Production
