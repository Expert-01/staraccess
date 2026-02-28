# Frontend - Celebrity Browser

React-based frontend application for the Celebrity Browser website using Vite, Tailwind CSS, and React Router.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Components](#components)
- [Pages](#pages)
- [Styling](#styling)
- [Configuration](#configuration)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Navigation bar with auth links
│   │   ├── CelebrityCard.jsx   # Celebrity card component
│   │   └── ItemCard.jsx        # Item card for products
│   ├── pages/
│   │   ├── LandingPage.jsx     # Home/landing page
│   │   ├── SignupPage.jsx      # User signup
│   │   ├── LoginPage.jsx       # User login
│   │   ├── HomePage.jsx        # Celebrity feed (FYP)
│   │   ├── CelebrityDetailPage.jsx  # Celebrity details & items
│   │   ├── CartPage.jsx        # Shopping cart
│   │   ├── PaymentPage.jsx     # Payment/checkout
│   │   └── AdminPage.jsx       # Admin dashboard
│   ├── assets/                 # Images, icons
│   ├── styles/                 # CSS modules
│   ├── App.jsx                 # Root component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── public/                     # Static files
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── .eslintrc.cjs               # ESLint config
├── index.html                  # HTML template
└── package.json
```

## 🚀 Available Scripts

```bash
# Start development server (Vite)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📦 Components

### Navigation
- **File**: `components/Navigation.jsx`
- **Props**: `isAuthenticated`, `isAdmin`
- **Features**:
  - Responsive navbar
  - Conditional menu items based on auth state
  - Links to main pages

### CelebrityCard
- **File**: `components/CelebrityCard.jsx`
- **Props**: `celebrity`, `onClick`
- **Features**:
  - Displays celebrity image and info
  - Shows preview of available items
  - Click handler for navigation

### ItemCard
- **File**: `components/ItemCard.jsx`
- **Props**: `item`, `onAdd`
- **Features**:
  - Product image and details
  - Price display
  - Quantity selector
  - Add to cart functionality

## 📄 Pages

### LandingPage (`pages/LandingPage.jsx`)
- Marketing homepage
- Feature highlights
- Call-to-action buttons
- Signup/Login links

### SignupPage (`pages/SignupPage.jsx`)
- User registration form
- Password validation
- Form error handling
- Auto-redirect on success

### LoginPage (`pages/LoginPage.jsx`)
- User authentication
- Email/password login
- JWT token management
- Admin role detection

### HomePage (`pages/HomePage.jsx`)
- Celebrity feed (FYP style)
- Grid layout of celebrities
- Click to view details
- Axios API call to backend

### CelebrityDetailPage (`pages/CelebrityDetailPage.jsx`)
- Celebrity profile view
- Statistics (followers, years active)
- Available items listing
- Cart management via localStorage

### CartPage (`pages/CartPage.jsx`)
- Shopping cart display
- Item quantity management
- Remove items
- Order summary
- Checkout button

### PaymentPage (`pages/PaymentPage.jsx`)
- Payment form
- Card details input
- Payment processing
- Success/error handling
- Demo integration (ready for Stripe)

### AdminPage (`pages/AdminPage.jsx`)
- Tabbed interface (Celebrities, Items, Orders)
- Add celebrity form
- Delete celebrity function
- Extensible for items and orders management

## 🎨 Styling

### Tailwind CSS
- Configured in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles inline in JSX
- Color scheme:
  - Primary: Black & White
  - Secondary: Grayscale
  - Accent: Blue

### Custom CSS
- App-level styles in `src/App.css`
- Global utilities in `src/index.css`
- Scrollbar customization
- Smooth scroll behavior

## ⚙️ Configuration

### Vite Config (`vite.config.js`)
```javascript
- React plugin enabled
- Port: 3000
- Proxy to backend: /api -> http://localhost:5000
```

### Tailwind Config (`tailwind.config.js`)
```javascript
- Content paths configured for src/
- Custom colors defined
- Font family extended
```

### PostCSS Config (`postcss.config.js`)
```javascript
- Tailwind CSS plugin
- Autoprefixer for browser compatibility
```

## 🔗 API Integration

The frontend communicates with the backend via:
- Base URL: `/api` (proxied to `http://localhost:5000`)
- Axios for HTTP requests
- JWT tokens in Authorization header
- localStorage for token and cart data

### Example API Call:
```javascript
const response = await fetch('/api/celebrities', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
```

## 📱 Responsive Design

All pages are responsive using Tailwind CSS:
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly components

## 🔒 State Management

Currently using:
- React `useState` for component state
- `localStorage` for:
  - JWT tokens
  - Shopping cart items
  - User preferences

Future: Could integrate Zustand for global state:
```bash
npm install zustand
```

## 🐛 Development Tips

- Use Vite's fast refresh for instant UI updates
- Check browser console for API errors
- Verify backend is running before testing features
- Clear localStorage if experiencing auth issues

## 📊 Build Output

```bash
npm run build
# Generates optimized bundle in dist/
# Ready for deployment
```

## 🚀 Deployment

The built frontend can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

Remember to update backend API URL for production!

## 🔗 Links

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)

---

Build with ❤️ using React and Tailwind CSS
