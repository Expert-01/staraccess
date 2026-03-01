# API Testing Guide - StarAccess

## Quick Testing Commands

### 1. **Signup Test** 
Create a new user account

**Method:** `POST`  
**URL:** `https://celeb-backend-gy6s.onrender.com/api/auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "TestPassword123!",
  "confirmPassword": "TestPassword123!"
}
```

**Expected Response (200):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 2. **Login Test**
Authenticate with existing credentials

**Method:** `POST`  
**URL:** `https://celeb-backend-gy6s.onrender.com/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "testuser@example.com",
  "password": "TestPassword123!"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "isAdmin": false
}
```

---

### 3. **Get All Celebrities**
Fetch the list of all celebrities

**Method:** `GET`  
**URL:** `https://celeb-backend-gy6s.onrender.com/api/celebrities`

**Headers:**
```
Content-Type: application/json
```

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "name": "Celebrity Name",
    "category": "Actor",
    "bio": "Celebrity bio",
    "followers": "15.2M",
    "items": [...]
  }
]
```

---

### 4. **Health Check**
Verify the backend is running

**Method:** `GET`  
**URL:** `https://celeb-backend-gy6s.onrender.com/api/health`

**Expected Response (200):**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## Testing on Your Phone

### Option 1: Using Thunder Client (Mobile App)
1. Download Thunder Client from your phone's app store
2. Import the `thunder-client-tests.json` file
3. Test each endpoint directly from your phone

### Option 2: Using cURL (Terminal)
```bash
# Signup
curl -X POST https://celeb-backend-gy6s.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPassword123!","confirmPassword":"TestPassword123!"}'

# Login
curl -X POST https://celeb-backend-gy6s.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPassword123!"}'

# Get Celebrities
curl https://celeb-backend-gy6s.onrender.com/api/celebrities

# Health Check
curl https://celeb-backend-gy6s.onrender.com/api/health
```

### Option 3: Using Postman or Insomnia
1. Open Postman/Insomnia
2. Create a new POST request
3. Use the endpoints above

---

## Common Issues & Solutions

### ❌ "Connection Refused" or "Cannot reach server"
**Solution:** 
- Verify the backend is running on Render (check render.com dashboard)
- Check if the URL is correct: `https://celeb-backend-gy6s.onrender.com`
- Wait 30 seconds if you just deployed (Render might be starting up)

### ❌ "Invalid email or password"
**Solution:**
- Make sure you signed up first before trying to login
- Use the exact same email and password you signed up with
- Check for spaces or typos in credentials

### ❌ "User already exists"
**Solution:**
- Use a different email address
- Or login with the existing account instead

### ❌ Database connection error
**Solution:**
- Check if `DB_URL` environment variable is set in Render
- Verify Supabase connection string is correct
- Check Render logs for detailed error messages

---

## Testing Checklist

- [ ] Server responds to health check
- [ ] Signup with new credentials works
- [ ] Login with created account works
- [ ] Celebrities list returns data
- [ ] Frontend connects successfully to backend
- [ ] Phone can access the hosted site
- [ ] Phone can complete signup flow
- [ ] Phone can login successfully

