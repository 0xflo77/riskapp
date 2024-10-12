/**
 * RiskApp - Risk Calculator Component
 * Author: 0xflo77
 * 
 * This component is the main calculator for the RiskApp application.
 * It combines likelihood and impact assessments to calculate overall risk.
 */

import React, { useState } from 'react';
import LikelihoodQuestions from './LikelihoodQuestions';
import ImpactQuestions from './ImpactQuestions';

function RiskCalculator() {
  const [likelihoodScore, setLikelihoodScore] = useState(0);
  const [impactScore, setImpactScore] = useState(0);
  const [likelihoodCounts, setLikelihoodCounts] = useState({ NA: 0, Low: 0, Medium: 0, High: 0, VeryHigh: 0 });
  const [impactCounts, setImpactCounts] = useState({ NA: 0, Low: 0, Medium: 0, High: 0, VeryHigh: 0 });

  const overallRiskScore = likelihoodScore * impactScore;

  const getRiskLevel = (score) => {
    if (score === 0) return 'NA';
    if (score > 0 && score <= 30) return 'Low';
    if (score > 30 && score <= 60) return 'Medium';
    if (score > 60 && score <= 90) return 'High';
    return 'Very High';
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'NA': return '#A9A9A9';
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FFC107';
      case 'High': return '#FF5722';
      case 'Very High': return '#8B0000';
      default: return '#000000';
    }
  };

  const riskLevel = getRiskLevel(overallRiskScore);
  const riskColor = getRiskColor(riskLevel);

  const handleLikelihoodScoreChange = (score, counts) => {
    setLikelihoodScore(score);
    setLikelihoodCounts(counts);
  };

  const handleImpactScoreChange = (score, counts) => {
    setImpactScore(score);
    setImpactCounts(counts);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="risk-calculator">
      <h1>Cybersecurity Risk Calculator</h1>
      <div className="calculator-content">
        <div className="questions-section">
          <LikelihoodQuestions onScoreChange={handleLikelihoodScoreChange} />
          <ImpactQuestions onScoreChange={handleImpactScoreChange} />
        </div>
        <div className="scores-section">
          <div className="score">
            Likelihood Score: <span style={{color: '#4CAF50'}}>{likelihoodScore}</span>
            <div className="severity-counts">
              <div>NA: {likelihoodCounts.NA}</div>
              <div>Low: {likelihoodCounts.Low}</div>
              <div>Medium: {likelihoodCounts.Medium}</div>
              <div>High: {likelihoodCounts.High}</div>
              <div>Very High: {likelihoodCounts.VeryHigh}</div>
            </div>
          </div>
          <div className="score">
            Impact Score: <span style={{color: '#2196F3'}}>{impactScore}</span>
            <div className="severity-counts">
              <div>NA: {impactCounts.NA}</div>
              <div>Low: {impactCounts.Low}</div>
              <div>Medium: {impactCounts.Medium}</div>
              <div>High: {impactCounts.High}</div>
              <div>Very High: {impactCounts.VeryHigh}</div>
            </div>
          </div>
          <div className="score">Overall Risk Score: <span style={{color: riskColor}}>{overallRiskScore}</span></div>
          <div className="score">Risk Level: <span style={{color: riskColor}}>{riskLevel}</span></div>
          <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default RiskCalculator;
