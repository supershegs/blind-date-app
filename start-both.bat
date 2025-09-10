@echo off
echo 🚀 Starting Full Stack Application...
echo.
echo This will open 2 terminal windows:
echo 1. Backend Server (http://localhost:3000)
echo 2. Frontend Server (http://localhost:8080)
echo.
echo Starting Backend...
start "Backend Server" cmd /k "npx ts-node --project tsconfig.backend.json server/index.ts"
timeout /t 3 /nobreak >nul
echo Starting Frontend...
start "Frontend Server" cmd /k "pnpm run dev"
echo.
echo ✅ Both servers are starting!
echo Backend: http://localhost:3000/api
echo Frontend: http://localhost:8080
echo.
pause