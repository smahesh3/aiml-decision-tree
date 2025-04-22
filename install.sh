#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== AIML Decision Tree Application Installation ===${NC}"
echo -e "${YELLOW}This script will help you install the dependencies for the AIML Decision Tree Application.${NC}"
echo

# Check if Node.js is installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}Node.js is already installed: ${NODE_VERSION}${NC}"
else
    echo -e "${RED}Node.js is not installed.${NC}"
    echo -e "${YELLOW}Please install Node.js from https://nodejs.org/ (LTS version recommended)${NC}"
    echo -e "${YELLOW}After installing Node.js, run this script again.${NC}"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}npm is already installed: ${NPM_VERSION}${NC}"
else
    echo -e "${RED}npm is not installed.${NC}"
    echo -e "${YELLOW}Please install Node.js from https://nodejs.org/ which includes npm.${NC}"
    exit 1
fi

# Install dependencies
echo
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo
    echo -e "${GREEN}Installation completed successfully!${NC}"
    echo
    echo -e "${BLUE}To start the development server, run:${NC}"
    echo -e "${YELLOW}npm run dev${NC}"
    echo
    echo -e "${BLUE}Then open http://localhost:3000 in your browser.${NC}"
else
    echo
    echo -e "${RED}Installation failed. Please check the error messages above.${NC}"
    exit 1
fi 