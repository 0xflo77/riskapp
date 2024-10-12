import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders RiskCalculator component', () => {
  render(<App />);
  const headerElement = screen.getByText(/Cybersecurity Risk Calculator/i);
  expect(headerElement).toBeInTheDocument();
});
