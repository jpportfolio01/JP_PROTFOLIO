import React, { useState, useEffect } from 'react';
import { CHALLENGES } from '../../data/challenges';
import { HOSPITAL_DB } from '../../data/hospitalDb';

export default function SqlPractice({ onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [sqlCode, setSqlCode] = useState('');
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [evalMessage, setEvalMessage] = useState('');
  const [execTime, setExecTime] = useState(0);

  // User Auth & Progress
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('juet_sql_user') || 'null');
  });
  const [solved, setSolved] = useState(() => {
    return JSON.parse(localStorage.getItem('juet_sql_solved') || '[]');
  });
  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem('juet_sql_points') || '0', 10);
  });

  // Modals
  const [showLogin, setShowLogin] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [showInlineChooser, setShowInlineChooser] = useState(false);
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineError, setInlineError] = useState('');

  // Show login popup automatically on first load if student is not signed in
  useEffect(() => {
    if (!user) {
      setShowLogin(true);
    }
  }, [user]);

  // Load saved user on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('juet_sql_user');
      if (saved) {
        setUser(JSON.parse(saved));
        setShowLogin(false);
      }
    } catch(e) {}
  }, []);

  // Synchronize student solved challenges and points when signed in
  useEffect(() => {
    if (user && user.email) {
      const apiBase = window.location.protocol.startsWith('http') && !window.location.port.includes('3000') 
        ? window.location.origin 
        : 'http://localhost:5001';
      fetch(`${apiBase}/api/auth/profile`, {
        headers: { 'x-user-email': user.email }
      })
      .then(r => r.json())
      .then(data => {
        if (data.user) {
          if (Array.isArray(data.user.solved) && data.user.solved.length > 0) {
            setSolved(prev => {
              const merged = Array.from(new Set([...prev, ...data.user.solved]));
              localStorage.setItem('juet_sql_solved', JSON.stringify(merged));
              localStorage.setItem(`juet_sql_solved_${user.email}`, JSON.stringify(merged));
              return merged;
            });
          }
          if (data.user.points !== undefined && data.user.points !== null) {
            setPoints(prev => {
              const maxPts = Math.max(prev, Number(data.user.points) || 0);
              localStorage.setItem('juet_sql_points', maxPts.toString());
              localStorage.setItem(`juet_sql_points_${user.email}`, maxPts.toString());
              return maxPts;
            });
          }
        }
      })
      .catch(() => {});
    }
  }, [user]);

  // Expand states
  const [expandedTables, setExpandedTables] = useState({ patients: true, doctors: false, admissions: false, province_names: false });

  const currentChallenge = CHALLENGES[currentIdx];

  // Initialize AlaSQL if available in window
  useEffect(() => {
    if (window.alasql) {
      try {
        window.alasql('CREATE TABLE IF NOT EXISTS province_names');
        window.alasql.tables.province_names.data = JSON.parse(JSON.stringify(HOSPITAL_DB.province_names));

        window.alasql('CREATE TABLE IF NOT EXISTS doctors');
        window.alasql.tables.doctors.data = JSON.parse(JSON.stringify(HOSPITAL_DB.doctors));

        window.alasql('CREATE TABLE IF NOT EXISTS patients');
        window.alasql.tables.patients.data = JSON.parse(JSON.stringify(HOSPITAL_DB.patients));

        window.alasql('CREATE TABLE IF NOT EXISTS admissions');
        window.alasql.tables.admissions.data = JSON.parse(JSON.stringify(HOSPITAL_DB.admissions));
      } catch (err) {
        console.error('Database setup:', err);
      }
    }
  }, []);

  const handleSelectChallenge = (index) => {
    setCurrentIdx(index);
    setSqlCode('');
    setResult(null);
    setIsCorrect(null);
    setEvalMessage('');
  };

  const handleResetCode = () => {
    setSqlCode('');
  };

  const handleRunQuery = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!window.alasql) {
      alert("In-memory SQL engine is loading, please check alasql script.");
      return;
    }

    const trimmed = sqlCode.trim();
    if (!trimmed) {
      setIsCorrect(false);
      setEvalMessage("Please enter an SQL query to execute.");
      setResult(null);
      return;
    }

    // Attempt Node.js backend evaluation first (port 5001)
    try {
      const apiBase = window.location.protocol.startsWith('http') && !window.location.port.includes('3000') 
        ? window.location.origin 
        : 'http://localhost:5001';
      const resp = await fetch(`${apiBase}/api/sql/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': user.email,
          'x-user-name': encodeURIComponent(user.name),
          'x-user-roll': encodeURIComponent(user.roll || '')
        },
        body: JSON.stringify({
          challengeId: currentChallenge.id,
          query: trimmed,
          userEmail: user.email,
          userName: user.name,
          userRoll: user.roll || ''
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        setIsCorrect(data.correct);
        setResult(data.rows || []);
        setExecTime(data.executionTimeMs || '1.0');
        setEvalMessage(data.message);

        if (data.correct && !solved.includes(currentChallenge.id)) {
          const nextSolved = [...solved, currentChallenge.id];
          const nextPoints = points + currentChallenge.points;
          setSolved(nextSolved);
          setPoints(nextPoints);
          localStorage.setItem('juet_sql_solved', JSON.stringify(nextSolved));
          localStorage.setItem('juet_sql_points', nextPoints.toString());
        }
        return;
      }
    } catch (networkErr) {
      // Backend not running, proceed to in-memory client engine
    }

    if (!window.alasql) {
      alert("In-memory SQL engine is loading, please check alasql script.");
      return;
    }

    const t0 = performance.now();
    let userOutput = null;
    let expectedOutput = null;

    try {
      userOutput = window.alasql(trimmed);
    } catch (err) {
      setIsCorrect(false);
      setEvalMessage(`SQL Syntax Error: ${err.message || err}`);
      setResult(null);
      return;
    }

    const t1 = performance.now();
    setExecTime((t1 - t0).toFixed(1));

    try {
      expectedOutput = window.alasql(currentChallenge.expectedQuery);
    } catch (err) {
      console.error(err);
    }

    // Compare
    const correct = compareOutputs(userOutput, expectedOutput);
    setIsCorrect(correct);
    setResult(userOutput);

    if (correct) {
      const alreadySolved = solved.includes(currentChallenge.id);
      if (!alreadySolved) {
        const nextSolved = [...solved, currentChallenge.id];
        const nextPoints = points + currentChallenge.points;
        setSolved(nextSolved);
        setPoints(nextPoints);
        localStorage.setItem('juet_sql_solved', JSON.stringify(nextSolved));
        localStorage.setItem('juet_sql_points', nextPoints.toString());
        setEvalMessage(`Success! Correct Answer. Query returned ${userOutput.length} rows. +${currentChallenge.points} Points Awarded!`);

        try {
          const apiBase = window.location.protocol.startsWith('http') && !window.location.port.includes('3000') 
            ? window.location.origin 
            : 'http://localhost:5001';
          fetch(`${apiBase}/api/student/sync-progress`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-user-email': user.email,
              'x-user-name': encodeURIComponent(user.name),
              'x-user-roll': encodeURIComponent(user.roll || '')
            },
            body: JSON.stringify({
              challengeId: currentChallenge.id,
              pointsAwarded: currentChallenge.points,
              queryText: trimmed,
              name: user.name,
              roll: user.roll || ''
            })
          }).catch(() => {});
        } catch (e) {}
      } else {
        setEvalMessage(`Success! Correct Answer. Query returned ${userOutput.length} rows.`);
      }
    } else {
      setEvalMessage(`Output does not match expected result. Returned ${userOutput ? userOutput.length : 0} rows, expected ${expectedOutput ? expectedOutput.length : 0} rows. Please review your columns and filters.`);
    }
  };

  const compareOutputs = (actual, expected) => {
    if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
    if (actual.length !== expected.length) return false;
    if (actual.length === 0 && expected.length === 0) return true;

    const actualCols = Object.keys(actual[0]).map(c => c.toLowerCase()).sort();
    const expectedCols = Object.keys(expected[0]).map(c => c.toLowerCase()).sort();

    if (actualCols.length !== expectedCols.length) return false;

    for (let i = 0; i < actual.length; i++) {
      const aRow = actual[i];
      const eRow = expected[i];
      for (let col of actualCols) {
        const aVal = aRow[col] !== undefined ? aRow[col] : aRow[col.toUpperCase()];
        const eVal = eRow[col] !== undefined ? eRow[col] : eRow[col.toUpperCase()];
        if (aVal != eVal) return false;
      }
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    let email = (loginForm.email || '').trim().toLowerCase();
    if (!email) {
      setEmailError('Please enter your JUET Gmail ID.');
      return;
    }
    if (!email.includes('@')) {
      email = email + '@juetguna.in';
    }
    if (!email.endsWith('@juetguna.in')) {
      setEmailError('Institutional email must end with @juetguna.in');
      return;
    }
    setEmailError('');
    // Extract enrollment number from the portion before @juetguna.in
    const extractedRoll = email.split('@')[0].toUpperCase();
    const newUser = {
      name: (loginForm.name || '').trim(),
      email: email,
      roll: extractedRoll
    };
    setUser(newUser);
    localStorage.setItem('juet_sql_user', JSON.stringify(newUser));
    setShowLogin(false);

    try {
      const apiBase = window.location.protocol.startsWith('http') && !window.location.port.includes('3000') 
        ? window.location.origin 
        : 'http://localhost:5001';
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUser.name, email: newUser.email, roll: extractedRoll })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          if (Array.isArray(data.user.solved) && data.user.solved.length > 0) {
            const merged = Array.from(new Set([...solved, ...data.user.solved]));
            setSolved(merged);
            localStorage.setItem('juet_sql_solved', JSON.stringify(merged));
            localStorage.setItem(`juet_sql_solved_${newUser.email}`, JSON.stringify(merged));
          }
          if (data.user.points !== undefined && data.user.points !== null) {
            const maxPts = Math.max(points, Number(data.user.points) || 0);
            setPoints(maxPts);
            localStorage.setItem('juet_sql_points', maxPts.toString());
            localStorage.setItem(`juet_sql_points_${newUser.email}`, maxPts.toString());
          }
        }
      }
    } catch (e) {}
  };

  const handleLogout = () => {
    const label = user ? `${user.name} (${user.roll || user.email})` : 'Student';
    if (window.confirm(`Are you sure you want to log out from ${label}?`)) {
      setUser(null);
      localStorage.removeItem('juet_sql_user');
      setSolved([]);
      setPoints(0);
      localStorage.removeItem('juet_sql_solved');
      localStorage.removeItem('juet_sql_points');
      setShowLogin(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f8fafc', color: '#1e293b' }}>
      
      {/* Top Navbar */}
      <header style={{
        height: '56px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569'
          }} title="Return to Dr. Jitendra Parmar Lab">
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '1.1rem'
          }}>
            <i className="fas fa-database"></i>
          </div>

          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>SQL Practice - SQL Practice Online</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#64748b' }}>
              <span>JUET Virtual Lab</span>
              <span style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid #ffedd5', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
                <i className="fas fa-fire"></i> {solved.length}
              </span>
              <span style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
                <i className="fas fa-trophy"></i> {points} pts
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#ecfdf5',
            color: '#059669',
            border: '1px solid #a7f3d0',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <span style={{ width: '7px', height: '7px', background: '#10b981', borderRadius: '50%' }}></span>
            <span>32 practicing</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.86rem', color: '#475569', fontWeight: 500 }}>
            <span style={{ cursor: 'pointer' }} onClick={onBack}>Home</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setShowDiagram(true)}>Diagram</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f1f5f9',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              border: '1px solid #e2e8f0'
            }}>
              <i className="fas fa-user-graduate" style={{ color: '#2563eb' }}></i>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
                <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>{user.name}</span>
                <span style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: 600 }}>Enroll: {user.roll || (user.email ? user.email.split('@')[0].toUpperCase() : '')}</span>
              </div>
              <span style={{ color: '#cbd5e1', margin: '0 2px' }}>|</span>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} style={{
              border: '1px solid #2563eb',
              color: '#2563eb',
              background: 'transparent',
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <i className="fab fa-google"></i> Sign in (@juetguna.in)
            </button>
          )}

          <button style={{
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '6px 16px',
            borderRadius: '6px',
            fontSize: '0.84rem',
            fontWeight: 600
          }}><i className="fas fa-code"></i> Practice</button>

          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#334155',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.84rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <i className="fas fa-file-code" style={{ color: '#2563eb' }}></i>
            <span>hospital.sql</span>
            <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem', color: '#94a3b8' }}></i>
          </div>
        </div>
      </header>

      {/* 3-Column Main Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Column: Challenges */}
        <aside style={{ width: '290px', background: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '12px 14px 6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer' }} onClick={() => handleSelectChallenge(0)}>
              <i className="fas fa-star" style={{ color: '#eab308' }}></i>
              <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>Question of the Day</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer' }} onClick={() => setSqlCode("SELECT * FROM patients LIMIT 5;")}>
              <span style={{ color: '#6366f1', fontFamily: 'monospace', fontWeight: 700 }}>&gt;_</span>
              <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>SQL Playground</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', margin: '6px 0' }}>
            <span>⚡ 124K+ runs</span>
            <span>👥 4.2K+ devs</span>
            <span>🟢 32 live</span>
          </div>

          <div style={{ padding: '10px 14px', fontSize: '0.76rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
            BASICS & FILTERING
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px 12px', gap: '4px' }}>
            {CHALLENGES.filter(c => c.category === 'basics').map((c) => {
              const globalIdx = CHALLENGES.findIndex(item => item.id === c.id);
              const isActive = globalIdx === currentIdx;
              const isDone = solved.includes(c.id);
              return (
                <div key={c.id} onClick={() => handleSelectChallenge(globalIdx)} style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: isActive ? '1px solid #bfdbfe' : '1px solid transparent',
                  background: isActive ? '#eff6ff' : 'transparent',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 600, color: isActive ? '#1d4ed8' : '#1e293b' }}>
                      {isDone && <i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '6px' }}></i>}
                      {c.title}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: '#dcfce7', color: '#15803d' }}>
                      {c.difficulty}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px' }}>{c.description}</div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: '10px 14px', fontSize: '0.76rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
            AGGREGATIONS & SUMMARY
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px 12px', gap: '4px' }}>
            {CHALLENGES.filter(c => c.category === 'aggregations').map((c) => {
              const globalIdx = CHALLENGES.findIndex(item => item.id === c.id);
              const isActive = globalIdx === currentIdx;
              const isDone = solved.includes(c.id);
              return (
                <div key={c.id} onClick={() => handleSelectChallenge(globalIdx)} style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: isActive ? '1px solid #bfdbfe' : '1px solid transparent',
                  background: isActive ? '#eff6ff' : 'transparent',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 600, color: isActive ? '#1d4ed8' : '#1e293b' }}>
                      {isDone && <i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '6px' }}></i>}
                      {c.title}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: '#fef3c7', color: '#b45309' }}>
                      {c.difficulty}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px' }}>{c.description}</div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Middle Column: Editor & Result */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            FREE ONLINE SQL EDITOR &bull; REAL INTERVIEW QUESTIONS &bull; JUET VIRTUAL LAB
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>{currentChallenge.title}</h1>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d' }}>
                {currentChallenge.difficulty}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#eff6ff', color: '#2563eb' }}>
                +{currentChallenge.points} pts
              </span>
            </div>
          </div>

          <div style={{ fontSize: '0.95rem', color: '#334155', background: '#ffffff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            {currentChallenge.description}
          </div>

          {/* Editor Card */}
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ height: '38px', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>
              <span>&lt;/&gt; EDITOR</span>
              <button onClick={handleResetCode} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer' }}>
                <i className="fas fa-undo-alt"></i> Reset Code
              </button>
            </div>
            
            <div style={{ display: 'flex', minHeight: '130px', background: '#ffffff' }}>
              <div style={{ width: '42px', padding: '12px 8px', background: '#fafafa', borderRight: '1px solid #f1f5f9', fontFamily: 'monospace', fontSize: '0.88rem', color: '#94a3b8', textAlign: 'right', userSelect: 'none' }}>
                {sqlCode.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              <textarea
                value={sqlCode}
                onChange={(e) => setSqlCode(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.keyCode === 13)) {
                    e.preventDefault();
                    handleRunQuery();
                  }
                }}
                style={{ flex: 1, padding: '12px 14px', border: 'none', outline: 'none', resize: 'vertical', minHeight: '130px', fontFamily: 'monospace', fontSize: '0.92rem', color: '#0f172a' }}
                placeholder="-- Write your SQL here"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.76rem', color: '#64748b' }}>Shortcut: Press <strong>Ctrl + Enter</strong> or <strong>Cmd + Enter</strong> to run</span>
              <button onClick={handleRunQuery} style={{
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '9px 20px',
                fontSize: '0.92rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <i className="fas fa-play"></i> Run Query
              </button>
            </div>
          </div>

          {/* Results Box */}
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', minHeight: '220px' }}>
            <div style={{ height: '38px', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>
              <span>&gt;_ QUERY RESULT</span>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                <i className="fas fa-copy" title="Copy Output" style={{ cursor: 'pointer' }}></i>
              </div>
            </div>

            <div style={{ padding: '16px' }}>
              {isCorrect !== null && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  marginBottom: '14px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  background: isCorrect ? '#ecfdf5' : '#fef2f2',
                  color: isCorrect ? '#065f46' : '#991b1b',
                  border: isCorrect ? '1px solid #a7f3d0' : '1px solid #fecaca'
                }}>
                  {isCorrect ? <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> : <i className="fas fa-times-circle" style={{ marginRight: '6px' }}></i>}
                  {evalMessage}
                </div>
              )}

              {result && result.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.82rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '8px 12px' }}>#</th>
                        {Object.keys(result[0]).map(col => <th key={col} style={{ padding: '8px 12px' }}>{col}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {result.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{i + 1}</td>
                          {Object.keys(result[0]).map(col => (
                            <td key={col} style={{ padding: '8px 12px' }}>{row[col] !== null ? row[col] : 'NULL'}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', gap: '10px', padding: '40px 0' }}>
                  <i className="fas fa-table" style={{ fontSize: '2.2rem', color: '#cbd5e1' }}></i>
                  <span>Run your query to see results</span>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Column: Schema */}
        <aside style={{ width: '270px', background: '#ffffff', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>
            <span>DATABASE SCHEMA</span>
            <span onClick={() => setShowDiagram(true)} style={{ color: '#2563eb', cursor: 'pointer' }}>
              <i className="fas fa-project-diagram"></i> View Diagram
            </span>
          </div>

          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* patients */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div onClick={() => setExpandedTables(prev => ({ ...prev, patients: !prev.patients }))} style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                <span><i className="fas fa-table" style={{ color: '#6366f1', marginRight: '6px' }}></i> patients</span>
                <i className="fas fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
              </div>
              {expandedTables.patients && (
                <div style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.76rem', color: '#475569' }}>
                  <div>patient_id (PK, INT)</div>
                  <div>first_name (TEXT)</div>
                  <div>last_name (TEXT)</div>
                  <div>gender (CHAR)</div>
                  <div>city (TEXT)</div>
                  <div>province_id (FK, CHAR)</div>
                  <div>allergies (TEXT)</div>
                  <div>height (INT)</div>
                  <div>weight (INT)</div>
                </div>
              )}
            </div>

            {/* doctors */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div onClick={() => setExpandedTables(prev => ({ ...prev, doctors: !prev.doctors }))} style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                <span><i className="fas fa-table" style={{ color: '#10b981', marginRight: '6px' }}></i> doctors</span>
                <i className="fas fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
              </div>
              {expandedTables.doctors && (
                <div style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.76rem', color: '#475569' }}>
                  <div>doctor_id (PK, INT)</div>
                  <div>first_name (TEXT)</div>
                  <div>last_name (TEXT)</div>
                  <div>specialty (TEXT)</div>
                </div>
              )}
            </div>

            {/* admissions */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div onClick={() => setExpandedTables(prev => ({ ...prev, admissions: !prev.admissions }))} style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                <span><i className="fas fa-table" style={{ color: '#f59e0b', marginRight: '6px' }}></i> admissions</span>
                <i className="fas fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
              </div>
              {expandedTables.admissions && (
                <div style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.76rem', color: '#475569' }}>
                  <div>patient_id (FK, INT)</div>
                  <div>admission_date (DATE)</div>
                  <div>discharge_date (DATE)</div>
                  <div>diagnosis (TEXT)</div>
                  <div>attending_doctor_id (FK, INT)</div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Login Modal (ONLY GMAIL AUTHENTICATION) */}
      {showLogin && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', borderRadius: '14px', width: '90%', maxWidth: '440px', padding: '28px 24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <i className="fab fa-google" style={{ color: '#4285F4' }}></i> JUET Student Sign-In
              </h2>
              {user && (
                <button onClick={() => setShowLogin(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#94a3b8', cursor: 'pointer' }}>&times;</button>
              )}
            </div>

            <div style={{ width: '56px', height: '56px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 4px 12px rgba(37,99,235,0.12)' }}>
              <i className="fas fa-graduation-cap" style={{ color: '#2563eb', fontSize: '1.6rem' }}></i>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>Dr. Jitendra Parmar Lab</h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>SQL Practice Virtual Lab &bull; JUET Guna</p>

            <div style={{ fontSize: '0.82rem', color: '#334155', background: '#eff6ff', borderLeft: '3px solid #2563eb', padding: '12px 14px', borderRadius: '6px', textAlign: 'left', lineHeight: 1.45, marginBottom: '20px' }}>
              <i className="fas fa-info-circle" style={{ color: '#2563eb', marginRight: '4px' }}></i>
              Institutional access requires authentication strictly via your official <strong>@juetguna.in</strong> Gmail account. Your name and enrollment number will be identified automatically to track your points and solved queries.
            </div>

            {/* Google Sign-in Button going to /signup */}
            <button
              type="button"
              onClick={() => {
                window.location.href = '/signup';
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                width: '100%',
                background: '#ffffff',
                color: '#1f2937',
                border: '1px solid #dadce0',
                borderRadius: '8px',
                padding: '11px 16px',
                fontSize: '0.94rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span>Sign in with Gmail (@juetguna.in)</span>
            </button>

            <div style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <i className="fas fa-lock" style={{ fontSize: '0.72rem' }}></i> Strictly institutional authentication via @juetguna.in Gmail
            </div>
          </div>
        </div>
      )}

      {/* Diagram Modal */}
      {showDiagram && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', width: '90%', maxWidth: '640px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Hospital Database ER Schema</h2>
              <button onClick={() => setShowDiagram(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#2563eb' }}>patients</div>
                <div>patient_id (PK)</div>
                <div>first_name, last_name</div>
                <div>province_id (FK &rarr; province_names)</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#10b981' }}>doctors</div>
                <div>doctor_id (PK)</div>
                <div>first_name, last_name</div>
                <div>specialty</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
