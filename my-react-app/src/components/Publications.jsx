import React from 'react';

export default function Publications() {
  const papers = [
    {
      title: "Open-world machine learning: Applications, challenges, and opportunities",
      authors: "J. Parmar, S. S. Chouhan, V. Raychoudhury, and S. S. Rathore",
      journal: "ACM Computing Surveys (CSUR), vol. 55, no. 10, Feb. 2023",
      badge: "SCI-Q1 | Impact Factor: 30.4 (Ranked 1/147 in CS Theory)"
    },
    {
      title: "A machine learning based framework to identify unseen classes in open-world text classification",
      authors: "J. Parmar, S. S. Chouhan, and V. Raychoudhury",
      journal: "Information Processing & Management (IP&M), vol. 60, no. 2, 2023",
      badge: "SCI-Q1 | Impact Factor: 8.1"
    },
    {
      title: "Systematic literature review on software code smell detection approaches",
      authors: "P. S. Thakur, S. S. Chouhan, S. S. Rathore, and J. Parmar",
      journal: "Journal of Systems and Software (JSS), p. 112784, 2026",
      badge: "SCI-Q1 | Impact Factor: 4.1"
    },
    {
      title: "Ensemble-based diabetic retinopathy detection using CNN, Random Forest, and AdaBoost",
      authors: "J. Parmar",
      journal: "2025 IEEE REACS, IEEE, 2025, pp. 1–6",
      badge: "IEEE Conference"
    }
  ];

  return (
    <section id="publications" style={{ padding: '80px 20px', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>Selected Publications</h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '6px' }}>
            High-impact research in SCI-Q1 journals and premier IEEE/Springer venues
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {papers.map((p, i) => (
            <div key={i} style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '22px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
            }}>
              <span style={{
                display: 'inline-block',
                background: '#dbeafe',
                color: '#1e40af',
                fontWeight: 700,
                fontSize: '0.75rem',
                padding: '3px 8px',
                borderRadius: '4px',
                marginBottom: '8px'
              }}>
                <i className="fas fa-star" style={{ marginRight: '4px' }}></i> {p.badge}
              </span>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '8px' }}>{p.title}</h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '6px' }}>{p.authors}</p>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}><em>{p.journal}</em></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
