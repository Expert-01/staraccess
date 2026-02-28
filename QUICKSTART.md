# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- VS Code (recommended)

## Step 1: Install Dependencies

Both frontend and backend dependencies should already be installed. If needed, reinstall:

```bash
# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

## Step 2: Configure Backend

1. **Update `.env` file** in the `backend` directory:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/celebrity-browser
   JWT_SECRET=change-this-secret-in-production
   NODE_ENV=development
   ```

2. **Start MongoDB** (if using local instance):
   ```bash
   # macOS:
   brew services start mongodb-community
   
   # Windows: Start MongoDB service or use:
   mongod
   ```

## Step 3: Run Development Servers

### Option A: Use VS Code Tasks (Recommended)
1. Press `Ctrl+Shift+B` (or `Cmd+Shift+B` on Mac)
2. Select "Run Both Servers"
3. Both servers will start automatically

### Option B: Manual Setup (Two Terminal Windows)

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Access at: `http://localhost:3000`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend API: `http://localhost:5000`

## Step 4: Test the Application

1. Open `http://localhost:3000` in your browser
2. Click "Sign Up" or "Get Started"
3. Create a new account
4. You'll be taken to the home page (currently no celebrities loaded)

## Step 5: Populate Database (Optional)

To add test data via the admin panel:

1. Log in as admin (set `isAdmin: true` in MongoDB)
2. Navigate to `/admin`
3. Add celebrities and items

Or use a MongoDB client (MongoDB Compass, MongoDB Atlas UI) to insert test data.

## Troubleshooting

### Server won't start
- Check if ports 3000 and 5000 are available
- Kill existing processes on those ports

### MongoDB connection error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Verify MongoDB service status

### Dependencies missing
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Token/Auth issues
- Clear browser localStorage: Open DevTools > Application > Local Storage > Clear All
- Re-login to get new token

## Project Directories

- **Frontend**: `./frontend/` (React + Vite + Tailwind)
- **Backend**: `./backend/` (Express + MongoDB)
- **Docs**: [Main README](./README.md), [Frontend README](./frontend/README.md), [Backend README](./backend/README.md)

## Next Steps

1. **Customize**: Update colors, fonts, and branding
2. **Add Features**: Extend with more functionality
3. **Database**: Populate with real celebrities and items
4. **Stripe Integration**: Connect real payment processing
5. **Deployment**: Deploy frontend to Vercel/Netlify, backend to Heroku/Railway

## Key API Endpoints

- **Signup**: `POST /api/auth/signup`
- **Login**: `POST /api/auth/login`
- **Get Celebrities**: `GET /api/celebrities`
- **Get Celebrity Details**: `GET /api/celebrities/:id`
- **Process Payment**: `POST /api/payment/process`
- **Admin Routes**: `/api/admin/celebrities/*`

## File Structure Overview

```
celebritybrowser/
├── frontend/           # React app (3000)
├── backend/            # Express API (5000)
├── .vscode/tasks.json  # Development tasks
├── README.md           # Main documentation
└── .github/            # GitHub Copilot instructions
```

---

**Happy coding!** 🚀

For more details, check the README files in the main directory and project folders.
