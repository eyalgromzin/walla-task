#!/bin/bash

# Meme Gallery - Quick Start Script
# This script sets up and runs the application

echo "🎨 Meme Gallery - Quick Start"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "   Please install from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found!"
    echo ""
    echo "You need to create .env.local with MongoDB connection:"
    echo ""
    echo "Option 1 - MongoDB Atlas (Cloud):"
    echo "  MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/walla_db?retryWrites=true&w=majority"
    echo ""
    echo "Option 2 - Local MongoDB:"
    echo "  MONGODB_URI=mongodb://localhost:27017/walla_db"
    echo ""
    echo "Create .env.local file with one of the above and run this script again."
    exit 1
fi

echo "📋 Configuration:"
echo "✅ .env.local is configured"
echo ""

# Check if .env.local has valid MONGODB_URI
if ! grep -q "MONGODB_URI" .env.local; then
    echo "❌ MONGODB_URI not found in .env.local"
    exit 1
fi

echo "🚀 Starting development server..."
echo "   Open: http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""

npm run dev
