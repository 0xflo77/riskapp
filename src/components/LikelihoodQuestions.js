import React from 'react';

const questionOptions = [
  { value: 0, label: 'N/A' },
  { value: 1, label: 'Low' },
  { value: 4, label: 'Medium' },
  { value: 7, label: 'High' },
  { value: 9, label: 'Very High' },
];

const questions = [
  {
    question: "How technically skilled is this group of threat agents?",
    tooltip: "Consider the level of technical expertise and resources available to potential attackers."
  },
  {
    question: "How motivated is this group of threat agents to find and exploit this vulnerability?",
    tooltip: "Evaluate the potential rewards or incentives for exploiting this vulnerability."
  },
  {
    question: "What resources and opportunities are required for this group of threat agents to find and exploit this vulnerability?",
    tooltip: "Consider the accessibility of the target and the complexity of the attack."
  },
  {
    question: "How large is this group of threat agents?",
    tooltip: "Estimate the number of potential attackers who might attempt to exploit this vulnerability."
  },
  {
    question: "How easy is it to discover this vulnerability?",
    tooltip: "Consider how readily apparent the vulnerability is and whether it requires specialized knowledge to identify."
  },
  {
    question: "How easy is it to actually exploit this vulnerability?",
    tooltip: "Evaluate the complexity of the attack and the availability of exploit tools or methods."
  },
  {
    question: "How well known is this vulnerability to this group of threat agents?",
    tooltip: "Consider whether the vulnerability is public knowledge or if it's a zero-day exploit."
  },
  {
    question: "How likely is an exploit to be detected?",
    tooltip: "Evaluate your current monitoring and detection capabilities for this type of exploit."
  },
];

function LikelihoodQuestions({ onScoreChange }) {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionIndex, value) => {
    const newAnswers = { ...answers, [questionIndex]: value };
    setAnswers(newAnswers);
    const totalScore = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
    onScoreChange(Math.round(totalScore / 8)); // Average score rounded to nearest integer
  };

  return (
    <div className="question-section">
      <h2>Likelihood Assessment</h2>
      {questions.map((q, index) => (
        <div key={index} className="question">
          <p>
            {q.question}
            <span className="info-icon" title={q.tooltip}>ⓘ</span>
          </p>
          <select onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}>
            <option value="">Select...</option>
            {questionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default LikelihoodQuestions;
