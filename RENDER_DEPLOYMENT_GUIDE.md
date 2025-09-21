# Render Deployment Guide

This guide will help you deploy your AI Career Coach application to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. A PostgreSQL database (you can use Render's managed PostgreSQL)
3. Google AI API key for the AI features

## Backend Deployment

### 1. Create a New Web Service

1. Go to your Render dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `server` folder as the root directory

### 2. Configure Build Settings

- **Build Command**: `npm install && npm run prisma:generate && npm run prisma:deploy`
- **Start Command**: `npm start`
- **Node Version**: 18 or higher

### 3. Environment Variables

Add these environment variables in your Render service settings:

```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.onrender.com
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
GOOGLE_AI_API_KEY=your-google-ai-api-key
ALLOWED_ORIGINS=https://your-frontend-app.onrender.com,http://localhost:5173
```

### 4. Database Setup

1. Create a PostgreSQL database in Render
2. Copy the database URL and add it to your environment variables
3. The Prisma migrations will run automatically during deployment

## Frontend Deployment

### 1. Create a New Static Site

1. Go to your Render dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Select the `ai-career-coach-william` folder as the root directory

### 2. Configure Build Settings

- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18 or higher

### 3. Environment Variables

Add these environment variables in your Render service settings:

```
VITE_API_BASE_URL=https://your-backend-api.onrender.com
VITE_BACKEND_URL=https://your-backend-api.onrender.com
```

## Important Notes

1. **Update URLs**: After deploying both services, update the URLs in your environment variables:
   - In backend: Update `FRONTEND_URL` and `ALLOWED_ORIGINS` with your frontend URL
   - In frontend: Update `VITE_API_BASE_URL` and `VITE_BACKEND_URL` with your backend URL

2. **CORS Configuration**: The backend is now configured to accept requests from your frontend URL automatically.

3. **Database**: Make sure your database is accessible from Render's servers.

4. **API Keys**: Keep your API keys secure and never commit them to version control.

## Testing

After deployment:
1. Test the backend health endpoint: `https://your-backend-api.onrender.com/health`
2. Test the frontend by visiting your frontend URL
3. Test the API connection by trying to register/login

## Troubleshooting

- Check Render logs for any build or runtime errors
- Ensure all environment variables are set correctly
- Verify database connectivity
- Check CORS settings if you're getting CORS errors
