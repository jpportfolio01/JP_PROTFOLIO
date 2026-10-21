import React from 'react';

export default function Navbar({ onOpenVirtualLab, onHome }) {
  const linkStyle = {
    textDecoration: 'none',
    color: '#2b2b2b',
    fontWeight: 500,
    fontSize: '0.95rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0',
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: 1,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    letterSpacing: '-0.005em',
    transition: 'color 0.2s ease'
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
      zIndex: 1000,
      height: '68px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div onClick={onHome} style={{ cursor: 'pointer' }}>
          <h2 style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#1a1a1a',
            margin: 0,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: '-0.01em',
            lineHeight: 1
          }}>
            Dr. Jitendra Parmar
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}>
          <a href="#home" onClick={onHome} style={linkStyle}>Home</a>
          <a href="#about" onClick={onHome} style={linkStyle}>About</a>
          <a href="publications.html" style={linkStyle}>Publications</a>
          <a href="projects.html" style={linkStyle}>AnveshanAI</a>
          <button onClick={onOpenVirtualLab} style={linkStyle}>Virtual Lab</button>
          <a href="team.html" style={linkStyle}>Team</a>
          <a href="#contact" onClick={onHome} style={linkStyle}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
