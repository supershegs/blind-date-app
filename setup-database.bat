@echo off
echo 🗄️ Setting up Database...
echo.
echo Make sure PostgreSQL is running and .env file is configured!
echo.
echo Generating Prisma Client...
npx prisma generate
echo.
echo Pushing database schema...
npx prisma db push
echo.
echo ✅ Database setup complete!
echo.
echo You can now run the application with start-both.bat
pause