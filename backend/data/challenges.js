// Challenges mapped from the 5 SQL Practice Modules
const { SQL_MODULES } = require('./modulesData');

const CHALLENGES = [];

SQL_MODULES.forEach((module) => {
  module.questions.forEach((q) => {
    CHALLENGES.push({
      id: `m${module.module_id}_q${q.question_id}`,
      moduleId: module.module_id,
      questionId: q.question_id,
      moduleName: module.module_name,
      moduleShortName: module.short_name,
      category: module.short_name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      title: q.title,
      difficulty: q.difficulty || 'Medium',
      points: q.points || 15,
      description: q.question,
      initialCode: '',
      expectedQuery: q.query,
      expectedOutput: q.output
    });
  });
});

module.exports = {
  CHALLENGES,
  SQL_MODULES
};
