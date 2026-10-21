import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VirtualLab from './components/VirtualLab';
import Publications from './components/Publications';
import Contact from './components/Contact';
import SqlPractice from './components/SqlPractice/SqlPractice';

function App() {
  const [activeView, setActiveView] = useState('portfolio'); // 'portfolio' | 'sql-practice'

  if (activeView === 'sql-practice') {
    return <SqlPractice onBack={() => setActiveView('portfolio')} />;
  }

  return (
    <div className="App">
      <Navbar
        onOpenVirtualLab={() => setActiveView('sql-practice')}
        onHome={() => setActiveView('portfolio')}
      />
      <Hero onOpenSqlPractice={() => setActiveView('sql-practice')} />
      <About />
      <VirtualLab onLaunchSqlPractice={() => setActiveView('sql-practice')} />
      <Publications />
      <Contact onOpenSqlPractice={() => setActiveView('sql-practice')} />
    </div>
  );
}

export default App;
