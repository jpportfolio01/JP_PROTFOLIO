const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const db = require('../models/db');

const DATA_DIR = path.join(__dirname, '..', 'data');
const MODULES_DATA_PATH = path.join(DATA_DIR, 'modulesData.js');
const STUDENTS_STORE_PATH = path.join(DATA_DIR, 'students_store.json');
const PUBLICATIONS_PATH = path.join(DATA_DIR, 'publications.json');
const TEAM_PATH = path.join(DATA_DIR, 'team.json');
const PROJECTS_PATH = path.join(DATA_DIR, 'projects.json');
const VLAB_PROJECTS_PATH = path.join(DATA_DIR, 'vlab_projects.json');
const SETTINGS_PATH = path.join(DATA_DIR, 'admin_settings.json');
const GENERATE_SCRIPT_PATH = path.join(__dirname, '..', 'generate-html.js');

// Helper: load admin settings (password, trigger click count)
function loadAdminSettings() {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const s = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
      if (process.env.ADMIN_USERNAME && !s.username) s.username = process.env.ADMIN_USERNAME;
      if (process.env.ADMIN_PASSWORD && !s.password) s.password = process.env.ADMIN_PASSWORD;
      return s;
    }
  } catch (e) {
    console.error('Error reading admin settings:', e);
  }
  const defaults = {
    username: process.env.ADMIN_USERNAME || 'adminparmar',
    password: process.env.ADMIN_PASSWORD || 'JITENDRAPARMAR',
    triggerClickCount: 8
  };
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(defaults, null, 2), 'utf8');
  } catch (e) {}
  return defaults;
}

function saveAdminSettings(settings) {
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing admin settings:', e);
  }
}

// Helper: load fresh modules data
function loadModulesData() {
  delete require.cache[require.resolve(MODULES_DATA_PATH)];
  return require(MODULES_DATA_PATH).SQL_MODULES;
}

// Helper: save modules data & regenerate practice HTML
function saveModulesAndRegenerate(modules) {
  const content = `// SQL Practice Modules with Schemas, Sample Data, and Questions\n// Faculty: Dr. Jitendra Parmar (JUET Guna)\n\nvar SQL_MODULES = ${JSON.stringify(modules, null, 2)};\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { SQL_MODULES };\n}\n`;
  fs.writeFileSync(MODULES_DATA_PATH, content, 'utf8');

  // Sync to frontend/modulesData.js, website/modulesData.js, and my-react-app/public/modulesData.js
  const targetDirs = [
    path.join(__dirname, '..', '..', 'frontend'),
    path.join(__dirname, '..', '..', 'website'),
    path.join(__dirname, '..', '..', 'my-react-app', 'public')
  ];

  targetDirs.forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        fs.writeFileSync(path.join(dir, 'modulesData.js'), content, 'utf8');
      }
    } catch (e) {}
  });

  // Regenerate html and sync
  try {
    execSync(`node "${GENERATE_SCRIPT_PATH}"`, { stdio: 'pipe' });
  } catch (err) {
    console.error('Error during automatic HTML generation:', err.message);
  }
}

// Helper: load students store
function loadStudents() {
  try {
    if (fs.existsSync(STUDENTS_STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STUDENTS_STORE_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading students store:', e);
  }
  return {};
}

// Helper: load & save publications
function loadPublications() {
  try {
    if (fs.existsSync(PUBLICATIONS_PATH)) {
      return JSON.parse(fs.readFileSync(PUBLICATIONS_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading publications:', e);
  }
  return [];
}

function savePublications(pubs) {
  fs.writeFileSync(PUBLICATIONS_PATH, JSON.stringify(pubs, null, 2), 'utf8');

  // Also rewrite frontend/publications.js, website/publications.js and my-react-app/public/publications.js
  const targetDirs = [
    path.join(__dirname, '..', '..', 'frontend'),
    path.join(__dirname, '..', '..', 'website'),
    path.join(__dirname, '..', '..', 'my-react-app', 'public')
  ];

  targetDirs.forEach(dir => {
    try {
      const pubPath = path.join(dir, 'publications.js');
      if (fs.existsSync(pubPath)) {
        const curContent = fs.readFileSync(pubPath, 'utf8');
        const updated = curContent.replace(/(?:let|var|const)\s+PUBLICATIONS\s*=\s*\[[\s\S]*?\];/, `var PUBLICATIONS = ${JSON.stringify(pubs, null, 4)};`);
        fs.writeFileSync(pubPath, updated, 'utf8');
      }
    } catch (err) {
      console.error(`Error syncing publications.js to ${dir}:`, err.message);
    }
  });
}

// Helper: load & save team data
function loadTeam() {
  try {
    if (fs.existsSync(TEAM_PATH)) {
      return JSON.parse(fs.readFileSync(TEAM_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading team:', e);
  }
  return { scholars: [], members: [] };
}

function saveTeam(team) {
  fs.writeFileSync(TEAM_PATH, JSON.stringify(team, null, 2), 'utf8');
}

// Helper: load & save research projects
function loadProjects() {
  try {
    if (fs.existsSync(PROJECTS_PATH)) {
      return JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading projects:', e);
  }
  return [];
}

function saveProjects(projects) {
  fs.writeFileSync(PROJECTS_PATH, JSON.stringify(projects, null, 2), 'utf8');
  const jsContent = `var RESEARCH_PROJECTS = ${JSON.stringify(projects, null, 2)};\nif (typeof module !== 'undefined' && module.exports) { module.exports = { RESEARCH_PROJECTS }; }\n`;

  const targetDirs = [
    path.join(__dirname, '..', '..', 'frontend'),
    path.join(__dirname, '..', '..', 'website'),
    path.join(__dirname, '..', '..', 'my-react-app', 'public')
  ];

  targetDirs.forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        fs.writeFileSync(path.join(dir, 'projectsData.js'), jsContent, 'utf8');
      }
    } catch (e) {
      console.error(`Error syncing projectsData.js to ${dir}:`, e.message);
    }
  });
}

// Helper: load & save virtual lab projects
function loadVlabProjects() {
  try {
    if (fs.existsSync(VLAB_PROJECTS_PATH)) {
      return JSON.parse(fs.readFileSync(VLAB_PROJECTS_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading vlab projects:', e);
  }
  return [];
}

function saveVlabProjects(vlabs) {
  fs.writeFileSync(VLAB_PROJECTS_PATH, JSON.stringify(vlabs, null, 2), 'utf8');
  const jsContent = `var VLAB_PROJECTS = ${JSON.stringify(vlabs, null, 2)};\nif (typeof module !== 'undefined' && module.exports) { module.exports = { VLAB_PROJECTS }; }\n`;
  try {
    fs.writeFileSync(path.join(__dirname, '..', '..', 'website', 'vlabData.js'), jsContent, 'utf8');
    const reactPath = path.join(__dirname, '..', '..', 'my-react-app', 'public', 'vlabData.js');
    if (fs.existsSync(path.dirname(reactPath))) {
      fs.writeFileSync(reactPath, jsContent, 'utf8');
    }
  } catch (e) {
    console.error('Error syncing vlabData.js:', e.message);
  }
}

// 1. Admin Login
exports.login = (req, res) => {
  const { username, password } = req.body;
  const settings = loadAdminSettings();
  if (username === settings.username && password === settings.password) {
    return res.json({
      success: true,
      token: 'juet_admin_session_token_' + Date.now(),
      username: settings.username,
      triggerClickCount: settings.triggerClickCount || 8,
      message: 'Admin authentication verified for Dr. Jitendra Parmar Portal.'
    });
  }
  return res.status(401).json({
    success: false,
    error: 'Invalid admin username or password.',
    message: 'Invalid admin username or password.'
  });
};

// Admin Settings: Get trigger click count and public info
exports.getSettings = (req, res) => {
  try {
    const settings = loadAdminSettings();
    res.json({
      success: true,
      username: settings.username,
      triggerClickCount: settings.triggerClickCount || 8,
      googleClientId: settings.googleClientId || '',
      settings: {
        username: settings.username,
        triggerClickCount: settings.triggerClickCount || 8,
        googleClientId: settings.googleClientId || ''
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, message: err.message });
  }
};

// Admin Settings: Update settings
exports.updateSettings = (req, res) => {
  try {
    const { triggerClickCount, googleClientId } = req.body;
    const settings = loadAdminSettings();

    if (triggerClickCount !== undefined) {
      const count = parseInt(triggerClickCount, 10);
      if (isNaN(count) || count < 1 || count > 100) {
        return res.status(400).json({
          success: false,
          error: 'Trigger click count must be a number between 1 and 100.',
          message: 'Trigger click count must be a number between 1 and 100.'
        });
      }
      settings.triggerClickCount = count;
    }

    if (googleClientId !== undefined) {
      settings.googleClientId = googleClientId.trim();
    }

    saveAdminSettings(settings);

    res.json({
      success: true,
      triggerClickCount: settings.triggerClickCount,
      googleClientId: settings.googleClientId || '',
      settings: {
        username: settings.username,
        triggerClickCount: settings.triggerClickCount,
        googleClientId: settings.googleClientId || ''
      },
      message: 'Admin settings updated successfully.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, message: err.message });
  }
};

// Admin Settings: Change Password
exports.changePassword = (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password and new password are required.',
        message: 'Current password and new password are required.'
      });
    }
    if (newPassword.trim().length < 4) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 4 characters.',
        message: 'New password must be at least 4 characters.'
      });
    }

    const settings = loadAdminSettings();
    if (currentPassword !== settings.password) {
      return res.status(401).json({
        success: false,
        error: 'Current password does not match. Please verify your current administrative password.',
        message: 'Current password does not match. Please verify your current administrative password.'
      });
    }

    settings.password = newPassword.trim();
    saveAdminSettings(settings);

    res.json({
      success: true,
      message: 'Admin password changed successfully. Please use your new password on subsequent logins.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, message: err.message });
  }
};

// 2. Student Progress
exports.getStudentProgress = (req, res) => {
  try {
    const rawStudents = db.getAllUsers();
    const modules = loadModulesData();

    const studentsList = Object.values(rawStudents).map(st => {
      const solvedList = Array.isArray(st.solved) ? st.solved : [];
      const moduleProgress = {};

      modules.forEach(m => {
        const totalInMod = m.questions ? m.questions.length : 0;
        // Count solved questions for this module
        const solvedInMod = m.questions.filter(q => {
          const key1 = `m${m.module_id}_q${q.question_id}`;
          const key2 = `q${q.question_id}`;
          return solvedList.includes(key1) || (m.module_id === 1 && solvedList.includes(key2));
        }).length;

        moduleProgress[m.module_id] = {
          moduleId: m.module_id,
          moduleName: m.short_name || m.module_name,
          solved: solvedInMod,
          total: totalInMod,
          percentage: totalInMod > 0 ? Math.round((solvedInMod / totalInMod) * 100) : 0
        };
      });

      const totalQuestionsCount = modules.reduce((acc, m) => acc + (m.questions ? m.questions.length : 0), 0);
      const totalSolvedCount = solvedList.length;

      let displayRoll = (st.roll || '').trim();
      if (!displayRoll && st.email && st.email.includes('@')) {
        displayRoll = st.email.split('@')[0].toUpperCase();
      }

      let displayName = (st.name || '').trim();
      if (st.email === 'student@juetguna.in' && (!displayName || displayName === 'Student')) {
        displayName = 'JUET Demo Student';
      } else if ((!displayName || displayName === 'Student') && displayRoll && displayRoll !== 'N/A') {
        displayName = `Student (${displayRoll})`;
      } else if (!displayName) {
        displayName = 'Student';
      }

      return {
        name: displayName,
        email: st.email || '',
        roll: displayRoll || 'N/A',
        picture: st.picture || '',
        points: Number(st.points) || 0,
        solvedKeys: solvedList,
        totalSolved: totalSolvedCount,
        totalQuestions: totalQuestionsCount,
        overallPercentage: totalQuestionsCount > 0 ? Math.round((totalSolvedCount / totalQuestionsCount) * 100) : 0,
        createdAt: st.createdAt,
        lastActive: st.lastActive,
        moduleProgress
      };
    });

    // Sort by total points / solved descending
    studentsList.sort((a, b) => b.points - a.points);

    res.json({
      success: true,
      students: studentsList,
      totalStudents: studentsList.length,
      modules: modules.map(m => ({
        moduleId: m.module_id,
        moduleName: m.module_name,
        shortName: m.short_name,
        questionsCount: m.questions ? m.questions.length : 0
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.clearStudentProgress = (req, res) => {
  try {
    db.clearAllTelemetry();
    res.json({
      success: true,
      message: 'All student telemetry records have been cleared successfully.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Get Modules & Questions
exports.getModules = (req, res) => {
  try {
    const modules = loadModulesData();
    res.json({ success: true, modules });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Add Question
exports.addQuestion = (req, res) => {
  try {
    const { moduleId, questionData } = req.body;
    if (!moduleId || !questionData) {
      return res.status(400).json({ success: false, error: 'moduleId and questionData are required' });
    }

    const modules = loadModulesData();
    const mod = modules.find(m => m.module_id === parseInt(moduleId, 10));
    if (!mod) {
      return res.status(404).json({ success: false, error: `Module ${moduleId} not found` });
    }

    if (!questionData.title || !questionData.question || !questionData.query) {
      return res.status(400).json({ success: false, error: 'Question must have title, question, and query' });
    }

    const maxId = mod.questions.reduce((max, q) => Math.max(max, q.question_id || 0), 0);
    const newQuestion = {
      question_id: questionData.question_id || (maxId + 1),
      title: questionData.title.trim(),
      difficulty: questionData.difficulty || 'Medium',
      points: parseInt(questionData.points || 10, 10),
      question: questionData.question.trim(),
      initialCode: questionData.initialCode || questionData.starter_query || `-- Write your query for ${questionData.title}\n`,
      query: questionData.query.trim(),
      output: questionData.output !== undefined ? questionData.output : (questionData.expected_output || 'Command(s) completed successfully.')
    };

    mod.questions.push(newQuestion);
    saveModulesAndRegenerate(modules);

    res.json({
      success: true,
      message: `Question '${newQuestion.title}' successfully added to Module ${mod.module_id}!`,
      question: newQuestion
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 5. Update Question
exports.updateQuestion = (req, res) => {
  try {
    const moduleId = parseInt(req.params.moduleId, 10);
    const questionId = parseInt(req.params.questionId, 10);
    const { questionData } = req.body;

    const modules = loadModulesData();
    const mod = modules.find(m => m.module_id === moduleId);
    if (!mod) return res.status(404).json({ success: false, error: `Module ${moduleId} not found` });

    const qIdx = mod.questions.findIndex(q => q.question_id === questionId);
    if (qIdx === -1) return res.status(404).json({ success: false, error: `Question ${questionId} not found in Module ${moduleId}` });

    mod.questions[qIdx] = {
      ...mod.questions[qIdx],
      ...questionData,
      question_id: questionId // maintain ID
    };

    saveModulesAndRegenerate(modules);
    res.json({ success: true, message: `Question ${questionId} updated successfully.`, question: mod.questions[qIdx] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 6. Delete Question
exports.deleteQuestion = (req, res) => {
  try {
    const moduleId = parseInt(req.params.moduleId, 10);
    const questionId = parseInt(req.params.questionId, 10);

    const modules = loadModulesData();
    const mod = modules.find(m => m.module_id === moduleId);
    if (!mod) return res.status(404).json({ success: false, error: `Module ${moduleId} not found` });

    const initialLen = mod.questions.length;
    mod.questions = mod.questions.filter(q => q.question_id !== questionId);
    if (mod.questions.length === initialLen) {
      return res.status(404).json({ success: false, error: `Question ${questionId} not found` });
    }

    saveModulesAndRegenerate(modules);
    res.json({ success: true, message: `Question ${questionId} deleted successfully from Module ${moduleId}.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 7. Add Module
exports.addModule = (req, res) => {
  try {
    const { moduleData } = req.body;
    if (!moduleData || !moduleData.module_name) {
      return res.status(400).json({ success: false, error: 'moduleData with module_name is required' });
    }

    const modules = loadModulesData();
    const maxModId = modules.reduce((max, m) => Math.max(max, m.module_id || 0), 0);
    const newModuleId = moduleData.module_id || (maxModId + 1);

    const newModule = {
      module_id: newModuleId,
      module_name: moduleData.module_name.trim(),
      short_name: moduleData.short_name || moduleData.module_name.slice(0, 20),
      description: moduleData.description || `Hands-on SQL practice for ${moduleData.module_name}`,
      schema: moduleData.schema || { tables: [] },
      questions: Array.isArray(moduleData.questions) ? moduleData.questions : []
    };

    modules.push(newModule);
    saveModulesAndRegenerate(modules);

    res.json({
      success: true,
      message: `Module '${newModule.module_name}' created successfully with ID ${newModule.module_id}!`,
      module: newModule
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 8. Delete Module
exports.deleteModule = (req, res) => {
  try {
    const moduleId = parseInt(req.params.moduleId, 10);
    const modules = loadModulesData();
    const initialLen = modules.length;
    const filtered = modules.filter(m => m.module_id !== moduleId);
    if (filtered.length === initialLen) {
      return res.status(404).json({ success: false, error: `Module ${moduleId} not found` });
    }

    saveModulesAndRegenerate(filtered);
    res.json({ success: true, message: `Module ${moduleId} and its questions deleted successfully.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 9. Publications API
exports.getPublications = (req, res) => {
  try {
    const pubs = loadPublications();
    res.json({ success: true, publications: pubs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.addPublication = (req, res) => {
  try {
    const { publication } = req.body;
    if (!publication || !publication.title || !publication.authors) {
      return res.status(400).json({ success: false, error: 'Publication title and authors are required' });
    }

    const pubs = loadPublications();
    const newPub = {
      id: publication.id || 'pub_' + Date.now(),
      type: publication.type || 'journal',
      title: publication.title.trim(),
      authors: publication.authors.trim(),
      venue: publication.venue ? publication.venue.trim() : '',
      details: publication.details ? publication.details.trim() : '',
      impact: publication.impact ? publication.impact.trim() : 'Peer-Reviewed',
      ranking: publication.ranking ? publication.ranking.trim() : null,
      link: publication.link || 'https://scholar.google.com/citations?user=toHDoiwAAAAJ&hl=en&authuser=1'
    };

    pubs.unshift(newPub); // add to top
    savePublications(pubs);

    res.json({ success: true, message: 'Publication added successfully!', publication: newPub });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updatePublication = (req, res) => {
  try {
    const id = req.params.id;
    const pub = req.body.publication || req.body;

    if (!pub || !pub.title || !pub.authors) {
      return res.status(400).json({ success: false, error: 'Publication title and authors are required' });
    }

    let pubs = loadPublications();
    const idx = pubs.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: `Publication with ID ${id} not found` });
    }

    pubs[idx] = {
      id: id,
      type: pub.type || pubs[idx].type || 'journal',
      title: pub.title.trim(),
      authors: pub.authors.trim(),
      venue: pub.venue ? pub.venue.trim() : (pubs[idx].venue || ''),
      details: pub.details ? pub.details.trim() : (pubs[idx].details || ''),
      impact: pub.impact ? pub.impact.trim() : (pubs[idx].impact || 'Peer-Reviewed'),
      ranking: pub.ranking !== undefined ? (pub.ranking ? pub.ranking.trim() : null) : pubs[idx].ranking,
      link: pub.link ? pub.link.trim() : (pubs[idx].link || 'https://scholar.google.com/citations?user=toHDoiwAAAAJ&hl=en&authuser=1')
    };

    savePublications(pubs);
    res.json({ success: true, message: 'Publication updated successfully!', publication: pubs[idx] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deletePublication = (req, res) => {
  try {
    const id = req.params.id;
    let pubs = loadPublications();
    const initialLen = pubs.length;
    pubs = pubs.filter(p => p.id !== id);
    if (pubs.length === initialLen) {
      return res.status(404).json({ success: false, error: `Publication with ID ${id} not found` });
    }

    savePublications(pubs);
    res.json({ success: true, message: 'Publication deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 10. Research Scholars & Team API
exports.getTeam = (req, res) => {
  try {
    const team = loadTeam();
    res.json({ success: true, scholars: team.scholars || [], members: team.members || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.addScholar = (req, res) => {
  try {
    const { scholar } = req.body;
    if (!scholar || !scholar.name) {
      return res.status(400).json({ success: false, error: 'Scholar name is required' });
    }

    const team = loadTeam();
    const newScholar = {
      id: scholar.id || 'sch_' + Date.now(),
      name: scholar.name.trim(),
      role: scholar.role || 'Ph.D. Research Scholar',
      dept: scholar.dept || 'Department of CSE, JUET Guna',
      photo: scholar.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(scholar.name)}&background=6366f1&color=fff&size=150`,
      focus: scholar.focus || 'Machine Learning & AI Research',
      desc: scholar.desc || 'Doctoral research candidate under Dr. Jitendra Parmar.',
      background: scholar.background || 'M.Tech CSE • B.Tech CSE',
      tags: Array.isArray(scholar.tags) ? scholar.tags : (scholar.tags ? scholar.tags.split(',').map(t => t.trim()) : ['ML', 'AI']),
      joined: scholar.joined || `Joined: ${new Date().getFullYear()} • Institute Fellow`,
      scholarUrl: scholar.scholarUrl || 'https://scholar.google.com',
      linkedinUrl: scholar.linkedinUrl || 'https://linkedin.com',
      email: scholar.email || 'scholar@juetguna.in'
    };

    team.scholars.push(newScholar);
    saveTeam(team);

    res.json({ success: true, message: 'Research Scholar added successfully!', scholar: newScholar });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteScholar = (req, res) => {
  try {
    const id = req.params.id;
    const team = loadTeam();
    const initialLen = team.scholars.length;
    team.scholars = team.scholars.filter(s => s.id !== id);
    if (team.scholars.length === initialLen) {
      return res.status(404).json({ success: false, error: `Scholar ${id} not found` });
    }

    saveTeam(team);
    res.json({ success: true, message: 'Research Scholar deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.addTeamMember = (req, res) => {
  try {
    const { member } = req.body;
    if (!member || !member.name) {
      return res.status(400).json({ success: false, error: 'Team member name is required' });
    }

    const team = loadTeam();
    const newMember = {
      id: member.id || 'mem_' + Date.now(),
      name: member.name.trim(),
      role: member.role || 'Student Researcher & Developer',
      dept: member.dept || 'B.Tech CSE • JUET Guna',
      photo: member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3b82f6&color=fff&size=120`,
      areaTitle: member.areaTitle || 'Intelligent Algorithms & Software Systems',
      areaSummary: member.areaSummary || 'Developing machine learning models and intelligent tools under Dr. Jitendra Parmar.',
      techStack: member.techStack || 'Python & Machine Learning',
      githubUrl: member.githubUrl || 'https://github.com',
      linkedinUrl: member.linkedinUrl || 'https://linkedin.com',
      email: member.email || 'student@juetguna.in'
    };

    team.members.push(newMember);
    saveTeam(team);

    res.json({ success: true, message: 'Team member added successfully!', member: newMember });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteTeamMember = (req, res) => {
  try {
    const id = req.params.id;
    const team = loadTeam();
    const initialLen = team.members.length;
    team.members = team.members.filter(m => m.id !== id);
    if (team.members.length === initialLen) {
      return res.status(404).json({ success: false, error: `Team member ${id} not found` });
    }

    saveTeam(team);
    res.json({ success: true, message: 'Team member deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 11. Research Projects CRUD
exports.getProjects = (req, res) => {
  try {
    const projects = loadProjects();
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.addProject = (req, res) => {
  try {
    const { project } = req.body;
    if (!project || !project.title) {
      return res.status(400).json({ success: false, error: 'Project title is required' });
    }

    const projects = loadProjects();
    const newProj = {
      id: project.id || 'proj-' + (projects.length + 1) + '-' + Date.now().toString().slice(-4),
      title: project.title.trim(),
      category: project.category || 'ml',
      categoryName: project.categoryName || (project.category === 'se' ? 'Software Engineering' : (project.category === 'nlp' ? 'NLP & Text Mining' : (project.category === 'edge' ? 'Edge & IoT Security' : 'Machine Learning & AI'))),
      badge: project.badge ? project.badge.trim() : 'Active Project',
      badgeType: project.badgeType || 'published',
      iconClass: project.iconClass || 'icon-blue',
      icon: project.icon || 'fa-laptop-code',
      desc: project.desc ? project.desc.trim() : '',
      areaTags: Array.isArray(project.areaTags) ? project.areaTags : (project.areaTags ? project.areaTags.split(',').map(t => t.trim()) : []),
      techTags: Array.isArray(project.techTags) ? project.techTags : (project.techTags ? project.techTags.split(',').map(t => t.trim()) : []),
      footerLabel: project.footerLabel ? project.footerLabel.trim() : 'Research Initiative',
      link: project.link ? project.link.trim() : 'index.html#contact',
      linkText: project.linkText ? project.linkText.trim() : 'Explore Specs →'
    };

    projects.push(newProj);
    saveProjects(projects);
    res.json({ success: true, message: 'Project created successfully!', project: newProj });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateProject = (req, res) => {
  try {
    const id = req.params.id;
    const { project } = req.body;
    const projects = loadProjects();
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: `Project ${id} not found` });
    }

    projects[idx] = {
      ...projects[idx],
      ...project,
      id // preserve ID
    };

    saveProjects(projects);
    res.json({ success: true, message: 'Project updated successfully!', project: projects[idx] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteProject = (req, res) => {
  try {
    const id = req.params.id;
    const projects = loadProjects();
    const initialLen = projects.length;
    const filtered = projects.filter(p => p.id !== id);
    if (filtered.length === initialLen) {
      return res.status(404).json({ success: false, error: `Project ${id} not found` });
    }

    saveProjects(filtered);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 12. Virtual Lab Projects CRUD
exports.getVlabProjects = (req, res) => {
  try {
    const vlabs = loadVlabProjects();
    res.json({ success: true, vlabProjects: vlabs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.addVlabProject = (req, res) => {
  try {
    const { vlabProject } = req.body;
    if (!vlabProject || !vlabProject.title) {
      return res.status(400).json({ success: false, error: 'Virtual lab project title is required' });
    }

    const vlabs = loadVlabProjects();
    const newVlab = {
      id: vlabProject.id || 'vlab-' + (vlabs.length + 1) + '-' + Date.now().toString().slice(-4),
      title: vlabProject.title.trim(),
      status: vlabProject.status || 'ongoing',
      statusLabel: vlabProject.status === 'completed' ? 'Completed Project' : 'Ongoing Project',
      subHeader: vlabProject.subHeader ? vlabProject.subHeader.trim() : (vlabProject.status === 'completed' ? 'Interactive Module' : 'In Active Development'),
      codeSnippet: vlabProject.codeSnippet ? vlabProject.codeSnippet.trim() : '',
      desc: vlabProject.desc ? vlabProject.desc.trim() : '',
      curriculumTags: Array.isArray(vlabProject.curriculumTags) ? vlabProject.curriculumTags : (vlabProject.curriculumTags ? vlabProject.curriculumTags.split(',').map(t => t.trim()) : []),
      techTags: Array.isArray(vlabProject.techTags) ? vlabProject.techTags : (vlabProject.techTags ? vlabProject.techTags.split(',').map(t => t.trim()) : []),
      launchUrl: vlabProject.launchUrl ? vlabProject.launchUrl.trim() : 'sql-practice.html',
      launchText: vlabProject.launchText ? vlabProject.launchText.trim() : 'Launch Virtual Lab →',
      isFeatured: !!vlabProject.isFeatured
    };

    vlabs.push(newVlab);
    saveVlabProjects(vlabs);
    res.json({ success: true, message: 'Virtual Lab Project created successfully!', vlabProject: newVlab });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateVlabProject = (req, res) => {
  try {
    const id = req.params.id;
    const { vlabProject } = req.body;
    const vlabs = loadVlabProjects();
    const idx = vlabs.findIndex(v => v.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: `Virtual Lab Project ${id} not found` });
    }

    vlabs[idx] = {
      ...vlabs[idx],
      ...vlabProject,
      id // preserve ID
    };

    saveVlabProjects(vlabs);
    res.json({ success: true, message: 'Virtual Lab Project updated successfully!', vlabProject: vlabs[idx] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteVlabProject = (req, res) => {
  try {
    const id = req.params.id;
    const vlabs = loadVlabProjects();
    const initialLen = vlabs.length;
    const filtered = vlabs.filter(v => v.id !== id);
    if (filtered.length === initialLen) {
      return res.status(404).json({ success: false, error: `Virtual Lab Project ${id} not found` });
    }

    saveVlabProjects(filtered);
    res.json({ success: true, message: 'Virtual Lab Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 13. Image Upload (saves image to website/images/team/ and my-react-app/public/images/team/)
exports.uploadImage = (req, res) => {
  try {
    const { image, filename, folder = 'team' } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, error: 'No image data provided' });
    }

    // Match data:[<mediatype>];base64,<data>
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      if (typeof image === 'string' && (image.startsWith('images/') || image.startsWith('http'))) {
        return res.json({ success: true, url: image });
      }
      return res.status(400).json({ success: false, error: 'Invalid Base64 image format' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = 'jpg';
    if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('svg')) ext = 'svg';
    else if (mimeType.includes('webp')) ext = 'webp';
    else if (mimeType.includes('jpeg')) ext = 'jpg';

    const safeBaseName = (filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_') : 'member_' + Date.now());
    const finalFilename = safeBaseName.endsWith('.' + ext) ? safeBaseName : `${safeBaseName}_${Date.now()}.${ext}`;

    const frontendDir = path.join(__dirname, '..', '..', 'frontend', 'images', folder);
    const websiteDir = path.join(__dirname, '..', '..', 'website', 'images', folder);
    const reactDir = path.join(__dirname, '..', '..', 'my-react-app', 'public', 'images', folder);

    [frontendDir, websiteDir, reactDir].forEach(dir => {
      try {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, finalFilename), buffer);
      } catch(e) {}
    });

    const relativeUrl = `images/${folder}/${finalFilename}`;
    res.json({
      success: true,
      message: 'Image uploaded successfully!',
      url: relativeUrl
    });
  } catch (err) {
    console.error('Image upload error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

