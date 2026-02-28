# Quick Start Guide - Celebrity Browser

This guide will help you set up and run the Celebrity Browser application after the MongoDB → PostgreSQL migration.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 1. PostgreSQL Setup

### Option A: Local Installation

#### macOS
```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create the database
createdb celebrity_browser

# Apply schema
psql -U postgres -d celebrity_browser -f backend/database.sql

# Verify
psql -U postgres -d celebrity_browser -c "\dt"
```

#### Windows
```bash
# Install from: https://www.postgresql.org/download/windows/
# During installation, remember the postgres password

# Create database (in Command Prompt)
createdb -U postgres celebrity_browser

# Apply schema
psql -U postgres -d celebrity_browser -f backend/database.sql

# Verify
psql -U postgres -d celebrity_browser -c "\dt"
```

#### Linux (Ubuntu/Debian)
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb celebrity_browser

# Apply schema
psql -U postgres -d celebrity_browser -f backend/database.sql

# Verify
psql -U postgres -d celebrity_browser -c "\dt"
```

### Option B: Cloud Database (AWS RDS, Azure, etc.)

1. Create a PostgreSQL instance in your cloud provider
2. Get the connection string (host, port, username, password)
3. Create database: `CREATE DATABASE celebrity_browser;`
4. Apply schema using a SQL client or psql
5. Continue to Step 2

## 2. Configure Environment Variables

### Backend (.env)

Create `backend/.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=celebrity_browser
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-secret-key-here-change-in-production
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key
```

**Note**: Change these values to match your PostgreSQL setup!

## 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (if not already installed)
cd ../frontend
npm install

cd ..
```

## 4. Verify PostgreSQL Connection

```bash
# Start backend server
cd backend
npm run dev
```

You should see in the logs:
```
PostgreSQL connected
Server running on port 5000
```

Press `Ctrl+C` to stop the server.

## 5. Start Development Servers

### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Starts on: `http://localhost:5000`

### Terminal 2 - Frontend Dev Server
```bash
cd frontend
npm run dev
```
Starts on: `http://localhost:3000`

Open your browser and navigate to `http://localhost:3000`

## 6. Test the Application

### Create a Test Account
1. Click "Sign Up" on the landing page
2. Fill in: Name, Email, Password
3. You should be redirected to the Home page

### Test API Directly (with curl)

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get celebrities
curl http://localhost:5000/api/celebrities

# Health check
curl http://localhost:5000/api/health
```

## 7. Add Test Data (Admin Only)

First, create an admin account:

```bash
psql -U postgres -d celebrity_browser

UPDATE users SET is_admin = true WHERE email = 'test@example.com';
```

Then use the Admin Panel in the frontend to add celebrities and items:
1. Login with your admin account
2. Go to the Admin page
3. Add celebrities and items

Or add via API:

```bash
curl -X POST http://localhost:5000/api/admin/celebrities \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Leonardo DiCaprio",
    "category": "Actor",
    "bio": "Award-winning actor",
    "image": "image_url",
    "followers": 25000000,
    "years_active": "1990-present"
  }'
```

## 8. Database Management

### Connect to Database
```bash
psql -U postgres -d celebrity_browser
```

### Common Commands
```sql
-- List tables
\dt

-- View users table
SELECT * FROM users;

-- View celebrities
SELECT * FROM celebrities;

-- View orders
SELECT * FROM orders;

-- Exit
\q
```

### Backup Database
```bash
pg_dump -U postgres celebrity_browser > backup.sql
```

### Restore Database
```bash
psql -U postgres -d celebrity_browser < backup.sql
```

## Troubleshooting

### Error: PostgreSQL Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Make sure PostgreSQL is running
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Start PostgreSQL from Services or command line
```

### Error: Database Does Not Exist
```
Error: database "celebrity_browser" does not exist
```
**Solution**: Create the database
```bash
createdb celebrity_browser
```

### Error: Schema Not Applied
```
Error: relation "users" does not exist
```
**Solution**: Run the schema file
```bash
psql -U postgres -d celebrity_browser -f backend/database.sql
```

### Error: Wrong Credentials
```
Error: role "postgres" does not exist / password authentication failed
```
**Solution**: Check your `.env` file DB_USER and DB_PASSWORD match your PostgreSQL setup

### Frontend Won't Connect to Backend
```
Error: Network request failed / CORS error
```
**Solution**: 
1. Make sure backend is running on port 5000
2. Check CORS is enabled in `backend/src/server.js`
3. Check frontend API URL in environment

## Project Structure Overview

```
celebritybrowser/
├── frontend/              # React application (port 3000)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── App.jsx
│   └── package.json
│
├── backend/               # Express API server (port 5000)
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth & validation
│   │   ├── db.js          # PostgreSQL connection
│   │   └── server.js
│   ├── database.sql       # PostgreSQL schema
│   └── package.json
│
├── MIGRATION.md           # Migration details
└── QUICK_START.md         # This file
```

## Available npm Scripts

### Backend
```bash
npm start                 # Production server
npm run dev              # Development server with auto-reload
```

### Frontend
```bash
npm run dev              # Development server
npm run build            # Build for production
npm run preview          # Preview production build
```

## Next Steps

1. ✅ Set up PostgreSQL database
2. ✅ Configure `.env` file
3. ✅ Install dependencies
4. ✅ Start development servers
5. ⏭️  Add test data and celebrities
6. ⏭️  Test payment integration (Stripe)
7. ⏭️  Deploy to production

## Production Deployment

### Backend Deployment (Heroku, Railway, DigitalOcean, etc.)
1. Create account and connect GitHub
2. Set environment variables in platform
3. Deploy

### Frontend Deployment (Vercel, Netlify, etc.)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm run dev`
4. Deploy

### Database Deployment
1. Use managed PostgreSQL service (AWS RDS, Azure Database, etc.)
2. Create database and apply schema
3. Update connection string in backend `.env`

## Support

For more detailed documentation, see:
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Migration Notes](MIGRATION.md)
- [Project Instructions](.github/copilot-instructions.md)

---

**Happy coding!** 🚀

If you encounter any issues, check the troubleshooting section or refer to the official documentation links in the README files.
