# AI Career Coach - Backend

## Setup

1. Create `.env` in `server/`:

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
```

2. Install deps and generate Prisma client:

```
npm i
npm run prisma:generate
```

3. Run migrations (creates tables):

```
npm run prisma:migrate -- --name init
```

4. Start dev server:

```
npm run dev
```

## API Overview
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/profile
- POST /api/profile
- GET /api/progress
- POST /api/progress
- PUT /api/progress/:id
- DELETE /api/progress/:id
- POST /api/ai/recommendations
- POST /api/ai/skill-gap
- POST /api/ai/roadmap
- POST /api/chat
- POST /api/pdf/roadmap
