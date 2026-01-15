import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, ArrowRight, X, Cpu, List, Play, Loader } from 'lucide-react';

// --- INSTRUCTIONS MODAL COMPONENT ---
const InstructionsModal = ({ onClose, onStart }) => (
  <div className="modal-overlay fade-in">
    <div className="modal-glass">
      <button className="close-btn" onClick={onClose}><X size={24} /></button>
      
      <h2 className="modal-title">SYSTEM MANUAL</h2>
      <p className="modal-subtitle">Protocol for the indecisive.</p>

      <div className="instruction-steps">
        <div className="inst-row">
          <div className="icon-box"><Cpu size={20} /></div>
          <div className="inst-text">
            <strong>1. Calibrate Mood</strong>
            <p>Type how you feel. The UI adapts instantly.</p>
          </div>
        </div>

        <div className="inst-row">
          <div className="icon-box"><List size={20} /></div>
          <div className="inst-text">
            <strong>2. Input Choices</strong>
            <p>Add the options confusing you (e.g., Pizza, Burger).</p>
          </div>
        </div>

        <div className="inst-row">
          <div className="icon-box"><Loader size={20} className="spin-slow" /></div>
          <div className="inst-text">
            <strong>3. Initiate Spin</strong>
            <p>Physics decides your fate. No take-backs.</p>
          </div>
        </div>
      </div>

      <button className="cyber-btn full-width" onClick={onStart}>
        <Play size={18} style={{marginRight: '10px'}} />
        ACKNOWLEDGE & START
      </button>
    </div>
  </div>
);

// --- MAIN LANDING PAGE ---
export default function Landing() {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleStart = () => {
    setShowInstructions(false); // Close modal
    navigate('/app'); // Go to app
  };

  return (
    <>
      <div className="landing-container">
        <nav className="navbar">
          <div className="logo">VIBE<span className="highlight">ENGINE</span></div>
          <button className="icon-btn" onClick={() => setShowInstructions(true)}>
            <Info size={24} />
          </button>
        </nav>

        {/* HERO */}
        <div className="hero-section reveal">
          <h1 className="hero-title">
            DECIDE WITH <br />
            <span className="highlight">CHAOS.</span>
          </h1>
          <p className="hero-subtitle">
            Don't overthink. Input your mood, load options, and let the physics engine decide your fate.
          </p>
          
          <button className="cyber-btn big-btn" onClick={() => setShowInstructions(true)}>
            INITIATE SYSTEM <ArrowRight size={20} style={{marginLeft: '10px'}} />
          </button>
        </div>

        {/* DETAILS */}
        <div className="content-section reveal">
          <h2 className="section-title">Why use this?</h2>
          <p className="about-text">
            Indecision kills time. This tool isn't AI—it's a <strong>Mood-Responsive Randomizer</strong>. 
            It creates an environment that matches your feelings (Sad, Happy, Angry) and forces a choice upon you.
          </p>
        </div>

        <footer>
          VibeEngine © 2026. Built for the indecisive.
        </footer>
      </div>

      {/* MODAL TRIGGER */}
      {showInstructions && (
        <InstructionsModal 
          onClose={() => setShowInstructions(false)} 
          onStart={handleStart} 
        />
      )}
    </>
  );
}