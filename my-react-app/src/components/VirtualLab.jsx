import React from 'react';

export default function VirtualLab({ onLaunchSqlPractice }) {
  return (
    <section id="virtual-lab" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.1)',
            color: '#4f46e5',
            fontWeight: 700,
            fontSize: '0.85rem',
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '12px'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></span>
            JUET VIRTUAL LAB INITIATIVE
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>Virtual Lab & Engineering Projects</h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '700px', margin: '8px auto 0' }}>
            Interactive simulation environments and intelligent learning tools developed under Dr. Jitendra Parmar for students and researchers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          
          {/* COMPLETED PROJECT: SQL PRACTICE */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '2px solid #6366f1',
            boxShadow: '0 12px 30px rgba(99, 102, 241, 0.12)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: 'white',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              padding: '4px 10px',
              borderRadius: '12px'
            }}>
              Completed Project
            </div>

            <div style={{
              height: '180px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '12px 16px',
                width: '90%',
                fontFamily: 'monospace',
                fontSize: '0.82rem',
                color: '#38bdf8'
              }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '4px' }}>// JUET SQL Practice Engine</div>
                <span style={{ color: '#f43f5e' }}>SELECT</span> * <span style={{ color: '#f43f5e' }}>FROM</span> patients<br />
                <span style={{ color: '#f43f5e' }}>WHERE</span> province_id = <span style={{ color: '#38bdf8' }}>'ON'</span>;
              </div>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <i className="fas fa-check"></i> Completed Project
                </span>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>&bull; 124K+ Runs &bull; 32 Live</span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>SQL PRACTICE</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '18px', flex: 1 }}>
                Interactive online SQL query sandbox with automated validation against reference datasets. Includes <strong>@juetguna.in</strong> student authentication, real-time query execution, test-case diff comparison, score tracking, schema inspection, and interview challenge sets.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>Interactive SQL</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>Automated Grading</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>Hospital Schema</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>@juetguna.in Tracking</span>
              </div>

              <button onClick={onLaunchSqlPractice} style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '12px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
              }}>
                <i className="fas fa-play-circle"></i> Launch SQL Practice Lab &rarr;
              </button>
            </div>
          </div>

          {/* CURRENT PROJECT 1 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              height: '180px',
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-network-wired" style={{ fontSize: '3.5rem', color: '#818cf8' }}></i>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#2563eb', background: '#eff6ff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <i className="fas fa-sync-alt fa-spin"></i> Current Project
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Open-World ML Benchmark Studio</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '18px', flex: 1 }}>
                A research platform evaluating machine learning models on novel and unseen class identification under continuous distribution shifts. Empowers researchers to benchmark open-world classification pipelines.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>Open-World ML</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>PyTorch</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>Active Research</span>
              </div>

              <a href="#contact" style={{
                textAlign: 'center',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.88rem'
              }}>Inquire for Research Collaboration</a>
            </div>
          </div>

          {/* CURRENT PROJECT 2 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              height: '180px',
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-code-branch" style={{ fontSize: '3.5rem', color: '#a855f7' }}></i>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#2563eb', background: '#eff6ff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <i className="fas fa-sync-alt fa-spin"></i> Current Project
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>NLP Code Smell & Defect Classifier</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '18px', flex: 1 }}>
                An intelligent static code analysis environment utilizing transformer representations and Abstract Syntax Trees (AST) to identify architectural code smells and anti-patterns in production repositories.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>NLP</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>Software Engineering</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 500, padding: '3px 8px', borderRadius: '4px' }}>Q1 Research</span>
              </div>

              <a href="#contact" style={{
                textAlign: 'center',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.88rem'
              }}>View Project Overview</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
