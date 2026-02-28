#!/bin/bash

# Celebrity Browser - Deployment Validation Script
# This script validates the project is ready for deployment

echo "🔍 Validating Celebrity Browser project for production deployment..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track errors
ERRORS=0
WARNINGS=0

# Function to check file existence
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
    else
        echo -e "${RED}✗${NC} $1 MISSING"
        ((ERRORS++))
    fi
}

# Function to check for required env vars documentation
check_env() {
    if grep -q "$1" "$2" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $1 documented"
    else
        echo -e "${YELLOW}⚠${NC} $1 not found in $2"
        ((WARNINGS++))
    fi
}

echo "📁 Checking configuration files..."
check_file "vercel.json"
check_file "render.yaml"
check_file "backend/.env.example"
check_file "frontend/.env.example"
check_file "DEPLOYMENT.md"
check_file "PRODUCTION_REQUIREMENTS.md"

echo ""
echo "📦 Checking package.json scripts..."

# Check backend package.json
if grep -q '"start"' "backend/package.json"; then
    echo -e "${GREEN}✓${NC} backend: start script defined"
else
    echo -e "${YELLOW}⚠${NC} backend: start script missing"
    ((WARNINGS++))
fi

# Check frontend package.json
if grep -q '"build"' "frontend/package.json"; then
    echo -e "${GREEN}✓${NC} frontend: build script defined"
else
    echo -e "${RED}✗${NC} frontend: build script MISSING"
    ((ERRORS++))
fi

echo ""
echo "🔐 Checking for sensitive data..."

# Check for hardcoded secrets
if grep -r "sk_live_\|sk_test_\|pk_live_\|pk_test_" --include="*.js" --include="*.jsx" . 2>/dev/null | grep -v node_modules | grep -v ".git"; then
    echo -e "${RED}✗${NC} Potential hardcoded Stripe keys found!"
    ((ERRORS++))
else
    echo -e "${GREEN}✓${NC} No hardcoded API keys detected"
fi

if grep -r "DATABASE_URL\|DB_PASSWORD" --include=".env" . 2>/dev/null | grep -v ".env.example"; then
    echo -e "${YELLOW}⚠${NC} .env file exists (should not be committed)"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} .env file not committed"
fi

echo ""
echo "📋 Environment Variables..."
check_env "DB_URL" "backend/.env.example"
check_env "JWT_SECRET" "backend/.env.example"
check_env "STRIPE_SECRET_KEY" "backend/.env.example"
check_env "CORS_ORIGIN" "backend/.env.example"
check_env "NODE_ENV" "backend/.env.example"

echo ""
echo "🏗️  Build Configuration..."

# Check Vite config
if grep -q "outDir.*dist" "frontend/vite.config.js"; then
    echo -e "${GREEN}✓${NC} Vite build output configured"
else
    echo -e "${YELLOW}⚠${NC} Vite output directory not explicit"
    ((WARNINGS++))
fi

# Check Node version
if grep -q '"node"' "backend/package.json"; then
    echo -e "${GREEN}✓${NC} Node version specified"
else
    echo -e "${YELLOW}⚠${NC} Node version not specified in package.json"
    ((WARNINGS++))
fi

echo ""
echo "🔗 API Configuration..."

if grep -q "CORS_ORIGIN" "backend/src/server.js"; then
    echo -e "${GREEN}✓${NC} CORS configuration in place"
else
    echo -e "${RED}✗${NC} CORS not configured"
    ((ERRORS++))
fi

if grep -q "graceful\|SIGTERM" "backend/src/server.js"; then
    echo -e "${GREEN}✓${NC} Graceful shutdown configured"
else
    echo -e "${YELLOW}⚠${NC} Graceful shutdown not implemented"
    ((WARNINGS++))
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Project is ready for deployment.${NC}"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS warnings found. Project ready with minor improvements needed.${NC}"
    exit 0
else
    echo -e "${RED}✗ $ERRORS critical errors found. Please fix before deployment.${NC}"
    exit 1
fi
