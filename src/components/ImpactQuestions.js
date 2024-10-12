import React from 'react';

const questionOptions = [
  { value: 0, label: 'N/A' },
  { value: 2, label: 'Low' },
  { value: 5, label: 'Medium' },
  { value: 8, label: 'High' },
  { value: 10, label: 'Very High' },
];

const questions = [
  {
    question: "How much data could be disclosed and how sensitive is it?",
    tooltip: "Consider the volume and sensitivity of data that could be compromised in a breach."
  },
  {
    question: "How critical is data integrity for this system?",
    tooltip: "Evaluate the importance of data accuracy and the potential impact of data corruption."
  },
  {
    question: "How much service could be lost and how vital is it?",
    tooltip: "Consider the potential for service disruption and its impact on business operations."
  },
  {
    question: "How likely is the vulnerability to affect the reputation of the company?",
    tooltip: "Evaluate the potential for negative publicity and loss of customer trust."
  },
  {
    question: "What are the financial consequences of exploiting this vulnerability?",
    tooltip: "Consider direct costs (e.g., fines, legal fees) and indirect costs (e.g., loss of business)."
  },
  {
    question: "What are the privacy implications of this vulnerability?",
    tooltip: "Evaluate potential violations of data protection regulations and individual privacy."
  },
  {
    question: "What are the potential legal or compliance consequences?",
    tooltip: "Consider regulatory fines, legal actions, and compliance violations."
  },
  {
    question: "What is the potential impact on the organization's mission or business objectives?",
    tooltip: "Evaluate how the vulnerability could affect the organization's ability to achieve its goals."
  },
];

function ImpactQuestions({ onScoreChange }) {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionIndex, value) => {
    const newAnswers = { ...answers, [questionIndex]: value };
    setAnswers(newAnswers);
    const totalScore = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
    onScoreChange(Math.round(totalScore / 8)); // Average score rounded to nearest integer
  };

  return (
    <div className="question-section">
      <h2>Impact Assessment</h2>
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

export default ImpactQuestions;
