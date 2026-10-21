const fs = require('fs');
const path = require('path');
const SETTINGS_PATH = path.join(__dirname, '..', 'data', 'admin_settings.json');

function requireJuetAuth(req, res, next) {
  const email = (req.body && req.body.userEmail) || 
                (req.body && req.body.email) || 
                req.headers['x-user-email'] || 
                req.query.email;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(401).json({
      success: false,
      error: "Authentication Required: Please sign in with your Google account."
    });
  }

  const normalized = email.trim().toLowerCase();

  // Check if institutional domain restriction is active in admin settings
  let restrictJuetOnly = false;
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const settings = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
      restrictJuetOnly = !!settings.restrictJuetDomainOnly;
    }
  } catch (e) {}

  if (restrictJuetOnly && !normalized.endsWith('@juetguna.in')) {
    return res.status(403).json({
      success: false,
      error: "Access Denied: Only institutional @juetguna.in email addresses are permitted by current lab policy."
    });
  }

  req.juetUserEmail = normalized;
  next();
}

module.exports = { requireJuetAuth };
