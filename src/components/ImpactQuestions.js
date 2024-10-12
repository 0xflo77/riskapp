/**
 * RiskApp - Impact Questions Component
 * Author: 0xflo77
 * 
 * This component handles the impact assessment questions.
 * It uses OWASP criteria to evaluate the impact of security risks.
 */

import React, { useState, useEffect } from 'react';

const impactQuestions = [
  "How severe is the impact on data confidentiality?",
  "How severe is the impact on data integrity?",
  "How severe is the impact on data availability?",
  "How severe is the impact on accountability?",
  "How severe is the financial damage?",
  "How severe is the reputation damage?"
];

const options = [
  { value: 0, label: 'NA' },
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
  { value: 4, label: 'Very High' }
];

function ImpactQuestions({ onScoreChange }) {
  const [scores, setScores] = useState(Array(impactQuestions.length).fill(0));
  const [counts, setCounts] = useState({ NA: 0, Low: 0, Medium: 0, High: 0, VeryHigh: 0 });

  useEffect(() => {
    const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
    onScoreChange(totalScore, counts);
  }, [scores, counts, onScoreChange]);

  const handleChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = parseInt(value);
    setScores(newScores);

    const newCounts = { NA: 0, Low: 0, Medium: 0, High: 0, VeryHigh: 0 };
    newScores.forEach(score => {
      if (score === 0) newCounts.NA++;
      else if (score === 1) newCounts.Low++;
      else if (score === 2) newCounts.Medium++;
      else if (score === 3) newCounts.High++;
      else if (score === 4) newCounts.VeryHigh++;
    });
    setCounts(newCounts);
  };

  return (
    <div className="questions-container" data-testid="impact-questions">
      <h2>Impact Assessment</h2>
      {impactQuestions.map((question, index) => (
        <div key={index} className="question">
          <label>{question}</label>
          <select 
            onChange={(e) => handleChange(index, e.target.value)}
            className={scores[index] ? `severity-${options.find(opt => opt.value === scores[index]).label.toLowerCase()}` : ''}
          >
            <option value="0">Select an option</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default ImpactQuestions;
