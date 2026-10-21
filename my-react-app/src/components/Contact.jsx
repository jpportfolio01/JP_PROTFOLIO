import React from 'react';

export default function Contact({ onOpenSqlPractice }) {
  const [clickCount, setClickCount] = React.useState(0);
  const [requiredClicks, setRequiredClicks] = React.useState(() => {
    return parseInt(localStorage.getItem('juet_admin_trigger_clicks') || '8', 10);
  });

  React.useEffect(() => {
    const apiBase = window.location.protocol.startsWith('http') && !window.location.port.includes('3000') 
      ? window.location.origin 
      : 'http://localhost:5001';
    fetch(`${apiBase}/api/admin/settings`)
      .then(r => r.json())
      .then(d => {
        const clicks = d?.settings?.triggerClickCount || d?.triggerClickCount;
        if (clicks) {
          setRequiredClicks(clicks);
          localStorage.setItem('juet_admin_trigger_clicks', clicks.toString());
        }
      })
      .catch(() => {});
  }, []);

  const resetTimerRef = React.useRef(null);

  const handleTitleClick = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 5000);

    const next = clickCount + 1;
    setClickCount(next);
    if (next >= requiredClicks) {
      setClickCount(0);
      window.location.href = 'admin.html';
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 20px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 
            onClick={handleTitleClick}
            style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', cursor: 'pointer', userSelect: 'none' }}
            title="Get In Touch"
          >
            Get In Touch
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '6px' }}>
            Academic discussions, research guidance, and student queries
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#2563eb', fontSize: '1.5rem', marginBottom: '12px' }}><i className="fas fa-map-marker-alt"></i></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Academic Address</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Department of Computer Science & Engineering<br />
              Jaypee University of Engineering and Technology (JUET)<br />
              A.B. Road, Raghogarh, Guna, Madhya Pradesh - 473226, India
            </p>
          </div>

          <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#2563eb', fontSize: '1.5rem', marginBottom: '12px' }}><i className="fas fa-envelope"></i></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Official Email</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <a href="mailto:jitendra.parmar@juet.ac.in" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                jitendra.parmar@juet.ac.in
              </a>
            </p>
          </div>

          <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#2563eb', fontSize: '1.5rem', marginBottom: '12px' }}><i className="fas fa-laptop-code"></i></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Virtual Lab & Modules</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <button onClick={onOpenSqlPractice} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}>
                Launch SQL Practice Virtual Lab &rarr;
              </button>
            </p>
          </div>
        </div>

        <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
          &copy; 2026 Dr. Jitendra Parmar. Department of CSE, JUET Guna. All rights reserved.
        </footer>
      </div>
    </section>
  );
}
