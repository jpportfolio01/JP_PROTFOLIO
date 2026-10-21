import React from 'react';

export default function Hero({ onOpenSqlPractice }) {
  return (
    <section id="home" style={{
      padding: '120px 20px 70px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 800,
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            Dr. Jitendra Parmar
          </h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            Assistant Professor (Senior Grade)
          </p>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
            Department of Computer Science & Engineering<br />
            Jaypee University of Engineering and Technology (JUET), Guna, MP, India
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
            <span style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              <i className="fas fa-graduation-cap"></i> Ph.D. NIT Jaipur
            </span>
            <span style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              <i className="fas fa-brain"></i> Open-World ML Specialist
            </span>
            <span style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              <i className="fas fa-award"></i> MoE Research Scholar (Govt. of India)
            </span>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '28px' }}>
            <button onClick={onOpenSqlPractice} style={{
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
            }}>
              <i className="fas fa-terminal"></i> Open SQL Practice Lab
            </button>
            <a href="#contact" style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              color: '#334155',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>Get in Touch</a>
          </div>

          <div style={{ display: 'flex', gap: '18px', fontSize: '1.2rem', color: '#64748b' }}>
            <a href="https://scholar.google.com/citations?user=toHDoiwAAAAJ&hl=en&authuser=1" target="_blank" rel="noreferrer" style={{ color: '#475569' }} title="Google Scholar"><i className="fas fa-graduation-cap"></i></a>
            <a href="https://www.researchgate.net/profile/Jitendra-Parmar-9?ev=hdr_xprf" target="_blank" rel="noreferrer" style={{ color: '#475569' }} title="ResearchGate"><i className="fab fa-researchgate"></i></a>
            <a href="https://www.linkedin.com/in/dr-jitendra-parmar-phd-2bb8a499" target="_blank" rel="noreferrer" style={{ color: '#475569' }} title="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="https://www.juet.ac.in/faculty/profile/dr-jitendra-parmar" target="_blank" rel="noreferrer" style={{ color: '#475569' }} title="JUET Faculty Profile"><i className="fas fa-university"></i></a>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            position: 'relative',
            width: '320px',
            height: '380px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            border: '4px solid #ffffff'
          }}>
            <img src="dr_parmar.png" alt="Dr. Jitendra Parmar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'new_profile.jpg'; }} />
          </div>
        </div>
      </div>
    </section>
  );
}
