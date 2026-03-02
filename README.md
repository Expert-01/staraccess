# Celebrity Browser Website

A full-stack web application for browsing celebrities and purchasing exclusive items like fan cards, meet & greets, call permits, and VIP access.

## 🌟 Features

- **Browse Celebrities** - Explore a curated collection of celebrities with detailed profiles
- **Fan Cards** - Collect exclusive autographed fan cards
- **Meet & Greets** - Book exclusive meet and greet sessions
- **Call Permits** - Get direct call permits to connect with celebrities
- **VIP Access** - Unlock VIP experiences and backstage access
- **Secure Payment** - Safe and secure payment processing with Stripe integration
- **Admin Dashboard** - Manage celebrities, items, and orders
- **User Authentication** - JWT-based authentication system

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Zustand** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Stripe** - Payment processing

## 📁 Project Structure

```
celebritybrowser/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Images, icons
│   │   ├── styles/          # CSS modules
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── package.json
│
├── backend/                  # Node.js API server
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/      # Business logic handlers
│   │   ├── models/          # Database schemas
│   │   ├── middleware/      # Auth and validation
│   │   └── server.js        # Express server setup
│   ├── .env                 # Environment variables
│   └── package.json
│
├── .vscode/
│   └── tasks.json           # VS Code development tasks
│
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot setup guide
│
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud)

### Installation

1. **Clone the repository**
   ```bash
   cd celebritybrowser
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/celebrity-browser
   JWT_SECRET=your-secret-key-change-in-production
   NODE_ENV=development
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

### Development

The project includes VS Code tasks for running both servers. Open the integrated terminal and run:

**Option 1: Run both servers together**
```bash
Ctrl+Shift+B (or Cmd+Shift+B on Mac)
```
Then select "Run Both Servers"

**Option 2: Run servers individually**

Frontend (from VS Code terminal):
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

Backend (from another terminal):
```bash
cd backend
npm run dev
```
The backend API will run on `http://localhost:5000`

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

#### Celebrities
- `GET /api/celebrities` - Get all celebrities
- `GET /api/celebrities/:id` - Get celebrity details

#### Payment
- `POST /api/payment/process` - Process payment (requires auth)
- `GET /api/payment/orders` - Get user orders (requires auth)

#### Admin (requires admin role)
- `POST /api/admin/celebrities` - Add celebrity
- `PUT /api/admin/celebrities/:id` - Update celebrity
- `DELETE /api/admin/celebrities/:id` - Delete celebrity
- `POST /api/admin/celebrities/:id/items` - Add item to celebrity

## 🎨 Color Theme

- **Primary**: Black (#000000) and White (#FFFFFF)
- **Secondary**: Grayscale (#333333, #666666, #999999)
- **Accent**: Blue (#0066FF)

## 📱 Application Flow

1. **Landing Page** - Marketing and introduction
2. **Authentication** - Signup/Login with JWT tokens
3. **Home Page (FYP)** - Feed of aesthetic celebrity cards
4. **Celebrity Detail** - View celebrity profile and available items
5. **Shopping Cart** - Manage selected items
6. **Payment** - Secure checkout with Stripe
7. **Admin Panel** - Manage celebrities and orders

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users sign up with email and password
2. Password is hashed using bcrypt
3. JWT token is generated on login
4. Token is stored in localStorage
5. Include token in Authorization header: `Bearer <token>`

## 💳 Payment Integration

Payment processing is integrated with Stripe:

- Test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3-digit number

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Stripe API Reference](https://stripe.com/docs/api)

## 🐛 Troubleshooting

### MongoDB Connection Error
Ensure MongoDB is running locally or update `MONGO_URI` in `.env` with your MongoDB Atlas connection string.

### Port Conflicts
If port 3000 or 5000 is in use, modify ports in:
- Frontend: `vite.config.js`
- Backend: `.env` (PORT variable)

### Dependencies Issues
Clear cache and reinstall:
```bash
cd frontend && rm -rf node_modules package-lock.json && npm install
cd ../backend && rm -rf node_modules package-lock.json && npm install
```

## 📝 License

This project is open source and available under the MIT License.

## 👥 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy coding!** 🚀
# staraccess
# staraccess
