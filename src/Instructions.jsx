import React from 'react';
import { X, Cpu, List, Loader, Play } from 'lucide-react';

export default function Instructions({ onClose, onStart }) {
  return (
    <div className="modal-overlay fade-in">
      <div className="modal-glass">
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <h2 className="modal-title">SYSTEM MANUAL</h2>
        <p className="modal-subtitle">Follow protocol for optimal decision making.</p>

        <div className="instruction-steps">
          <div className="inst-row">
            <div className="icon-box"><Cpu /></div>
            <div className="inst-text">
              <strong>1. Calibrate Mood</strong>
              <p>Type how you feel. The interface will adapt visually to your emotions.</p>
            </div>
          </div>

          <div className="inst-row">
            <div className="icon-box"><List /></div>
            <div className="inst-text">
              <strong>2. Input Variables</strong>
              <p>Enter the choices you are confused about (e.g., Pizza, Burger, Sushi).</p>
            </div>
          </div>

          <div className="inst-row">
            <div className="icon-box"><Loader className="spin-slow" /></div>
            <div className="inst-text">
              <strong>3. Initiate Spin</strong>
              <p>The physics engine will select the best option for your current vibe.</p>
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
}