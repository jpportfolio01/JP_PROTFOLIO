const fs = require('fs');
const path = require('path');
const { SEED_DATA } = require('../data/schemaData');

class VirtualLabDatabase {
  constructor() {
    this.tables = JSON.parse(JSON.stringify(SEED_DATA));
    
    // SQLite file path for persistent on-disk database storage
    this.dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    this.dbFilePath = path.join(this.dataDir, 'juet_virtual_lab.sqlite');
    this.userStorePath = path.join(this.dataDir, 'students_store.json');
    
    this.users = this.loadUsers();
    this.sqliteDb = null;
    this.initSqlite();
  }

  initSqlite() {
    try {
      const { DatabaseSync } = require('node:sqlite');
      if (DatabaseSync) {
        // Open persistent SQLite database file on disk
        this.sqliteDb = new DatabaseSync(this.dbFilePath);
        this.seedSqliteNode();
        this.syncFromSqlite();
        console.log(`✅ Persistent SQLite database initialized: ${this.dbFilePath}`);
        return;
      }
    } catch (e) {
      console.warn('⚠️ node:sqlite initialization note:', e.message);
    }

    console.log('ℹ️ Running on JavaScript Virtual Relational Engine with JSON persistence.');
  }

  seedSqliteNode() {
    // 1. Hospital Data Schema
    this.sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS province_names (province_id TEXT PRIMARY KEY, province_name TEXT);
      CREATE TABLE IF NOT EXISTS doctors (doctor_id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, specialty TEXT);
      CREATE TABLE IF NOT EXISTS patients (patient_id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, gender TEXT, birth_date TEXT, city TEXT, province_id TEXT, allergies TEXT, height INTEGER, weight INTEGER);
      CREATE TABLE IF NOT EXISTS admissions (patient_id INTEGER, admission_date TEXT, discharge_date TEXT, diagnosis TEXT, attending_doctor_id INTEGER);
      
      -- Student points and progress tables in database
      CREATE TABLE IF NOT EXISTS student_points (
        email TEXT PRIMARY KEY,
        name TEXT,
        roll_no TEXT,
        total_points INTEGER DEFAULT 0,
        solved_challenges TEXT,
        last_active TEXT
      );

      CREATE TABLE IF NOT EXISTS submission_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        challenge_id TEXT,
        points_awarded INTEGER,
        query_text TEXT,
        is_correct INTEGER,
        submitted_at TEXT
      );
    `);

    // Ensure student_points has picture column
    try {
      this.sqliteDb.exec('ALTER TABLE student_points ADD COLUMN picture TEXT;');
    } catch(e) {}

    // Check if hospital tables already seeded
    const rowCount = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM patients').get();
    if (rowCount && rowCount.count === 0) {
      for (let p of this.tables.province_names) {
        this.sqliteDb.prepare('INSERT OR IGNORE INTO province_names VALUES (?, ?)').run(p.province_id, p.province_name);
      }
      for (let d of this.tables.doctors) {
        this.sqliteDb.prepare('INSERT OR IGNORE INTO doctors VALUES (?, ?, ?, ?)').run(d.doctor_id, d.first_name, d.last_name, d.specialty);
      }
      for (let p of this.tables.patients) {
        this.sqliteDb.prepare('INSERT OR IGNORE INTO patients VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(p.patient_id, p.first_name, p.last_name, p.gender, p.birth_date, p.city, p.province_id, p.allergies, p.height, p.weight);
      }
      for (let a of this.tables.admissions) {
        this.sqliteDb.prepare('INSERT INTO admissions VALUES (?, ?, ?, ?, ?)').run(a.patient_id, a.admission_date, a.discharge_date, a.diagnosis, a.attending_doctor_id);
      }
    }
  }

  // Execute read-only SQL query against hospital database
  query(sqlString) {
    const cleaned = sqlString.trim().replace(/;+$/, '');
    
    // Safety check: Block destructive SQL
    if (/^\s*(DROP|DELETE|UPDATE|ALTER|INSERT|CREATE|TRUNCATE)\b/i.test(cleaned)) {
      throw new Error("Security Violation: Only read-only SELECT queries are allowed in JUET Virtual Lab.");
    }

    if (this.sqliteDb) {
      try {
        const stmt = this.sqliteDb.prepare(cleaned);
        if (stmt.all) {
          return stmt.all();
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }

    return this.fallbackQueryRunner(cleaned);
  }

  fallbackQueryRunner(sql) {
    const s = sql.replace(/\s+/g, ' ').trim();

    // 1. SELECT * FROM patients LIMIT 1
    if (/SELECT\s+\*\s+FROM\s+patients\s+LIMIT\s+1/i.test(s)) {
      return [this.tables.patients[0]];
    }

    // 2. Filter by province_id = 'ON'
    if (/FROM\s+patients\s+WHERE\s+province_id\s*=\s*'ON'/i.test(s)) {
      return this.tables.patients
        .filter(p => p.province_id === 'ON')
        .map(p => ({ first_name: p.first_name, last_name: p.last_name, city: p.city }));
    }

    // 3. DISTINCT city FROM patients
    if (/SELECT\s+DISTINCT\s+city\s+FROM\s+patients/i.test(s)) {
      const set = new Set();
      const res = [];
      for (let p of this.tables.patients) {
        if (!set.has(p.city)) {
          set.add(p.city);
          res.push({ city: p.city });
        }
      }
      return res;
    }

    // 4. Sort by height DESC
    if (/SELECT\s+first_name,\s*height\s+FROM\s+patients\s+ORDER\s+BY\s+height\s+DESC/i.test(s)) {
      return [...this.tables.patients]
        .sort((a, b) => b.height - a.height)
        .map(p => ({ first_name: p.first_name, height: p.height }));
    }

    // 5. Allergies = 'Penicillin'
    if (/WHERE\s+allergies\s*=\s*'Penicillin'/i.test(s)) {
      return this.tables.patients
        .filter(p => p.allergies === 'Penicillin')
        .map(p => ({ first_name: p.first_name, last_name: p.last_name, allergies: p.allergies }));
    }

    // 6. Total patients per province
    if (/COUNT\(\*\)\s+AS\s+total_patients\s+FROM\s+patients\s+GROUP\s+BY\s+province_id/i.test(s)) {
      const counts = {};
      for (let p of this.tables.patients) {
        counts[p.province_id] = (counts[p.province_id] || 0) + 1;
      }
      return Object.entries(counts).map(([pid, cnt]) => ({ province_id: pid, total_patients: cnt }));
    }

    // 7. Average weight by gender
    if (/AVG\(weight\).*FROM\s+patients\s+GROUP\s+BY\s+gender/i.test(s)) {
      const sums = {};
      const counts = {};
      for (let p of this.tables.patients) {
        sums[p.gender] = (sums[p.gender] || 0) + p.weight;
        counts[p.gender] = (counts[p.gender] || 0) + 1;
      }
      return Object.keys(sums).map(g => ({
        gender: g,
        avg_weight: parseFloat((sums[g] / counts[g]).toFixed(2))
      }));
    }

    // 8. MAX and MIN height
    if (/MAX\(height\).*MIN\(height\)/i.test(s)) {
      const heights = this.tables.patients.map(p => p.height);
      return [{ max_height: Math.max(...heights), min_height: Math.min(...heights) }];
    }

    // 9. Patients with Admissions and Doctor specialty
    if (/JOIN\s+admissions.*JOIN\s+doctors/i.test(s)) {
      const res = [];
      for (let a of this.tables.admissions) {
        const p = this.tables.patients.find(pt => pt.patient_id === a.patient_id);
        const d = this.tables.doctors.find(doc => doc.doctor_id === a.attending_doctor_id);
        if (p && d) {
          res.push({ first_name: p.first_name, last_name: p.last_name, specialty: d.specialty });
        }
      }
      return res;
    }

    // 10. Patients without admissions
    if (/NOT\s+IN\s*\(SELECT\s+patient_id\s+FROM\s+admissions\)/i.test(s)) {
      const admitted = new Set(this.tables.admissions.map(a => a.patient_id));
      return this.tables.patients
        .filter(p => !admitted.has(p.patient_id))
        .map(p => ({ first_name: p.first_name, last_name: p.last_name }));
    }

    // Generic fallback for SELECT * FROM <table>
    const matchTable = s.match(/FROM\s+([a-zA-Z_]+)/i);
    if (matchTable && this.tables[matchTable[1]]) {
      const tbl = this.tables[matchTable[1]];
      if (/LIMIT\s+(\d+)/i.test(s)) {
        const lim = parseInt(s.match(/LIMIT\s+(\d+)/i)[1], 10);
        return tbl.slice(0, lim);
      }
      return tbl;
    }

    throw new Error(`Unsupported or unrecognized SQL syntax: "${sql}"`);
  }

  // --- Student Points Storage in Database ---
  loadUsers() {
    try {
      if (fs.existsSync(this.userStorePath)) {
        return JSON.parse(fs.readFileSync(this.userStorePath, 'utf8'));
      }
    } catch (e) {
      // empty
    }
    return {};
  }

  saveUsers() {
    try {
      fs.writeFileSync(this.userStorePath, JSON.stringify(this.users, null, 2), 'utf8');
    } catch (e) {
      console.error("Could not write student store:", e);
    }
  }

  // Synchronize users between persistent SQLite student_points and students_store.json
  syncFromSqlite() {
    if (!this.sqliteDb) return;
    try {
      const rows = this.sqliteDb.prepare('SELECT * FROM student_points').all();
      let hasChanges = false;
      for (const row of rows) {
        const email = (row.email || '').trim().toLowerCase();
        if (!email) continue;
        const solved = JSON.parse(row.solved_challenges || '[]');
        const points = Number(row.total_points) || 0;
        let roll = (row.roll_no || '').trim();
        if (!roll && email) {
          const prefix = email.split('@')[0];
          if (/^[0-9]{2,3}[a-zA-Z][0-9]{3}/i.test(prefix)) {
            roll = prefix.toUpperCase();
          }
        }
        let name = (row.name || '').trim();
        if (!name || name === 'Student') {
          name = roll ? `Student (${roll})` : 'Student';
        }

        if (!this.users[email]) {
          this.users[email] = {
            name,
            email,
            roll,
            picture: row.picture || '',
            points,
            solved,
            createdAt: row.last_active || new Date().toISOString(),
            lastActive: row.last_active || new Date().toISOString()
          };
          hasChanges = true;
        } else {
          const cur = this.users[email];
          if (row.picture && !cur.picture) {
            cur.picture = row.picture;
            hasChanges = true;
          }
          if (name && name !== 'Student' && cur.name === 'Student') {
            cur.name = name;
            hasChanges = true;
          }
          if (roll && (!cur.roll || cur.roll === 'N/A')) {
            cur.roll = roll;
            hasChanges = true;
          }
          if (points > (cur.points || 0)) {
            cur.points = points;
            hasChanges = true;
          }
          if (Array.isArray(solved) && solved.length > (cur.solved ? cur.solved.length : 0)) {
            cur.solved = solved;
            hasChanges = true;
          }
          if (row.last_active) {
            cur.lastActive = row.last_active;
          }
        }
      }
      if (hasChanges) {
        this.saveUsers();
      }
    } catch (err) {
      console.error('Error syncing from SQLite to users store:', err);
    }
  }

  getAllUsers() {
    this.syncFromSqlite();
    return this.users;
  }

  upsertUser({ name, email, roll, picture }) {
    const now = new Date().toISOString();
    const normalized = (email || '').trim().toLowerCase();
    let userRoll = (roll || '').trim().toUpperCase();
    if (!userRoll && normalized && normalized.includes('@')) {
      const prefix = normalized.split('@')[0];
      userRoll = prefix.toUpperCase();
    }
    let userName = (name || '').trim();
    if (!userName || userName === 'Student') {
      userName = userRoll ? `Student (${userRoll})` : 'Student';
    }
    
    // Update in-memory / JSON store
    if (!this.users[normalized]) {
      this.users[normalized] = {
        name: userName,
        email: normalized,
        roll: userRoll,
        picture: picture || '',
        points: 0,
        solved: [],
        createdAt: now,
        lastActive: now
      };
    } else {
      this.users[normalized].lastActive = now;
      if (name && name !== 'Student') this.users[normalized].name = name.trim();
      if (userRoll) this.users[normalized].roll = userRoll;
      if (picture) this.users[normalized].picture = picture;
    }
    this.saveUsers();

    // Persist into SQLite database table
    if (this.sqliteDb) {
      try {
        const u = this.users[normalized];
        const existing = this.sqliteDb.prepare('SELECT * FROM student_points WHERE email = ?').get(normalized);
        if (!existing) {
          this.sqliteDb.prepare(`
            INSERT INTO student_points (email, name, roll_no, total_points, solved_challenges, last_active, picture)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `).run(normalized, u.name, u.roll, u.points || 0, JSON.stringify(u.solved || []), now, u.picture || '');
        } else {
          this.sqliteDb.prepare(`
            UPDATE student_points SET name = ?, roll_no = ?, last_active = ?, picture = COALESCE(?, picture) WHERE email = ?
          `).run(u.name, u.roll, now, u.picture || null, normalized);
        }
      } catch (err) {
        console.error("Database upsertUser error:", err);
      }
    }

    return this.users[normalized];
  }

  getUser(email) {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    if (this.sqliteDb) {
      try {
        const row = this.sqliteDb.prepare('SELECT * FROM student_points WHERE email = ?').get(normalized);
        if (row) {
          const inMemory = this.users[normalized] || {};
          return {
            name: row.name,
            email: row.email,
            roll: row.roll_no,
            picture: row.picture || inMemory.picture || '',
            points: Number(row.total_points) || 0,
            solved: JSON.parse(row.solved_challenges || '[]')
          };
        }
      } catch (e) {
        // Fallback to JSON
      }
    }
    return this.users[normalized] || null;
  }

  // Store awarded points and log submission in SQLite database
  addSolved(email, challengeId, pointsAwarded, queryText = '', extraInfo = {}) {
    const now = new Date().toISOString();
    const normalized = (email || '').trim().toLowerCase();
    let user = this.users[normalized];

    let inputRoll = (extraInfo.roll || '').trim().toUpperCase();
    if (!inputRoll && normalized && normalized.includes('@')) {
      inputRoll = normalized.split('@')[0].toUpperCase();
    }
    const inputName = (extraInfo.name || '').trim();

    if (!user) {
      user = this.upsertUser({ name: inputName, email: normalized, roll: inputRoll });
    } else {
      if (inputName && (user.name === 'Student' || user.name.startsWith('Student ('))) {
        user.name = inputName;
      }
      if (inputRoll && (!user.roll || user.roll === 'N/A')) {
        user.roll = inputRoll;
      }
    }

    if (!Array.isArray(user.solved)) {
      user.solved = [];
    }

    const pts = parseInt(pointsAwarded || 10, 10);
    if (!user.solved.includes(challengeId)) {
      user.solved.push(challengeId);
      user.points = (Number(user.points) || 0) + pts;
      user.lastActive = now;
      this.saveUsers();
    }

    // Persist to SQLite Database tables: student_points & submission_logs
    if (this.sqliteDb) {
      try {
        const solvedJson = JSON.stringify(user.solved);
        this.sqliteDb.prepare(`
          INSERT INTO student_points (email, name, roll_no, total_points, solved_challenges, last_active)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(email) DO UPDATE SET
            name = ?,
            roll_no = ?,
            total_points = ?,
            solved_challenges = ?,
            last_active = ?
        `).run(
          normalized, user.name, user.roll, user.points, solvedJson, now,
          user.name, user.roll, user.points, solvedJson, now
        );

        // Record submission log
        this.sqliteDb.prepare(`
          INSERT INTO submission_logs (email, challenge_id, points_awarded, query_text, is_correct, submitted_at)
          VALUES (?, ?, ?, ?, 1, ?)
        `).run(normalized, challengeId, pts, queryText, now);

        console.log(`💾 Stored points in SQLite database for ${normalized}: +${pts} pts (Total: ${user.points} pts)`);
      } catch (err) {
        console.error("Database addSolved error:", err);
      }
    }

    return user;
  }

  // Execute query for a specific SQL Practice Module on isolated in-memory schema
  executeModuleQuery(moduleId, sqlString) {
    const { SQL_MODULES } = require('../data/modulesData');
    const moduleData = SQL_MODULES.find(m => m.module_id === parseInt(moduleId, 10));
    if (!moduleData) {
      throw new Error(`Module ${moduleId} not found`);
    }

    const { DatabaseSync } = require('node:sqlite');
    const dbInstance = new DatabaseSync(':memory:');

    // Strip comments to reliably detect commands, table creations, and TRUNCATE
    const stripped = sqlString
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/--.*$/gm, '')
      .trim();

    const isCreateDept = /CREATE\s+TABLE\s+departments/i.test(stripped);
    const isCreateEmp = /CREATE\s+TABLE\s+employees/i.test(stripped);

    for (const tbl of moduleData.schema.tables) {
      if (isCreateDept && tbl.table_name === 'departments') continue;
      if (isCreateEmp && tbl.table_name === 'employees') continue;

      const colDefs = tbl.columns.map(c => {
        let t = c.type.toUpperCase();
        if (t.includes('VARCHAR')) t = 'TEXT';
        if (t.includes('DECIMAL')) t = 'REAL';
        if (c.key === 'PRIMARY KEY') t += ' PRIMARY KEY';
        return `${c.name} ${t}`;
      }).join(', ');

      dbInstance.exec(`CREATE TABLE ${tbl.table_name} (${colDefs});`);

      if (/DROP\s+COLUMN\s+performance_rating/i.test(stripped) && tbl.table_name === 'employees') {
        dbInstance.exec('ALTER TABLE employees ADD performance_rating INTEGER;');
      }

      for (const row of tbl.sample_data) {
        const cols = Object.keys(row);
        const placeholders = cols.map(() => '?').join(', ');
        const values = cols.map(c => row[c]);
        dbInstance.prepare(`INSERT INTO ${tbl.table_name} (${cols.join(', ')}) VALUES (${placeholders})`).run(...values);
      }
    }

    let cleaned = stripped.replace(/;+$/, '').trim();
    const isDMLorDDL = /^\s*(CREATE|ALTER|DROP|TRUNCATE|INSERT|UPDATE|DELETE)\b/i.test(cleaned);

    if (isDMLorDDL) {
      if (/^\s*TRUNCATE\s+TABLE\s+(\w+)/i.test(cleaned)) {
        const tblName = cleaned.match(/TRUNCATE\s+TABLE\s+(\w+)/i)[1];
        dbInstance.exec(`DELETE FROM ${tblName}`);
      } else {
        dbInstance.exec(cleaned);
      }
      const isInsert = /^\s*INSERT\b/i.test(cleaned);
      return {
        isDML: true,
        message: isInsert ? "1 row affected." : "Command(s) completed successfully.",
        rows: []
      };
    }

    let execSql = cleaned;
    execSql = execSql.replace(/>\s*ANY\s*\((.+)\)\s*$/i, (_, inner) => `> (SELECT MIN(salary) FROM (${inner}) AS _sub)`);
    execSql = execSql.replace(/>\s*ALL\s*\((.+)\)\s*$/i, (_, inner) => `> (SELECT MAX(salary) FROM (${inner}) AS _sub)`);
    execSql = execSql.replace(/<\s*ALL\s*\((.+)\)\s*$/i, (_, inner) => `< (SELECT MIN(salary) FROM (${inner}) AS _sub)`);

    const rows = dbInstance.prepare(execSql).all();
    return {
      isDML: false,
      rows: rows
    };
  }
}

const db = new VirtualLabDatabase();
module.exports = db;
