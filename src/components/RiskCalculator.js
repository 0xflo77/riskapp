import React from 'react';
import LikelihoodQuestions from './LikelihoodQuestions';
import ImpactQuestions from './ImpactQuestions';

function RiskCalculator() {
  const [likelihoodScore, setLikelihoodScore] = React.useState(0);
  const [impactScore, setImpactScore] = React.useState(0);

  const handleLikelihoodScoreChange = (score) => setLikelihoodScore(score);
  const handleImpactScoreChange = (score) => setImpactScore(score);

  const overallRiskScore = likelihoodScore * impactScore;

  const getRiskLevel = (score) => {
    if (score < 3) return 'Low';
    if (score < 6) return 'Medium';
    if (score < 9) return 'High';
    return 'Very High';
  };

  const getOverallRiskLevel = (score) => {
    if (score < 15) return 'Low';
    if (score < 30) return 'Medium';
    if (score < 60) return 'High';
    return 'Very High';
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
          <div className="score-item">
            <span>Likelihood Score:</span>
            <div>
              <span className={`score ${getRiskLevel(likelihoodScore).toLowerCase().replace(' ', '-')}`}>
                {likelihoodScore}
              </span>
              <span className="severity-label">{getRiskLevel(likelihoodScore)}</span>
            </div>
          </div>
          <div className="score-item">
            <span>Impact Score:</span>
            <div>
              <span className={`score ${getRiskLevel(impactScore).toLowerCase().replace(' ', '-')}`}>
                {impactScore}
              </span>
              <span className="severity-label">{getRiskLevel(impactScore)}</span>
            </div>
          </div>
          <div className="score-item overall-score">
            <span>Overall Risk Score:</span>
            <div>
              <span className={`score ${getOverallRiskLevel(overallRiskScore).toLowerCase().replace(' ', '-')}`}>
                {overallRiskScore}
              </span>
              <span className="severity-label">{getOverallRiskLevel(overallRiskScore)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskCalculator;
