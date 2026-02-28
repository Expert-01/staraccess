# Celebrity Browser Website - Project Setup Guide

This is a full-stack web application for browsing celebrities and purchasing items like fan cards, meet & greets, call permits, and VIP access.

## Tech Stack
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB (recommended) or PostgreSQL
- **Authentication**: JWT tokens
- **Payment**: Stripe integration (placeholder)

## Project Structure
```
celebritybrowser/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Images, icons
│   │   ├── styles/          # CSS modules
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Node.js API server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/      # Business logic
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Auth, validation
│   │   └── server.js
│   └── package.json
│
└── .github/
    └── copilot-instructions.md
```

## App Flow
1. **Landing Page** - Marketing page introducing the platform
2. **Authentication** - Signup/Login with JWT
3. **Home Page (FYP)** - Feed of aesthetic celebrity cards
4. **Celebrity Detail Page** - Items available for purchase
5. **Shopping Cart** - Review selected items
6. **Payment Page** - Secure checkout with Stripe
7. **Admin Panel** - Manage celebrities, items, and orders

## Color Theme
- Primary: Black (#000000) and White (#FFFFFF)
- Secondary: Grayscale shades (#333333, #666666, #999999)
- Accent: Blue (#0066FF or similar)

## Setup Instructions
Follow the checklist below to complete the project setup.

- [ ] Create folder structure (frontend and backend directories)
- [ ] Initialize React frontend with Vite or Create React App
- [ ] Install Tailwind CSS in frontend
- [ ] Initialize Node.js backend with Express
- [ ] Install required dependencies
- [ ] Create database models and schemas
- [ ] Set up authentication system
- [ ] Build core components (Navigation, Cards, Forms)
- [ ] Implement API endpoints
- [ ] Set up payment integration
- [ ] Create admin dashboard
- [ ] Set up environment variables
- [ ] Test application endpoints

## Development Commands
Will be added after project scaffolding.

## Additional Notes
- Use environment variables for API URLs and secrets
- Ensure responsive design with Tailwind CSS
- Implement proper error handling and validation
- Follow REST API conventions for backend
