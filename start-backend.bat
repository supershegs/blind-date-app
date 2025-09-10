@echo off
echo 🚀 Starting Backend Server...
echo.
echo Backend will run on: http://localhost:3000
echo API endpoints available at: http://localhost:3000/api
echo.
npx ts-node --project tsconfig.backend.json server/index.ts
pause