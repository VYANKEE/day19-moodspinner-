import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, RefreshCw, Zap, Meh, Frown, Smile, Skull, ArrowRight } from 'lucide-react';

const MOOD_THEMES = {
  default: { color: "#00d4ff", icon: <Zap /> },
  happy: { color: "#ffdd00", icon: <Smile /> },
  sad: { color: "#4f8cf5", icon: <Frown /> },
  angry: { color: "#ff2a6d", icon: <Skull /> },
  excited: { color: "#d300ff", icon: <Zap /> },
  tired: { color: "#05ffa1", icon: <Meh /> },
};

export default function SpinnerGame() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [moodText, setMoodText] = useState("");
  const [currentTheme, setCurrentTheme] = useState("default");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [winner, setWinner] = useState(null);
  const [rotation, setRotation] = useState(0);

  // 1. Theme Update Logic
  const updateTheme = (moodKey) => {
    setCurrentTheme(moodKey);
    document.documentElement.style.setProperty('--theme-color', MOOD_THEMES[moodKey].color);
  };

  const detectMood = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.match(/(good|great|happy|joy|awesome|lol|haha)/)) return "happy";
    if (lowerText.match(/(sad|cry|blue|down|depressed|lonely|upset)/)) return "sad";
    if (lowerText.match(/(mad|angry|furious|hate|rage|annoyed)/)) return "angry";
    if (lowerText.match(/(hype|excited|energy|pumped|party|lets go)/)) return "excited";
    if (lowerText.match(/(tired|sleepy|bored|exhausted|chill|lazy)/)) return "tired";
    return "default";
  };

  const handleMoodInput = (e) => {
    const text = e.target.value;
    setMoodText(text);
    const detected = detectMood(text);
    if (detected !== currentTheme) {
      updateTheme(detected);
    }
  };

  const addOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const spinWheel = () => {
    if (options.length < 2) return alert("Add at least 2 options!");
    const sliceAngle = 360 / options.length;
    const randomSlice = Math.floor(Math.random() * options.length);
    const extraSpins = 360 * 5;
    const targetRotation = extraSpins + (randomSlice * sliceAngle) + (sliceAngle / 2);
    setRotation(rotation + targetRotation);
    
    setTimeout(() => {
      setWinner(options[options.length - 1 - randomSlice]); 
      setStep(4);
    }, 3500);
  };

  const reset = () => {
    setStep(1);
    setOptions([]);
    setMoodText("");
    setWinner(null);
    setRotation(0);
    updateTheme("default");
  };

  return (
    <div className="game-container fade-in">
      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} /> Exit
      </button>
      
      <main className="card-glass">
        {/* STEP 1: MOOD */}
        {step === 1 && (
          <div className="step-content slide-up">
            <div className="step-header">
              <h2>System Status</h2>
              <div className="status-icon" style={{color: MOOD_THEMES[currentTheme].color}}>
                {MOOD_THEMES[currentTheme].icon}
              </div>
            </div>
            
            <textarea
              placeholder="e.g. I am feeling super angry right now..."
              value={moodText}
              onChange={handleMoodInput}
              className="mood-input"
            />
            
            <div className="mood-indicator">
              Detected Vibe: <span style={{color: 'var(--theme-color)', fontWeight:'bold'}}>{currentTheme.toUpperCase()}</span>
            </div>
            
            <button className="cyber-btn" onClick={() => setStep(2)} disabled={!moodText}>
              Next Step <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: OPTIONS */}
        {step === 2 && (
          <div className="step-content slide-up">
            <h2>Variables</h2>
            <p className="sub-text">Theme: <span style={{color: 'var(--theme-color)'}}>{currentTheme}</span>. Enter choices:</p>
            
            <div className="input-group">
              <input 
                type="text" 
                value={newOption} 
                onChange={(e) => setNewOption(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addOption()}
                placeholder="Type option & Enter"
              />
              <button className="add-btn" onClick={addOption}><Plus /></button>
            </div>
            
            <div className="tags-container">
              {options.map((opt, i) => <span key={i} className="tag">{opt}</span>)}
            </div>
            
            <button className="cyber-btn" onClick={() => setStep(3)} disabled={options.length < 2}>
              Generate Wheel <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 3: SPINNER */}
        {step === 3 && (
          <div className="step-content zoom-in">
            <div className="wheel-container">
              <div className="marker">▼</div>
              <div className="wheel" style={{ transform: `rotate(-${rotation}deg)`, transition: 'transform 3s cubic-bezier(0.1, 0, 0.2, 1)' }}>
                {options.map((opt, i) => (
                  <div key={i} className="wheel-segment" style={{ transform: `rotate(${i * (360 / options.length)}deg)` }}>
                    <span className="segment-text">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="cyber-btn glow-pulse" onClick={spinWheel}>
              <RefreshCw size={18} style={{marginRight:'8px'}}/> EXECUTE
            </button>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {step === 4 && (
          <div className="step-content fade-in">
            <h2 className="result-label">The Algorithm Chose:</h2>
            <h1 className="winner-text neon-text">{winner}</h1>
            <p className="mood-message">Do not question the result.</p>
            <button className="cyber-btn" onClick={reset}>
              <RefreshCw size={18} style={{marginRight:'8px'}}/> Reboot
            </button>
          </div>
        )}
      </main>
    </div>
  );
}