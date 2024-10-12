/**
 * RiskApp - Main App Component
 * Author: 0xflo77
 * 
 * This is the main component of the RiskApp application.
 * It renders the RiskCalculator component.
 */

import React from 'react';
import RiskCalculator from './components/RiskCalculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <RiskCalculator />
    </div>
  );
}

export default App;
