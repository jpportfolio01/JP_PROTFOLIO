# Deployment & Architecture Guide
**Dr. Jitendra Parmar Academic Portfolio, AnveshanAI & JUET SQL Virtual Lab**

---

## 📁 Segregated Architecture Overview

The repository is organized into distinct, independent frontend and backend workspaces:

```
JITENDRA_PARMAR/
├── frontend/             # 🌐 Independent Frontend Static Application
│   ├── index.html        # Academic Portfolio & Bio
│   ├── projects.html     # AnveshanAI Research & Innovation Lab
│   ├── sql-practice.html # Interactive Virtual Lab (75 queries across 5 modules)
│   ├── publications.html # SCI-Q1 Journal & IEEE Conference Papers
│   ├── team.html         # Research Scholars & Collaborators
│   ├── admin.html        # Administration Suite
│   ├── signup.html       # Official Google OAuth 2.0 Sign-In Portal
│   ├── 404.html          # Custom Not Found / Invalid URL Page
│   ├── config.js         # Centralized API Configuration & Auto-Router
│   ├── vercel.json       # Pre-configured Vercel routing configuration
│   ├── package.json      # Local static server runner (npx serve)
│   ├── images/           # Badges, photos & AnveshanAI official logo
│   └── style.css         # Modern academic typography & responsive CSS
│
├── backend/              # ⚙️ Independent Backend API & Database Service
│   ├── server.js         # Express entry point (CORS, REST routes, port handling)
│   ├── package.json      # Dependencies (express, cors, dotenv) & start scripts
│   ├── .env.example      # Template for environment variables (PORT, GOOGLE_CLIENT_ID)
│   ├── routes/api.js     # 25+ REST endpoints for student progress, challenges & admin
│   ├── controllers/      # Auth, SQL testing engine & admin CRUD controllers
│   ├── models/db.js      # Persistent SQLite storage & query safety validator
│   ├── middleware/       # JuetAuth & institutional domain restriction policies
│   └── data/             # SQLite DB, SQL modules, seed hospital database & schemas
│
├── package.json          # 🚀 Root Workspace Orchestrator
└── DEPLOYMENT.md         # Deployment Documentation
```

---

## 🌐 Deploying the Frontend

You can deploy `frontend/` to any static hosting provider for free (Vercel, Netlify, Render Static Site, or GitHub Pages).

### Option 1: Vercel (Recommended)
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Other**.
4. Click **Deploy**.
5. Once your backend is deployed on Render (e.g. `https://your-api.onrender.com`), open [`frontend/config.js`](file:///Users/narayansingh/Desktop/JITENDRA_PARMAR/frontend/config.js) and set `JUET_BACKEND_URL`:
   ```javascript
   var JUET_BACKEND_URL = 'https://your-backend.onrender.com';
   ```

### Option 2: Netlify
1. Log in to [Netlify](https://netlify.com) and click **Add new site** > **Import an existing project**.
2. Connect your GitHub repository.
3. Set **Base directory** to `frontend`.
4. Leave Build command empty and publish directory as `.`.
5. Click **Deploy site**.

### Option 3: Render Static Site
1. On [Render](https://render.com), click **New +** > **Static Site**.
2. Connect your repository.
3. Set **Root Directory** to `frontend`.
4. Publish directory: `.`.
5. Click **Create Static Site**.

---

## ⚙️ Deploying the Backend (Render Web Service)

1. Go to [Render.com](https://render.com) and click **New +** > **Web Service**.
2. Connect your repository.
3. Configure the service settings:
   - **Name**: `juet-virtual-lab-backend` (or your choice)
   - **Environment**: `Node`
   - **Region**: Singapore / Frankfurt / Oregon
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add **Environment Variables** in Render:
   - `NODE_ENV`: `production`
   - `GOOGLE_CLIENT_ID`: `<your-google-oauth-client-id>.apps.googleusercontent.com`
   *(Render will inject `PORT` automatically)*
5. Under **Advanced Settings**:
   - **Health Check Path**: `/api/health`
6. Click **Create Web Service**.

---

## 🔗 Connecting Frontend to Backend

In [`frontend/config.js`](file:///Users/narayansingh/Desktop/JITENDRA_PARMAR/frontend/config.js):

```javascript
var JUET_BACKEND_URL = (function() {
    // Replace with your live Render backend URL:
    return 'https://your-backend.onrender.com';
})();
```

> [!TIP]
> **Automatic Fetch Proxying**:
> [`frontend/config.js`](file:///Users/narayansingh/Desktop/JITENDRA_PARMAR/frontend/config.js) automatically intercepts any `fetch('/api/...')` call and prefixes it with your Render backend URL. You don't need to manually alter individual API calls across HTML pages!

---

## 💻 Local Development Commands

From the workspace root, you can run:

```bash
# 1. Start the backend API server (runs on http://localhost:5001):
npm run backend

# 2. Start the frontend static server (runs on http://localhost:3000):
npm run frontend

# 3. Regenerate SQL practice HTML from modules data:
npm run generate-html
```
