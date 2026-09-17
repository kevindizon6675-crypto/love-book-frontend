#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}💕 Our Little Love Book - Frontend Quick Start${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found ($(node -v))${NC}"

# Check if Angular CLI is installed globally
if ! command -v ng &> /dev/null; then
    echo -e "\n${BLUE}Installing Angular CLI globally...${NC}"
    npm install -g @angular/cli
    echo -e "${GREEN}✓ Angular CLI installed${NC}"
else
    echo -e "${GREEN}✓ Angular CLI found${NC}"
fi

# Install dependencies
echo -e "\n${BLUE}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Check if backend is running
echo -e "\n${BLUE}Checking backend connection...${NC}"
BACKEND_URL=$(grep "apiUrl" src/environments/environment.ts | sed "s/.*apiUrl: '\(.*\)'.*/\1/")

if curl -s "$BACKEND_URL/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend is running${NC}"
else
    echo -e "${RED}⚠️  Backend is not running${NC}"
    echo "Make sure to start the backend first:"
    echo "   cd backend"
    echo "   npm run dev"
fi

echo -e "\n${GREEN}🎉 Frontend setup complete!${NC}\n"
echo -e "${BLUE}To start the development server:${NC}"
echo "   npm start"
echo ""
echo -e "${BLUE}Frontend will be available at:${NC}"
echo "   http://localhost:4200"
echo ""
echo -e "${BLUE}To build for production:${NC}"
echo "   npm run build"
echo ""
echo -e "💕 ${GREEN}Enjoy your Love Book!${NC}"
