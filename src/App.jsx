import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import SpinnerGame from './SpinnerGame';
import './App.css';

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        {/* Global Fixed Background */}
        <div className="ambient-glow glow-1"></div>
        <div className="ambient-glow glow-2"></div>
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<SpinnerGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;