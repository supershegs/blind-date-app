# Local setup and run instructions

Follow these steps to run the project locally. They assume you have Node.js 18+, PostgreSQL and pnpm installed.

1) Install dependencies

```bash
pnpm install
```

2) Copy environment example and edit values (database credentials, jwt secret)

```bash
cp .env.example .env
# Edit .env with your editor and set DATABASE_URL and JWT_SECRET
```

3) Prepare the database (ensure Postgres is running and DATABASE_URL is correct)

```bash
pnpm run db:generate
pnpm run db:push

Database notes / create DB

If you don't yet have the database created, create it before running `pnpm run db:push`.

On Linux / macOS (with `createdb` available):

```bash
createdb blindate_db
# or with explicit user/host/port:
# createdb -h localhost -p 5432 -U postgres blindate_db
```

On Windows (PowerShell) using `psql`:

```powershell
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE blindate_db;"
```

If you prefer Prisma to manage migrations instead of `db:push`, use:

```bash
pnpm run db:migrate
```

Or let the helper create the DB for you (reads `DATABASE_URL` from `.env`):

```bash
pnpm run db:create
```

CI / strict mode

If you want the server to fail fast when required env vars are missing (useful in CI), set:

```bash
FAIL_ON_MISSING_ENVS=1 pnpm run dev:server
```
```

4) Start the backend and frontend in separate terminals

Terminal 1 - Backend:
```bash
pnpm run dev:server
```

Terminal 2 - Frontend:
```bash
pnpm run dev
```

5) Visit the app

- Frontend: http://localhost:8080
- Backend API base: http://localhost:3000/api

Notes
- If you prefer a single command to run both, use: `pnpm run dev:both` (this uses concurrently).
- If you don't have `pnpm` installed, you can use `npm install` and `npm run <script>` but this repository expects pnpm.

- Windows users: `start-backend.bat` was updated to use `npx tsx server/index.ts` to avoid ESM/.ts execution errors that `ts-node` can cause on some setups.
