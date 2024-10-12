/**
 * RiskApp - Likelihood Questions Component
 * Author: 0xflo77
 * 
 * This component handles the likelihood assessment questions.
 * It uses OWASP criteria to evaluate the likelihood of security risks.
 */

import React, { useState, useEffect } from 'react';

const likelihoodQuestions = [
  "How technically skilled is this group of threat agents?",
  "How motivated is this group of threat agents to find and exploit this vulnerability?",
  "What resources and opportunities are required for this group of threat agents to find and exploit this vulnerability?",
  "How large is this group of threat agents?",
  "How likely is an exploit to become widely available?",
  "How easy is it for this group of threat agents to discover this vulnerability?"
];

const options = [
  { value: 0, label: 'NA' },
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
  { value: 4, label: 'Very High' }
];

const LikelihoodQuestions = React.forwardRef(({ onScoreChange }, ref) => {
  const [scores, setScores] = useState(Array(likelihoodQuestions.length).fill(0));
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

  const reset = () => {
    setScores(Array(likelihoodQuestions.length).fill(0));
    setCounts({ NA: 0, Low: 0, Medium: 0, High: 0, VeryHigh: 0 });
  };

  React.useImperativeHandle(ref, () => ({
    reset
  }));

  return (
    <div className="questions-container" data-testid="likelihood-questions">
      <h2>Likelihood Assessment</h2>
      {likelihoodQuestions.map((question, index) => (
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
});

export default LikelihoodQuestions;
