import React from 'react';

const RiskMatrix = ({ likelihoodScore, impactScore }) => {
  const likelihoodLevels = [9, 7, 4, 1, 0];
  const impactLevels = [10, 8, 5, 2, 0];

  const getRiskLevel = (score) => {
    if (score < 15) return 'low';
    if (score < 30) return 'medium';
    if (score < 60) return 'high';
    return 'very-high';
  };

  return (
    <div className="risk-matrix">
      <div className="matrix-row header">
        <div className="matrix-cell"></div>
        {impactLevels.map((level, index) => (
          <div key={index} className="matrix-cell">
            {level}
          </div>
        ))}
      </div>
      {likelihoodLevels.map((lLevel, lIndex) => (
        <div key={lIndex} className="matrix-row">
          <div className="matrix-cell">{lLevel}</div>
          {impactLevels.map((iLevel, iIndex) => {
            const score = lLevel * iLevel;
            const isSelected = lLevel === likelihoodScore && iLevel === impactScore;
            return (
              <div
                key={iIndex}
                className={`matrix-cell ${getRiskLevel(score)} ${isSelected ? 'selected' : ''}`}
              >
                {score}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default RiskMatrix;