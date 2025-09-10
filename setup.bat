@echo off
echo ========================================
echo   Blind Date Application Setup
echo ========================================
echo.

echo [1/4] Installing dependencies...
pnpm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Rebuilding native modules...
pnpm rebuild bcrypt
if %errorlevel% neq 0 (
    echo ❌ Failed to rebuild bcrypt
    pause
    exit /b 1
)

echo.
echo [3/4] Setting up database...
npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ Failed to generate Prisma client
    pause
    exit /b 1
)

npx prisma db push
if %errorlevel% neq 0 (
    echo ❌ Failed to push database schema
    echo Make sure PostgreSQL is running and credentials in .env are correct
    pause
    exit /b 1
)

echo.
echo [4/4] Running basic tests...
node simple-test.js
if %errorlevel% neq 0 (
    echo ❌ Basic functionality test failed
    pause
    exit /b 1
)

echo.
echo ✅ Setup completed successfully!
echo.
echo ========================================
echo   How to start the application:
echo ========================================
echo 1. Start the backend:  pnpm run dev:server
echo 2. Start the frontend: pnpm run dev
echo.
echo Frontend will be available at: http://localhost:8080
echo Backend API will be available at: http://localhost:3000/api
echo.
echo ========================================
echo   Available Scripts:
echo ========================================
echo pnpm run dev          - Start frontend dev server
echo pnpm run dev:server   - Start backend dev server
echo pnpm run db:studio    - Open Prisma Studio
echo pnpm run build        - Build for production
echo.
pause