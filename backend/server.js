require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./routes/api');
const authController = require('./controllers/authController');

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for frontend React app and static site
app.use(cors());

// Parse incoming JSON payloads with generous limit for image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve API routes under /api
app.use('/api', apiRoutes);

// Frontend static integration: check if frontend or website directory exists
const frontendPath = path.join(__dirname, '..', 'frontend');
const websiteFallback = path.join(__dirname, '..', 'website');
const staticPath = fs.existsSync(frontendPath) ? frontendPath : (fs.existsSync(websiteFallback) ? websiteFallback : null);
const hasStatic = staticPath !== null;

// Direct authentication endpoints for /signup
app.post('/signup', authController.loginOrRegister);
app.post('/api/signup', authController.loginOrRegister);

if (hasStatic) {
  // Routes for /signup (GET serves page)
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, 'signup.html'));
  });

  // Direct Virtual Lab requests to SQL Practice
  app.get('/virtual-lab', (req, res) => {
    res.redirect('/sql-practice.html');
  });
  app.get('/virtual-lab.html', (req, res) => {
    res.redirect('/sql-practice.html');
  });

  // Serve static frontend files if accessed via backend
  app.use(express.static(staticPath));

  // Route for /404 page
  app.get('/404', (req, res) => {
    res.status(404).sendFile(path.join(staticPath, '404.html'));
  });
} else {
  // Standalone backend mode (e.g. Render Web Service with Root Directory set to backend)
  app.get('/', (req, res) => {
    res.json({
      success: true,
      service: 'Dr. Jitendra Parmar - JUET Virtual Lab Backend API',
      status: 'online',
      faculty: 'Dr. Jitendra Parmar (JUET Guna)',
      endpoints: {
        health: '/api/health',
        sqlModules: '/api/sql/modules',
        googleClientId: '/api/auth/google-client-id'
      }
    });
  });
}

// 404 Handler for undefined API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    path: req.originalUrl
  });
});

// Catch-all 404 Handler for invalid website URLs
app.use((req, res) => {
  if (hasStatic && fs.existsSync(path.join(staticPath, '404.html'))) {
    res.status(404).sendFile(path.join(staticPath, '404.html'));
  } else {
    res.status(404).json({
      success: false,
      error: 'Not Found',
      message: 'The requested route does not exist on this backend server.',
      path: req.originalUrl
    });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error in JUET Virtual Lab Engine',
    details: err.message
  });
});

// Robust port startup: defaults to 5001 (port 5000 is reserved on macOS for AirPlay Receiver)
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`====================================================`);
    console.log(`🚀 JUET Virtual Lab SQL Backend Server Running!`);
    console.log(`👨‍🏫 Faculty: Dr. Jitendra Parmar (JUET Guna)`);
    console.log(`🔗 Local API:       http://localhost:${port}/api`);
    console.log(`💾 Points Storage:  Persistent SQLite (backend/data/juet_virtual_lab.sqlite)`);
    console.log(`🌐 Web Platform:    http://localhost:${port}/index.html`);
    console.log(`💻 SQL Practice UI: http://localhost:${port}/sql-practice.html`);
    console.log(`====================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is already in use. Retrying on port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

const initialPort = parseInt(process.env.PORT || '5001', 10);
startServer(initialPort);

module.exports = app;
