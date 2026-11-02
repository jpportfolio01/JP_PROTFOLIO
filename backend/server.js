
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const authController = require('./controllers/authController');

const app = express();

// CORS
app.use(cors());

// Parse incoming requests
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// API routes
app.use('/api', apiRoutes);

// Authentication endpoints
app.post('/signup', authController.loginOrRegister);
app.post('/api/signup', authController.loginOrRegister);

// Backend health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        service: 'JUET Virtual Lab Backend API',
        status: 'online',
        faculty: 'Dr. Jitendra Parmar (JUET Guna)',
        endpoints: {
            health: '/api/health',
            sqlModules: '/api/sql/modules',
            googleClientId: '/api/auth/google-client-id'
        }
    });
});

// API 404 handler
app.all('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'API endpoint not found',
        path: req.originalUrl
    });
});

// All other routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'This backend only provides API endpoints.',
        path: req.originalUrl
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);

    res.status(500).json({
        success: false,
        error: 'Internal Server Error in JUET Virtual Lab Engine',
        details: err.message
    });
});

// Start server
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('====================================================');
    console.log('🚀 JUET Virtual Lab Backend API Running!');
    console.log('👨‍🏫 Faculty: Dr. Jitendra Parmar (JUET Guna)');
    console.log(`🔗 API URL: https://your-backend.onrender.com/api`);
    console.log('💾 SQLite Database Initialized');
    console.log(`🚀 Server Port: ${PORT}`);
    console.log('====================================================');
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

module.exports = app;
