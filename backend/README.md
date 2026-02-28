# Backend - Celebrity Browser API

Node.js/Express-based REST API for the Celebrity Browser application with PostgreSQL integration.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Middleware](#middleware)
- [Configuration](#configuration)
- [Error Handling](#error-handling)

## 📁 Project Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication endpoints
│   │   ├── celebrityRoutes.js  # Celebrity endpoints
│   │   ├── paymentRoutes.js    # Payment endpoints
│   │   └── adminRoutes.js      # Admin endpoints
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   ├── celebrityController.js  # Celebrity logic
│   │   ├── paymentController.js    # Payment logic
│   │   └── adminController.js      # Admin logic
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── db.js                   # PostgreSQL connection pool
│   └── server.js               # Express server setup
├── database.sql                # PostgreSQL schema
├── .env                        # Environment variables
├── .env.example                # Example env file
└── package.json
```

## 🚀 Available Scripts

```bash
# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Install dependencies
npm install
```

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

#### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "message": "User created",
  "token": "jwt_token_here",
  "userId": "user_id_here"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "userId": "user_id_here",
  "isAdmin": false
}
```

### Celebrity Routes (`/api/celebrities`)

#### Get All Celebrities
```
GET /api/celebrities

Response:
[
  {
    "_id": "celebrity_id",
    "name": "Celebrity Name",
    "category": "Actor",
    "bio": "Biography...",
    "image": "image_url",
    "followers": 1000000,
    "yearsActive": "2010-present",
    "items": [...]
  }
]
```

#### Get Celebrity by ID
```
GET /api/celebrities/:id

Response:
{
  "_id": "celebrity_id",
  "name": "Celebrity Name",
  "category": "Actor",
  "bio": "Biography...",
  "items": [
    {
      "_id": "item_id",
      "name": "Fan Card",
      "description": "Autographed fan card",
      "price": 29.99,
      "stock": 100,
      "image": "image_url"
    }
  ]
}
```

### Payment Routes (`/api/payment`)

#### Process Payment
```
POST /api/payment/process
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "name": "Item Name",
      "price": 29.99,
      "quantity": 1
    }
  ],
  "payment": {
    "cardName": "John Doe",
    "cardNumber": "4242...",
    "expiryDate": "12/25",
    "cvv": "123"
  }
}

Response:
{
  "message": "Payment processed successfully",
  "orderId": "order_id",
  "amount": 32.99
}
```

#### Get User Orders
```
GET /api/payment/orders
Authorization: Bearer <token>

Response:
[
  {
    "_id": "order_id",
    "userId": "user_id",
    "items": [...],
    "totalAmount": 32.99,
    "status": "completed",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Admin Routes (`/api/admin`)

#### Add Celebrity (Admin Only)
```
POST /api/admin/celebrities
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Celebrity",
  "category": "Actor",
  "bio": "Celebrity biography...",
  "image": "image_url",
  "followers": 1000000,
  "yearsActive": "2015-present"
}

Response: Celebrity object
```

#### Update Celebrity (Admin Only)
```
PUT /api/admin/celebrities/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "Updated bio...",
  ...
}

Response: Updated celebrity object
```

#### Delete Celebrity (Admin Only)
```
DELETE /api/admin/celebrities/:id
Authorization: Bearer <admin_token>

Response:
{
  "message": "Celebrity deleted"
}
```

#### Add Item to Celebrity (Admin Only)
```
POST /api/admin/celebrities/:id/items
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Meet & Greet",
  "description": "1-hour meet and greet session",
  "price": 99.99,
  "stock": 10,
  "image": "image_url",
  "category": "Experience"
}

Response: Updated celebrity object with new item
```

## 📊 Database Schema

The application uses **PostgreSQL** for data storage. See `database.sql` for the complete schema.

### Users Table
```sql
Table: users
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR UNIQUE)
- password (VARCHAR - hashed with bcrypt)
- is_admin (BOOLEAN default false)
- created_at (TIMESTAMP)
```

### Celebrities Table
```sql
Table: celebrities
- id (SERIAL PRIMARY KEY)
- name (VARCHAR UNIQUE)
- category (VARCHAR)
- bio (TEXT)
- image (VARCHAR)
- followers (INTEGER)
- years_active (VARCHAR)
- response_time (VARCHAR)
- created_at (TIMESTAMP)
```

### Items Table
```sql
Table: items
- id (SERIAL PRIMARY KEY)
- celebrity_id (INTEGER - FK to celebrities)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- stock (INTEGER)
- image (VARCHAR)
- category (VARCHAR)
- created_at (TIMESTAMP)
```

### Orders Table
```sql
Table: orders
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER - FK to users)
- total_amount (DECIMAL)
- status (VARCHAR - pending|completed|cancelled)
- payment_method (VARCHAR)
- shipping_address (TEXT)
- created_at (TIMESTAMP)
```

### Order Items Table
```sql
Table: order_items
- id (SERIAL PRIMARY KEY)
- order_id (INTEGER - FK to orders)
- item_id (INTEGER - FK to items)
- quantity (INTEGER)
- price (DECIMAL)
```

## 🔒 Middleware

### Authentication Middleware (`middleware/auth.js`)

#### verifyToken
- Extracts JWT from Authorization header
- Validates token signature
- Adds userId, userEmail, isAdmin to request object
- Returns 401 if token missing or invalid

#### verifyAdmin
- Calls verifyToken first
- Checks if user has admin role
- Returns 403 if not admin

Usage:
```javascript
router.post('/protected-route', verifyToken, controllerFunction)
router.post('/admin-route', verifyAdmin, adminFunction)
```

## ⚙️ Configuration

### Environment Variables (`.env`)

```
PORT=5000                                   # Server port
DB_HOST=localhost                          # PostgreSQL host
DB_PORT=5432                               # PostgreSQL port
DB_NAME=celebrity_browser                  # Database name
DB_USER=postgres                           # Database user
DB_PASSWORD=postgres                       # Database password
JWT_SECRET=your-secret-key-change-in-production   # JWT signing key
NODE_ENV=development                              # Environment
STRIPE_SECRET_KEY=your-stripe-secret-key          # Stripe API key
```

### Server Setup (`src/server.js`)

- Express app initialization
- CORS configuration for frontend
- JSON body parser
- PostgreSQL connection test
- Route registration
- Health check endpoint

### Database Connection (`src/db.js`)

- PostgreSQL connection pool using `pg` package
- Environment-based configuration
- `query()` method for executing SQL statements
- `getClient()` method for raw client access

## 🔑 Authentication & Security

### Password Hashing
- Uses bcrypt with salt rounds of 10
- Never stored in plain text
- Verified on login using bcrypt.compare()

### JWT Tokens
- Issued on signup/login
- Contains: userId, email, isAdmin
- Expiration: 24 hours
- Verified middleware for protected routes

### CORS
- Configured to allow requests from frontend
- Can be restricted in production

## 📝 Error Handling

All routes return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

Error Response Format:
```json
{
  "message": "Error description"
}
```

## 🗄️ Database Setup

### Local PostgreSQL

#### macOS (using Homebrew)
```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database
createdb celebrity_browser

# Apply schema
psql -U postgres -d celebrity_browser -f database.sql

# Verify connection
psql -U postgres -d celebrity_browser -c "\dt"
```

#### Windows
```bash
# Download and install PostgreSQL from postgresql.org
# During installation, note the password you set for the postgres user

# Create database
createdb -U postgres celebrity_browser

# Apply schema
psql -U postgres -d celebrity_browser -f database.sql

# Verify connection
psql -U postgres -d celebrity_browser -c "\dt"
```

#### Linux (Ubuntu/Debian)
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql

# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE celebrity_browser;

# Apply schema (as regular user)
psql -U postgres -d celebrity_browser -f database.sql
```

### PostgreSQL Cloud (AWS RDS, Azure Database, etc.)
1. Create a managed PostgreSQL instance
2. Note the connection details (host, port, username, password)
3. Create the database: `CREATE DATABASE celebrity_browser;`
4. Apply schema using a SQL client
5. Update `.env` with cloud connection details

### Testing Database Connection
```bash
# Start backend server
npm run dev

# Check server logs for: "PostgreSQL connected"
# Or test the health endpoint:
curl http://localhost:5000/api/health
```

## 🧪 Testing Endpoints

Using cURL or Postman:

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

### Get Celebrities
```bash
curl http://localhost:5000/api/celebrities
```

## 🚀 Deployment

### Heroku
```bash
# Add Procfile:
echo "web: npm start" > Procfile

# Deploy:
git push heroku main
```

### AWS EC2
1. Launch EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies: `npm install`
5. Set environment variables
6. Start server: `npm start`

### DigitalOcean App Platform
1. Connect GitHub repository
2. Set environment variables
3. Deploy

## 📚 Dependencies

- **express**: Web framework
- **pg**: PostgreSQL client for Node.js
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT tokens
- **dotenv**: Environment variables
- **cors**: Cross-origin requests
- **stripe**: Payment processing

## 🔗 Links

- [Express Documentation](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [pg npm Package](https://node-postgres.com)
- [JWT Documentation](https://jwt.io)
- [Stripe API Reference](https://stripe.com/docs/api)

---

Built with ❤️ using Express and PostgreSQL
