/**
 * Dr. Jitendra Parmar Academic Portfolio & JUET Virtual Lab
 * Centralized API & Deployment Configuration
 */

// If your frontend and backend are deployed on different services:
// Live Render backend URL:
var JUET_BACKEND_URL = (function() {
    // 1. Check if explicitly configured on window
    if (typeof window !== 'undefined' && window.BACKEND_API_URL) {
        return window.BACKEND_API_URL.replace(/\/+$/, '');
    }
    // 2. Local development fallback: automatically routes to port 5001
    if (typeof window !== 'undefined') {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
            return window.location.port === '5001' ? '' : 'http://localhost:5001';
        }
        // 3. In production on the Render backend domain itself:
        if (window.location.hostname === 'jp-protfolio-1.onrender.com') {
            return '';
        }
    }
    // 4. Deployed frontend (Vercel, Netlify, GitHub Pages, or any custom domain) talking to Render backend:
    return 'https://jp-protfolio-1.onrender.com';
})();

function getApiUrl(endpoint) {
    var ep = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    return (JUET_BACKEND_URL || '') + ep;
}

function getApiBase() {
    return JUET_BACKEND_URL || '';
}

// Seamless Auto-Router: When JUET_BACKEND_URL is set (e.g. Render backend),
// any fetch('/api/...') or fetch('/signup') is automatically routed to the remote backend!
(function() {
    if (typeof window === 'undefined' || !window.fetch) return;
    var nativeFetch = window.fetch;
    window.fetch = function(input, init) {
        if (typeof input === 'string' && JUET_BACKEND_URL) {
            if (input.startsWith('/api') || input.startsWith('/signup')) {
                var target = JUET_BACKEND_URL.replace(/\/+$/, '') + input;
                return nativeFetch(target, init);
            }
        }
        return nativeFetch(input, init);
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JUET_BACKEND_URL, getApiUrl, getApiBase };
}
