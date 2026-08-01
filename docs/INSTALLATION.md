# Installation locale

## Prérequis
- Node.js 20+
- npm 10+
- PostgreSQL 15+ ou Docker Desktop

## Frontend
1. `cd frontend`
2. Copier `.env.example` vers `.env`
3. `npm install`
4. `npm run dev`

## Backend
1. `cd backend`
2. Copier `.env.example` vers `.env`
3. Démarrer PostgreSQL
4. `npm install`
5. `npx prisma generate`
6. `npx prisma migrate dev --name init`
7. `npm run start:dev`

Frontend : http://localhost:5173
API : http://localhost:3000/api
Health : http://localhost:3000/api/health
