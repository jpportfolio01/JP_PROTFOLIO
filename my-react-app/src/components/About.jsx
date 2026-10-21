import React from 'react';

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 20px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>About Me</h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '6px' }}>
            Advancing Open-World Machine Learning, NLP & Computer Science Education
          </p>
        </div>

        <div style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p>
            <strong>Dr. Jitendra Parmar</strong> is an Assistant Professor (Senior Grade) in the Department of Computer Science and Engineering at Jaypee University of Engineering and Technology (JUET), Guna, MP. With extensive research experience across machine learning, artificial intelligence, and software systems, his primary research focuses on <em>Unseen Class Identification in Open-World Machine Learning</em>, text classification under domain drift, and continual learning.
          </p>
          <p>
            He earned his Ph.D. in Computer Science and Engineering from the prestigious <strong>Malaviya National Institute of Technology (MNIT) Jaipur</strong>. His breakthrough work has been published in world-leading top-tier venues including <strong>ACM Computing Surveys (Impact Factor: 30.4, ranked 1/147 in CS Theory)</strong>, <strong>Information Processing & Management (Impact Factor: 8.1)</strong>, and the <strong>Journal of Systems and Software (Impact Factor: 4.1)</strong>.
          </p>
          <p>
            In recognition of his academic rigor, Dr. Parmar received the prestigious <strong>Research Scholarship from the Ministry of Education, Government of India</strong> in 2019. Prior to joining JUET Guna, he served as Assistant Professor at SCAI, VIT Bhopal University (2023–2025) and in the Department of Information Technology at SGSITS Indore (2015–2019).
          </p>
        </div>

        {/* Education */}
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>Education</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #4f46e5' }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>Ph.D. in Computer Science & Engineering</div>
              <div style={{ color: '#4f46e5', fontWeight: 600 }}>Malaviya National Institute of Technology (MNIT) Jaipur</div>
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>Thesis: Unseen Class Identification in Open-World Machine Learning</div>
            </div>

            <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #06b6d4' }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>M.Tech. in Software Systems</div>
              <div style={{ color: '#0891b2', fontWeight: 600 }}>Samrat Ashok Technological Institute (S.A.T.I.), Vidisha</div>
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>Grant-in-Aid Govt. of MP, Estd. 1960</div>
            </div>

            <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>B.E. in Information Technology</div>
              <div style={{ color: '#059669', fontWeight: 600 }}>Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
