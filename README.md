# MERN Mini Application - Hacker News Scraper

A full-stack MERN (MongoDB, Express, React, Node.js) application that scrapes the top stories from Hacker News, stores them in MongoDB, and displays them via a modern React frontend. Features user authentication with JWT, bookmarking functionality, and automated scheduled scraping.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Features
- **User Authentication**: Secure JWT-based authentication with register and login functionality
- **Automated Scraping**: Automatically scrapes top 10 Hacker News stories on server startup
- **Scheduled Tasks**: Optional hourly scheduled scraping using cron jobs
- **Bookmarking**: Users can save and manage bookmarked stories
- **Responsive UI**: Modern React frontend built with Vite for fast development and production builds
- **CORS Enabled**: Configurable CORS support for cross-origin requests

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Scraping**: Custom scraper module
- **Task Scheduling**: node-cron

### Frontend
- **Library**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS
- **State Management**: React Context API
- **HTTP Client**: Axios/Fetch API

## Project Structure

```
Assignment/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── scrapeController.js   # Scraping logic
│   │   └── storyController.js    # Story CRUD operations
│   ├── middleware/
│   │   └── auth.js               # JWT middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Story.js              # Story schema
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints
│   │   ├── scrape.js             # Scrape endpoints
│   │   └── stories.js            # Story endpoints
│   ├── scraper/
│   │   └── scrape.js             # HN scraper implementation
│   ├── server.js                 # Express app entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── StoryCard.jsx     # Story display component
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── pages/
│   │   │   ├── Bookmarks.jsx     # Bookmarks page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   └── Stories.jsx       # Stories feed page
│   │   ├── utils/
│   │   │   └── api.js            # API utilities
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── vercel.json               # Vercel deployment config
│   └── package.json
└── README.md
```

## Prerequisites
- **Node.js** v14 or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (cloud database) or local MongoDB instance
- **Git** for version control

## Installation

### Clone the Repository
```bash
git clone <your-repo-url>
cd Assignment
```

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Getting Started

### 1. Configure Environment Variables

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mernnews?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
ENABLE_CRON=true
```

### 2. Start the Backend Server
```bash
cd backend
npm start
```
The server will:
- Run on `http://localhost:5000`
- Automatically scrape Hacker News on startup
- (Optional) Run hourly scrapes if `ENABLE_CRON=true`

### 3. Start the Frontend Development Server
In a new terminal:
```bash
cd frontend
npm run dev
```
Open your browser to `http://localhost:5173`

## Environment Variables

### Backend (`.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `MONGODB_URI` | N/A | MongoDB connection string |
| `JWT_SECRET` | N/A | Secret key for JWT signing |
| `CORS_ORIGIN` | localhost:5173 | Allowed origins for CORS |
| `NODE_ENV` | development | Environment (development/production) |
| `ENABLE_CRON` | false | Enable automatic hourly scraping |

### Frontend (`.env` or `.env.local`)
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | http://localhost:5000/api | Backend API URL |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Stories
- `GET /api/stories` - Get all stories
- `GET /api/stories/:id` - Get a specific story
- `POST /api/stories/:id/bookmark` - Bookmark a story
- `DELETE /api/stories/:id/bookmark` - Remove bookmark

### Scraper
- `POST /api/scrape` - Trigger manual scrape
- `GET /api/scrape/status` - Get scraper status

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create a new Web Service on [Render](https://render.com/)
3. Connect your GitHub repository
4. Set Root Directory to `backend`
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Add Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`
   - `CORS_ORIGIN=https://your-frontend.vercel.app`
   - `ENABLE_CRON=true`
8. Deploy!

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and import your GitHub repository
2. Set Root Directory to `frontend`
3. Framework Preset: **Vite**
4. Add Environment Variables:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy!

## Usage

### Register a New Account
1. Navigate to the Register page
2. Enter email and password
3. Submit to create account

### View Stories
1. Login to your account
2. Browse the latest Hacker News stories on the Stories page
3. Each story card displays title, points, and comments count

### Bookmark Stories
1. Click the bookmark icon on any story card
2. Access bookmarked stories from the Bookmarks page
3. Remove bookmarks by clicking the bookmark icon again

## Notes
- The scraper automatically fetches the top 10 stories from Hacker News
- Stories are stored in MongoDB for persistence
- User data is encrypted and secured with JWT
- Scheduled scraping runs hourly if `ENABLE_CRON=true`
- For production, use an external scheduler instead of cron jobs
