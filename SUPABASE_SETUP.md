# 🗄️ Supabase Setup Guide

## ✅ Your Supabase Credentials

```
Connection String: postgresql://postgres.sihznmwxehevigqtsvzk:RmD6hsDZ2lpCoAud@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
Host: aws-1-eu-west-1.pooler.supabase.com
Port: 6543 (Connection Pooling)
User: postgres.sihznmwxehevigqtsvzk
Password: RmD6hsDZ2lpCoAud
Database: postgres
```

✅ **Already updated in** `.env` file

---

## 🚀 Setup Steps

### Step 1: Import Schema into Supabase

**Option A: Using Supabase Studio (Web UI) - RECOMMENDED**

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy contents of `backend/schema.sql`
6. Paste into the SQL editor
7. Click **Run**
8. Wait for "Success" message

**Option B: Using psql Command Line**

```bash
# PowerShell
$env:PGPASSWORD = "RmD6hsDZ2lpCoAud"
psql -h aws-1-eu-west-1.pooler.supabase.com -p 6543 -U postgres.sihznmwxehevigqtsvzk -d postgres -f backend/schema.sql

# When prompted, press Enter (password is already set)
```

**Option C: Using VS Code SQL Extension**

1. Install "SQLTools" extension in VS Code
2. Create connection to Supabase using the credentials above
3. Open `backend/schema.sql`
4. Right-click → Execute Query

---

## ✅ Verify Schema Created

After running the schema, verify everything is set up:

```bash
cd backend
node verify-supabase-schema.js
```

Or manually check in Supabase Studio:
1. Go to **Table Editor** (left sidebar)
2. You should see:
   - `users`
   - `celebrities`
   - `items`
   - `orders`
   - `order_items`

---

## 🧪 Test Connection from Backend

```bash
cd backend
npm run dev
```

Watch for this in console:
```
✅ PostgreSQL connected: { now: 2024-02-28T... }
```

If you see this, your backend is successfully connected to Supabase! 🎉

---

## 🔑 Important Notes

- **Port 6543**: Uses Connection Pooling (recommended for serverless)
- **SSL**: Automatically enabled (rejectUnauthorized: false)
- **Sample Data**: Included in schema.sql (celebrities & items)
- **Backups**: Supabase automatically backs up daily

---

## 📊 What's in the Schema

| Table | Purpose |
|-------|---------|
| `users` | User accounts & authentication |
| `celebrities` | Celebrity profiles |
| `items` | Products for sale (fan cards, meet & greets, etc.) |
| `orders` | Customer orders |
| `order_items` | Items in each order |

---

## 🆘 Troubleshooting

### "Connection refused"
- Check internet connection
- Verify connection string is correct
- Check Supabase project is active (not paused)

### "Password authentication failed"
- Copy-paste the password exactly
- Check for extra spaces
- Regenerate credentials in Supabase if needed

### "Tables already exist"
- That's okay! Using `IF NOT EXISTS` prevents errors
- Your data is safe

### "Permission denied"
- Use `postgres.sihznmwxehevigqtsvzk` user (not others)
- You should have full permissions

---

## 📌 Next Steps

1. ✅ Set database URL in `.env` (DONE)
2. ⭕ Import schema into Supabase (DO THIS NOW)
3. ⭕ Test backend connection: `npm run dev`
4. ⭕ Test frontend connection: `npm run dev` (in frontend folder)
5. ⭕ Deploy to Vercel/Render

---

## 💾 Backup Your Data

Supabase automatically creates backups, but you can also:

```bash
# Export data from Supabase
psql postgresql://postgres.sihznmwxehevigqtsvzk:RmD6hsDZ2lpCoAud@aws-1-eu-west-1.pooler.supabase.com:6543/postgres -c "\dt" > tables.txt

# Export specific table
psql postgresql://postgres.sihznmwxehevigqtsvzk:RmD6hsDZ2lpCoAud@aws-1-eu-west-1.pooler.supabase.com:6543/postgres -t -A -F"," -c "SELECT * FROM users;" > users_backup.csv
```

---

**Status**: Ready to set up Supabase! 🚀
