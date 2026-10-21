const express = require('express');
const router = express.Router();

const { requireJuetAuth } = require('../middleware/juetAuth');
const sqlController = require('../controllers/sqlController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

// Authentication & Student Profile (stores and fetches student points)
router.get('/auth/google-client-id', authController.getGoogleClientId);
router.post('/auth/google-client-id', authController.saveGoogleClientId);
router.post('/auth/login', authController.loginOrRegister);
router.post('/auth/google-login', authController.loginOrRegister);
router.get('/auth/profile', requireJuetAuth, authController.getProfile);
router.get('/student/points', requireJuetAuth, authController.getProfile);
router.post('/student/sync-progress', requireJuetAuth, authController.syncProgress);

// SQL Challenges & Execution
router.get('/sql/modules', sqlController.getModules);
router.get('/sql/challenges', sqlController.getChallenges);
router.post('/sql/evaluate', requireJuetAuth, sqlController.evaluateQuery);
router.post('/sql/playground', sqlController.runPlayground);
router.get('/sql/schema', sqlController.getSchema);

// Admin Portal APIs (Dr. Jitendra Parmar Administration Suite)
router.post('/admin/login', adminController.login);
router.get('/admin/settings', adminController.getSettings);
router.post('/admin/settings', adminController.updateSettings);
router.post('/admin/change-password', adminController.changePassword);
router.get('/admin/students', adminController.getStudentProgress);
router.post('/admin/students/clear', adminController.clearStudentProgress);
router.delete('/admin/students', adminController.clearStudentProgress);
router.get('/admin/modules', adminController.getModules);
router.post('/admin/questions', adminController.addQuestion);
router.put('/admin/questions/:moduleId/:questionId', adminController.updateQuestion);
router.delete('/admin/questions/:moduleId/:questionId', adminController.deleteQuestion);
router.post('/admin/modules', adminController.addModule);
router.delete('/admin/modules/:moduleId', adminController.deleteModule);

// Publications Admin APIs
router.get('/admin/publications', adminController.getPublications);
router.post('/admin/publications', adminController.addPublication);
router.put('/admin/publications/:id', adminController.updatePublication);
router.delete('/admin/publications/:id', adminController.deletePublication);

// Team & Research Scholars Admin APIs
router.get('/admin/team', adminController.getTeam);
router.post('/admin/scholars', adminController.addScholar);
router.delete('/admin/scholars/:id', adminController.deleteScholar);
router.post('/admin/members', adminController.addTeamMember);
router.delete('/admin/members/:id', adminController.deleteTeamMember);
router.post('/admin/upload-image', adminController.uploadImage);


// Projects & Virtual Lab Projects Admin APIs
router.get('/admin/projects', adminController.getProjects);
router.post('/admin/projects', adminController.addProject);
router.put('/admin/projects/:id', adminController.updateProject);
router.delete('/admin/projects/:id', adminController.deleteProject);
router.get('/admin/vlab-projects', adminController.getVlabProjects);
router.post('/admin/vlab-projects', adminController.addVlabProject);
router.put('/admin/vlab-projects/:id', adminController.updateVlabProject);
router.delete('/admin/vlab-projects/:id', adminController.deleteVlabProject);


// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'JUET Virtual Lab Backend',
    faculty: 'Dr. Jitendra Parmar',
    institution: 'Jaypee University of Engineering and Technology (JUET), Guna',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
