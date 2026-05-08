# MERN Mini Application - Hacker News Scraper

This is a full-stack MERN application that scrapes the top 10 stories from Hacker News, stores them in MongoDB, and displays them via a React frontend. It includes user authentication (JWT) and bookmarking functionality.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas Account (or local MongoDB)

## Getting Started Locally

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables in `backend/.env`:
   - `PORT=5000`
   - `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/mernnews?retryWrites=true&w=majority`
   - `JWT_SECRET=your_jwt_secret_key`
4. Start the server: `npm start`
   *(The server will automatically scrape HN on startup and run hourly via cron).*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
4. Open your browser to `http://localhost:5173`.

## Deployment Guide (Render & Vercel)

### Backend (Render)
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository and select the `backend` root directory.
4. Set the Build Command to `npm install` and the Start Command to `node server.js` (or `npm start`).
5. Add your Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`).
6. Deploy! Render will give you a live URL (e.g., `https://your-backend.onrender.com`).

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and import your GitHub repository.
2. Set the Framework Preset to **Vite** and the Root Directory to `frontend`.
3. Add Environment Variables:
   - `VITE_API_URL=https://your-backend.onrender.com/api` *(replace with your actual Render URL)*
4. Deploy!
