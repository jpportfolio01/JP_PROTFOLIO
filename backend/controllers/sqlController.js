const db = require('../models/db');
const { CHALLENGES, SQL_MODULES } = require('../data/challenges');

// Deep compare two SQL result sets with detailed diagnostic diffing
function compareResultSets(actual, expected, query = '') {
  // 1. If expected is a status string (DDL/DML commands)
  if (typeof expected === 'string') {
    if (typeof actual === 'string') {
      const match = actual.trim().toLowerCase() === expected.trim().toLowerCase();
      return {
        isCorrect: match,
        message: match ? 'Command executed successfully.' : `Expected output message "${expected}", but received "${actual}".`
      };
    }
    // If user executed DML/DDL that returned an object with message
    if (actual && actual.message) {
      const match = actual.message.trim().toLowerCase() === expected.trim().toLowerCase();
      return {
        isCorrect: match,
        message: match ? 'Command executed successfully.' : `Expected "${expected}", received "${actual.message}".`
      };
    }
    // DDL safeguard: empty array returned from DDL execution
    if (Array.isArray(actual) && actual.length === 0 && expected.toLowerCase().includes('completed successfully')) {
      return {
        isCorrect: true,
        message: 'Command executed successfully.'
      };
    }
    return {
      isCorrect: false,
      message: `Expected command status message "${expected}", but received tabular rows.`
    };
  }

  // 2. Both must be arrays for tabular results
  const actualRows = Array.isArray(actual) ? actual : (actual && Array.isArray(actual.rows) ? actual.rows : []);
  const expectedRows = Array.isArray(expected) ? expected : [];

  if (actualRows.length !== expectedRows.length) {
    return {
      isCorrect: false,
      message: `Row count mismatch: Your query returned ${actualRows.length} row(s), but expected ${expectedRows.length} row(s).`
    };
  }

  if (actualRows.length === 0 && expectedRows.length === 0) {
    return { isCorrect: true, message: 'Correct! Both returned 0 rows as expected.' };
  }

  // Column comparison (case-insensitive)
  const actualCols = Object.keys(actualRows[0]).map(c => c.toLowerCase()).sort();
  const expectedCols = Object.keys(expectedRows[0]).map(c => c.toLowerCase()).sort();

  if (actualCols.length !== expectedCols.length) {
    return {
      isCorrect: false,
      message: `Column count mismatch: Expected columns [${expectedCols.join(', ')}], but got [${actualCols.join(', ')}].`
    };
  }

  // Determine if query explicitly requires ordering
  const hasOrderBy = query && /\bORDER\s+BY\b/i.test(query);

  // Helper to compare two individual rows
  function rowsEqual(aRow, eRow) {
    for (let c of expectedCols) {
      const aKey = Object.keys(aRow).find(k => k.toLowerCase() === c);
      const eKey = Object.keys(eRow).find(k => k.toLowerCase() === c);
      if (!aKey || !eKey) return false;
      const aVal = aRow[aKey];
      const eVal = eRow[eKey];
      if ((aVal === null || aVal === undefined) && (eVal === null || eVal === undefined)) continue;
      if (aVal === null || aVal === undefined || eVal === null || eVal === undefined) return false;
      const aNum = Number(aVal);
      const eNum = Number(eVal);
      if (!isNaN(aNum) && !isNaN(eNum)) {
        if (Math.abs(aNum - eNum) > 0.05) return false;
      } else {
        if (String(aVal).trim().toLowerCase() !== String(eVal).trim().toLowerCase()) return false;
      }
    }
    return true;
  }

  function rowHash(row) {
    return Object.keys(row).sort().map(k => {
      let val = row[k];
      if (val === null || val === undefined) return k.toLowerCase() + ':null';
      const num = Number(val);
      if (!isNaN(num) && typeof val !== 'boolean' && String(val).trim() !== '') {
        val = Math.round(num * 100) / 100;
      }
      return k.toLowerCase() + ':' + String(val).trim().toLowerCase();
    }).join('|');
  }

  // 1. Verify multiset equivalence (both contain the exact same rows)
  const aSorted = [...actualRows].sort((a,b) => rowHash(a).localeCompare(rowHash(b)));
  const eSorted = [...expectedRows].sort((a,b) => rowHash(a).localeCompare(rowHash(b)));

  for (let i = 0; i < aSorted.length; i++) {
    if (!rowsEqual(aSorted[i], eSorted[i])) {
      for (let c of expectedCols) {
        const aKey = Object.keys(aSorted[i]).find(k => k.toLowerCase() === c);
        const eKey = Object.keys(eSorted[i]).find(k => k.toLowerCase() === c);
        const aVal = aSorted[i][aKey];
        const eVal = eSorted[i][eKey];
        if (String(aVal).trim().toLowerCase() !== String(eVal).trim().toLowerCase()) {
          return {
            isCorrect: false,
            message: `Value mismatch in results for column "${c}": Expected "${eVal}", but got "${aVal}".`
          };
        }
      }
      return { isCorrect: false, message: `Result rows do not match expected rows.` };
    }
  }

  // 2. If query specifies ORDER BY, check that order is respected
  if (hasOrderBy) {
    let sequentialMatch = true;
    for (let i = 0; i < actualRows.length; i++) {
      if (!rowsEqual(actualRows[i], expectedRows[i])) {
        sequentialMatch = false;
        break;
      }
    }

    if (!sequentialMatch) {
      const orderMatch = query.match(/ORDER\s+BY\s+([a-zA-Z0-9_]+)(?:\s+(ASC|DESC))?/i);
      if (orderMatch) {
        const sortCol = orderMatch[1].toLowerCase();
        const isDesc = orderMatch[2] ? orderMatch[2].toUpperCase() === 'DESC' : false;
        let orderValid = true;

        for (let i = 1; i < actualRows.length; i++) {
          const prevKey = Object.keys(actualRows[i - 1]).find(k => k.toLowerCase() === sortCol);
          const currKey = Object.keys(actualRows[i]).find(k => k.toLowerCase() === sortCol);
          if (prevKey && currKey) {
            const prevVal = Number(actualRows[i - 1][prevKey]) ?? actualRows[i - 1][prevKey];
            const currVal = Number(actualRows[i][currKey]) ?? actualRows[i][currKey];
            if (isDesc ? (currVal > prevVal) : (currVal < prevVal)) {
              orderValid = false;
              break;
            }
          }
        }

        if (!orderValid) {
          return {
            isCorrect: false,
            message: `Result ordering mismatch: Rows are not correctly sorted by "${sortCol}" ${isDesc ? 'DESC' : 'ASC'}.`
          };
        }
      }
    }
  }

  return { isCorrect: true, message: `Perfect match! All ${actualRows.length} rows and columns match expected output.` };
}

// POST /api/sql/evaluate
exports.evaluateQuery = (req, res) => {
  const { challengeId, moduleId, questionId, query, userName, userRoll } = req.body;
  const userEmail = req.juetUserEmail || req.headers['x-user-email'] || req.body.userEmail;
  const headerName = req.headers['x-user-name'] ? decodeURIComponent(req.headers['x-user-name']) : '';
  const headerRoll = req.headers['x-user-roll'] ? decodeURIComponent(req.headers['x-user-roll']) : '';
  const finalName = (userName || headerName || '').trim();
  const finalRoll = (userRoll || headerRoll || '').trim();

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Query string is required."
    });
  }

  // Find target challenge
  let challenge = null;
  if (challengeId) {
    challenge = CHALLENGES.find(c => c.id === challengeId);
  }
  if (!challenge && moduleId && questionId) {
    challenge = CHALLENGES.find(c => c.moduleId === parseInt(moduleId, 10) && c.questionId === parseInt(questionId, 10));
  }
  if (!challenge && CHALLENGES.length > 0) {
    challenge = CHALLENGES[0];
  }

  if (!challenge) {
    return res.status(404).json({
      success: false,
      error: "Requested challenge not found."
    });
  }

  const startTime = process.hrtime();
  let executionResult;

  try {
    executionResult = db.executeModuleQuery(challenge.moduleId, query);
  } catch (err) {
    return res.status(200).json({
      success: false,
      correct: false,
      error: err.message,
      message: `SQL Syntax / Runtime Error: ${err.message}`,
      expectedOutput: challenge.expectedOutput
    });
  }

  const diff = process.hrtime(startTime);
  const executionTimeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);

  const userOutput = executionResult.isDML ? executionResult.message : executionResult.rows;
  const comparison = compareResultSets(userOutput, challenge.expectedOutput, query);

  let pointsAwarded = 0;
  let updatedUser = null;

  if (comparison.isCorrect && userEmail) {
    const currentUser = db.getUser(userEmail);
    const wasAlreadySolved = currentUser && currentUser.solved && currentUser.solved.includes(challenge.id);

    if (!wasAlreadySolved) {
      pointsAwarded = challenge.points;
      updatedUser = db.addSolved(userEmail, challenge.id, pointsAwarded, query, { name: finalName, roll: finalRoll });
    } else {
      updatedUser = currentUser;
      if ((finalName || finalRoll) && (currentUser.name === 'Student' || !currentUser.roll)) {
        db.upsertUser({
          name: finalName || currentUser.name,
          email: userEmail,
          roll: finalRoll || currentUser.roll
        });
        updatedUser = db.getUser(userEmail);
      }
    }
  }

  const userRows = Array.isArray(userOutput) ? userOutput : [];
  const expectedRows = Array.isArray(challenge.expectedOutput) ? challenge.expectedOutput : [];

  return res.json({
    success: true,
    correct: comparison.isCorrect,
    pointsAwarded: pointsAwarded,
    totalPoints: updatedUser ? updatedUser.points : 0,
    solvedCount: updatedUser && updatedUser.solved ? updatedUser.solved.length : 0,
    executionTimeMs: executionTimeMs,
    rowCount: userRows.length,
    expectedRowCount: expectedRows.length,
    userOutput: userOutput,
    expectedOutput: challenge.expectedOutput,
    columns: userRows.length > 0 ? Object.keys(userRows[0]) : [],
    expectedColumns: expectedRows.length > 0 ? Object.keys(expectedRows[0]) : [],
    message: comparison.isCorrect
      ? `🎉 Success! Correct Query. ${comparison.message}`
      : `❌ Output mismatch: ${comparison.message}`
  });
};

// GET /api/sql/modules
exports.getModules = (req, res) => {
  res.json({
    success: true,
    modules: SQL_MODULES
  });
};

// GET /api/sql/challenges
exports.getChallenges = (req, res) => {
  res.json({
    success: true,
    challenges: CHALLENGES
  });
};

// POST /api/sql/playground
exports.runPlayground = (req, res) => {
  const { query, moduleId = 1 } = req.body;
  if (!query) {
    return res.status(400).json({ success: false, error: "Query string is required." });
  }

  const startTime = process.hrtime();
  try {
    const result = db.executeModuleQuery(moduleId, query);
    const diff = process.hrtime(startTime);
    const executionTimeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);

    const rows = result.isDML ? [] : result.rows;
    return res.json({
      success: true,
      isDML: result.isDML,
      message: result.message,
      executionTimeMs,
      rowCount: rows.length,
      columns: rows.length > 0 ? Object.keys(rows[0]) : [],
      rows: rows
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// GET /api/sql/schema
exports.getSchema = (req, res) => {
  res.json({
    success: true,
    modules: SQL_MODULES.map(m => ({
      module_id: m.module_id,
      module_name: m.module_name,
      tables: m.schema.tables
    }))
  });
};
