/**
 * Dr. Jitendra Parmar Academic Portfolio & JUET Virtual Lab
 * Centralized API & Deployment Configuration
 */

// If your frontend and backend are deployed on different services:
// Enter your live Render backend URL below, e.g.: 'https://your-backend.onrender.com'
var JUET_BACKEND_URL = (function() {
    // 1. Check if user configured in window
    if (typeof window !== 'undefined' && window.BACKEND_API_URL) {
        return window.BACKEND_API_URL.replace(/\/+$/, '');
    }
    // 2. Local development fallback: automatically routes to port 5001
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return window.location.port === '5001' ? '' : 'http://localhost:5001';
    }
    // 3. In production: empty string means same-origin relative URLs (/api/...)
    // If hosting frontend on Vercel/Netlify/GitHub Pages and backend on Render, enter your Render URL here:
    return '';
})();

function getApiUrl(endpoint) {
    var ep = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    return JUET_BACKEND_URL + ep;
}

// Seamless Auto-Router: When JUET_BACKEND_URL is set (e.g. Render backend),
// any fetch('/api/...') is automatically routed to the remote backend!
(function() {
    if (typeof window === 'undefined' || !window.fetch) return;
    var nativeFetch = window.fetch;
    window.fetch = function(input, init) {
        if (typeof input === 'string' && input.startsWith('/api') && JUET_BACKEND_URL) {
            var target = JUET_BACKEND_URL.replace(/\/+$/, '') + input;
            return nativeFetch(target, init);
        }
        return nativeFetch(input, init);
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JUET_BACKEND_URL, getApiUrl };
}
