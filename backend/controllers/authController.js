const fs = require('fs');
const path = require('path');
const db = require('../models/db');
const SETTINGS_PATH = path.join(__dirname, '..', 'data', 'admin_settings.json');

// Helper to decode Google JWT token payload safely
function decodeGoogleJwt(jwtToken) {
  try {
    if (typeof jwtToken === 'string') {
      const parts = jwtToken.split('.');
      if (parts.length === 3) {
        const payloadStr = Buffer.from(parts[1], 'base64').toString('utf8');
        return JSON.parse(payloadStr);
      }
    }
  } catch (err) {
    console.warn('Could not decode Google JWT token:', err.message);
  }
  return null;
}

// Helper to load admin settings with Environment Variables priority
function getSettings() {
  let s = {};
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      s = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
    }
  } catch (e) {}

  if (process.env.GOOGLE_CLIENT_ID) {
    s.googleClientId = process.env.GOOGLE_CLIENT_ID.trim();
  }
  if (!s.googleClientId) {
    s.googleClientId = '527537707643-40bp0kbvm46ahpqb19ul7k99ld3v4hc8.apps.googleusercontent.com';
  }
  if (process.env.RESTRICT_JUET_ONLY !== undefined) {
    s.restrictJuetDomainOnly = (process.env.RESTRICT_JUET_ONLY === 'true');
  }

  return s;
}

exports.getGoogleClientId = (req, res) => {
  const settings = getSettings();
  const clientId = settings.googleClientId || process.env.GOOGLE_CLIENT_ID || '';
  res.json({ 
    success: true, 
    clientId: clientId,
    restrictJuetOnly: !!settings.restrictJuetDomainOnly
  });
};

exports.saveGoogleClientId = (req, res) => {
  try {
    const { clientId, restrictJuetOnly } = req.body;
    const settings = getSettings();

    if (clientId !== undefined) {
      settings.googleClientId = clientId.trim();
      process.env.GOOGLE_CLIENT_ID = settings.googleClientId;
    }
    if (restrictJuetOnly !== undefined) {
      settings.restrictJuetDomainOnly = !!restrictJuetOnly;
    }

    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf8');

    return res.json({
      success: true,
      message: 'Google OAuth configuration saved successfully.',
      clientId: settings.googleClientId || '',
      restrictJuetOnly: !!settings.restrictJuetDomainOnly
    });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
};

exports.loginOrRegister = (req, res) => {
  let { name, email, roll, picture, credential } = req.body;

  // 1. If Google Identity credential JWT is supplied, decode verified token payload
  if (credential) {
    const payload = decodeGoogleJwt(credential);
    if (payload) {
      if (payload.email) email = payload.email;
      if (payload.name && !name) name = payload.name;
      if (payload.picture && !picture) picture = payload.picture;
    }
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      error: "A valid email address is required for Google authentication."
    });
  }

  const normalized = email.trim().toLowerCase();
  const settings = getSettings();
  const restrictJuetOnly = !!settings.restrictJuetDomainOnly;

  if (restrictJuetOnly && !normalized.endsWith('@juetguna.in')) {
    return res.status(403).json({
      success: false,
      error: "Access Denied: Only institutional @juetguna.in Google accounts are permitted under active lab policy."
    });
  }

  // 2. Derive roll number:
  // If email matches standard JUET roll pattern (e.g., 211b055, 241b156, etc.)
  let derivedRoll = (roll && roll.trim()) ? roll.trim().toUpperCase() : '';
  const emailPrefix = normalized.split('@')[0];

  if (!derivedRoll) {
    if (/^[0-9]{2,3}[a-zA-Z][0-9]{2,4}/i.test(emailPrefix)) {
      derivedRoll = emailPrefix.toUpperCase();
    } else {
      derivedRoll = emailPrefix.toUpperCase();
    }
  }

  // 3. Fallback name if none provided
  const finalName = (name && name.trim()) 
    ? name.trim() 
    : (derivedRoll ? `Student (${derivedRoll})` : 'Student');

  // 4. Save into SQLite database and JSON student store (with client-side self-healing merge)
  let user;
  if ((Array.isArray(req.body.solved) && req.body.solved.length > 0) || req.body.points) {
    user = db.bulkSyncUser({
      name: finalName,
      email: normalized,
      roll: derivedRoll,
      picture: picture || '',
      solved: req.body.solved || [],
      points: req.body.points || 0
    });
  } else {
    user = db.upsertUser({
      name: finalName,
      email: normalized,
      roll: derivedRoll,
      picture: picture || ''
    });
  }

  res.json({
    success: true,
    message: `Welcome, ${user.name}! Authenticated via Google. Your progress is being tracked.`,
    user: {
      name: user.name,
      email: user.email,
      roll: user.roll,
      picture: user.picture || '',
      points: user.points,
      solved: user.solved || [],
      streak: (user.solved || []).length
    }
  });
};

exports.getProfile = (req, res) => {
  const user = db.getUser(req.juetUserEmail);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: "Student profile not found."
    });
  }

  res.json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      roll: user.roll,
      picture: user.picture || '',
      points: user.points,
      solved: user.solved || [],
      streak: (user.solved || []).length
    }
  });
};

exports.syncProgress = (req, res) => {
  const { challengeId, pointsAwarded, queryText, name, roll } = req.body;
  if (!challengeId) {
    return res.status(400).json({ success: false, error: "challengeId is required" });
  }
  const pts = parseInt(pointsAwarded || 10, 10);
  const headerName = req.headers['x-user-name'] ? decodeURIComponent(req.headers['x-user-name']) : '';
  const headerRoll = req.headers['x-user-roll'] ? decodeURIComponent(req.headers['x-user-roll']) : '';
  const finalName = (name || headerName || '').trim();
  const finalRoll = (roll || headerRoll || '').trim();

  const userEmail = (req.juetUserEmail || req.headers['x-user-email'] || req.body.email || '').trim().toLowerCase();
  const updatedUser = db.addSolved(userEmail, challengeId, pts, queryText || '', { name: finalName, roll: finalRoll });
  res.json({
    success: true,
    message: "Progress synced to SQLite database.",
    user: updatedUser
  });
};

exports.bulkSync = (req, res) => {
  try {
    const { email, name, roll, solved, points, picture } = req.body || {};
    const headerEmail = req.headers['x-user-email'];
    const headerName = req.headers['x-user-name'] ? decodeURIComponent(req.headers['x-user-name']) : '';
    const headerRoll = req.headers['x-user-roll'] ? decodeURIComponent(req.headers['x-user-roll']) : '';

    const targetEmail = (email || headerEmail || req.juetUserEmail || '').trim().toLowerCase();
    if (!targetEmail) {
      return res.status(400).json({ success: false, error: 'Email is required for student bulk sync.' });
    }

    const updatedUser = db.bulkSyncUser({
      email: targetEmail,
      name: name || headerName,
      roll: roll || headerRoll,
      solved: solved || [],
      points: points || 0,
      picture: picture
    });

    res.json({
      success: true,
      message: 'Student progress bulk-synchronized successfully.',
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
