# AI Career Coach – Frontend + Backend (Node/Express + Postgres + Gemini)

This repo contains:

- Frontend: React (Vite) app located in `ai-career-coach-william/`
- Backend: Node.js/Express server with Prisma ORM located in `server/`
- Database: PostgreSQL (Neon recommended)
- AI: Google Generative AI (Gemini) for recommendations, skill gap analysis, roadmaps, and chat

The project provides features like auth, profile management, progress tracker, AI job recommendations, skill-gap with roadmap, chat mentor, and roadmap PDF generation.

---

## 1) Prerequisites

- Node.js 20.19+ or 22.12+ (if you are on Node 22, ensure 22.12+ to satisfy Vite engine requirement)
- npm 10+
- A Neon PostgreSQL database URL
- A Google Generative AI API key (optional – the app will fall back to local logic if missing or API disabled)

---

## 2) Environment Variables

Create a `.env` file in `server/` with:

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
```

Notes:
- Ensure the `DATABASE_URL` begins with `postgresql://` and not quoted. For Neon, prefer the non-pooler host for migrations. If needed append `&pgbouncer=false`.

Create a `.env` file in `ai-career-coach-william/` (frontend) with:

```
VITE_API_BASE_URL=http://localhost:5000
```

---

## 3) Install Dependencies

Run these from the repository root:

```
cd server
npm i
npx prisma generate

# apply schema to DB (creates tables)
npx prisma db push

# in a separate terminal for frontend
cd ../ai-career-coach-william
npm i
```

---

## 4) Start the Apps (two terminals)

Terminal A – Backend (port 5000):

```
cd server
npm run dev
```

Terminal B – Frontend (Vite default 5173):

```
cd ai-career-coach-william
npm run dev
```

Open the app at `http://localhost:5173`.

---

## 5) API Overview (Backend)

Base URL: `http://localhost:5000`

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Profile: `GET /api/profile`, `POST /api/profile`
- Progress: `GET/POST /api/progress`, `PUT/DELETE /api/progress/:id`
- AI:
  - `POST /api/ai/recommendations` – career paths
  - `POST /api/ai/skill-gap` – gap only
  - `POST /api/ai/roadmap` – roadmap only
  - `POST /api/ai/skill-gap-roadmap` – gap + roadmap together
- Chat: `POST /api/chat`
- PDF: `POST /api/pdf/roadmap` – generate PDF from roadmap JSON

Notes:
- If `GEMINI_API_KEY` is not present or the API is disabled, endpoints return safe fallback data instead of errors.

---

## 6) Common Issues & Fixes

- Prisma errors like `DATABASE_URL` missing/invalid: verify `.env` in `server/` and restart the backend.
- If you see pooler errors on Neon: switch to the direct (non-`-pooler`) host and/or append `&pgbouncer=false` in `DATABASE_URL` when running schema pushes.
- Vite engine warning on Node 22: ensure Node `22.12+` (or use Node `20.19+`).

---

## 7) How to Use (MVP Walkthrough)

1. Sign up and log in.
2. Build your Profile (skills, interests, academic info).
3. Explore:
   - Dashboard & Job Recommendations (AI)
   - Skills Gap – enter a role and your skills, click Analyze to get gaps and a learning roadmap.
   - Roadmap Generator – generate a role-based roadmap and download as PDF.
   - Career Q&A – ask questions to the AI mentor.

---

## 8) Project Structure

```
repo-root/
  server/                 # Node/Express backend
    src/
      routes/             # API routes (auth, profile, progress, ai, pdf, chat)
      services/           # business logic (ai.service, auth.service, pdf.service, etc.)
      config/prisma.js     # Prisma client
    prisma/schema.prisma   # DB schema
  ai-career-coach-william/ # React frontend
    src/                   # pages, components, lib/api client
```

---

## 9) Production Notes

- For Neon, run `npx prisma migrate deploy` during deploys.
- Set all env vars in your hosting environment (API key, DB URL, JWT secret).
- Serve the frontend separately (static host) and point `VITE_API_BASE_URL` to your backend URL.

---

## 10) License

MIT (or your preferred license)

