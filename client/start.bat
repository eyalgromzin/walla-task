@echo off
REM Meme Gallery - Quick Start Script for Windows

echo.
echo 🎨 Meme Gallery - Quick Start
echo ==============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed.
    echo    Please install from: https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Check .env.local
if not exist ".env.local" (
    echo ⚠️  .env.local not found!
    echo.
    echo You need to create .env.local with MongoDB connection:
    echo.
    echo Option 1 - MongoDB Atlas (Cloud):
    echo   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/walla_db?retryWrites=true^&w=majority
    echo.
    echo Option 2 - Local MongoDB:
    echo   MONGODB_URI=mongodb://localhost:27017/walla_db
    echo.
    echo Create .env.local file with one of the above and run this script again.
    pause
    exit /b 1
)

echo 📋 Configuration:
echo ✅ .env.local is configured
echo.

findstr /m "MONGODB_URI" .env.local >nul
if errorlevel 1 (
    echo ❌ MONGODB_URI not found in .env.local
    pause
    exit /b 1
)

echo 🚀 Starting development server...
echo    Open: http://localhost:3000
echo    Press Ctrl+C to stop
echo.

call npm run dev
pause
