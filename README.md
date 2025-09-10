# Blind Date Application

A secure, full-stack dating application built with React, Express, Prisma, and PostgreSQL.

## Features

- 🔐 Secure user authentication with JWT
- 👤 User registration and profile management
- 🛡️ Input validation and sanitization
- 🔒 Password hashing with bcrypt
- 📊 Admin dashboard for user management
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 🗄️ PostgreSQL database with Prisma ORM

## Security Features

- Rate limiting
- CORS protection
- Helmet security headers
- Input validation with Zod
- SQL injection prevention
- XSS protection
- Timing attack prevention
- Log injection prevention

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm package manager

## Quick Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd reactjs
   pnpm install
   ```

2. **Setup environment variables:**
   - Copy `.env.example` to `.env`
   - Update database credentials and JWT secret

3. **Setup database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start development servers:**
   
   Terminal 1 (Backend):
   ```bash
   pnpm run dev:server
   ```
   
   Terminal 2 (Frontend):
   ```bash
   pnpm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000/api
   - Database Studio: `pnpm run db:studio`

## Environment Variables

```env
# Application
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database
DATABASE_URL="postgresql://postgres:admin@localhost:5432/blindate_db"

# Frontend
VITE_API_URL=http://localhost:3000/api
```

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/profile` - Create user profile
- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint

## Database Schema

### Users Table
- id, username, email, password (hashed)
- role, createdAt, updatedAt
- isActive, isVerified

### User Profiles Table
- Personal information (name, location, bio)
- Physical attributes (height, weight, complexion)
- Interests and hobbies

## Development Scripts

```bash
# Development
pnpm run dev              # Start frontend dev server
pnpm run dev:server       # Start backend dev server

# Database
pnpm run db:generate      # Generate Prisma client
pnpm run db:push          # Push schema to database
pnpm run db:migrate       # Run migrations
pnpm run db:studio        # Open Prisma Studio

# Build & Deploy
pnpm run build           # Build for production
pnpm run start           # Start production server
```

## Project Structure

```
├── client/              # React frontend
│   ├── components/      # UI components
│   ├── pages/          # Route components
│   ├── services/       # API services
│   └── hooks/          # Custom hooks
├── server/             # Express backend
│   ├── routes/         # API routes
│   └── index.ts        # Server setup
├── prisma/             # Database schema
├── shared/             # Shared types/utilities
└── public/             # Static assets
```

## Security Considerations

1. **Authentication**: JWT tokens with secure secrets
2. **Password Security**: bcrypt with salt rounds
3. **Input Validation**: Zod schemas for all inputs
4. **Rate Limiting**: Prevents brute force attacks
5. **CORS**: Configured for specific origins
6. **Headers**: Security headers via Helmet
7. **Database**: Parameterized queries via Prisma

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure security best practices

## License

MIT License - see LICENSE file for details