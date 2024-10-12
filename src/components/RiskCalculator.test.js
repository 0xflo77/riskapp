import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RiskCalculator from './RiskCalculator';

// Mock the window.location.reload function
const mockReload = jest.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true
});

describe('RiskCalculator', () => {
  beforeEach(() => {
    render(<RiskCalculator />);
  });

  test('renders the calculator title', () => {
    expect(screen.getByText('Cybersecurity Risk Calculator')).toBeInTheDocument();
  });

  test('displays likelihood score', () => {
    expect(screen.getByText(/Likelihood Score:/)).toBeInTheDocument();
  });

  test('displays impact score', () => {
    expect(screen.getByText(/Impact Score:/)).toBeInTheDocument();
  });

  test('displays overall risk score', () => {
    expect(screen.getByText(/Overall Risk Score:/)).toBeInTheDocument();
  });

  test('renders likelihood questions', () => {
    expect(screen.getByTestId('likelihood-questions')).toBeInTheDocument();
  });

  test('renders impact questions', () => {
    expect(screen.getByTestId('impact-questions')).toBeInTheDocument();
  });

  test('calculates overall risk score correctly', () => {
    const likelihoodQuestions = screen.getAllByTestId('likelihood-questions')[0].querySelectorAll('select');
    const impactQuestions = screen.getAllByTestId('impact-questions')[0].querySelectorAll('select');

    // Set all likelihood questions to 'Medium' (value 2)
    likelihoodQuestions.forEach(question => {
      fireEvent.change(question, { target: { value: '2' } });
    });

    // Set all impact questions to 'High' (value 3)
    impactQuestions.forEach(question => {
      fireEvent.change(question, { target: { value: '3' } });
    });

    expect(screen.getByText('Likelihood Score: 12')).toBeInTheDocument();
    expect(screen.getByText('Impact Score: 18')).toBeInTheDocument();
    expect(screen.getByText('Overall Risk Score: 216')).toBeInTheDocument();
  });

  test('updates severity counts correctly', () => {
    const likelihoodQuestions = screen.getAllByTestId('likelihood-questions')[0].querySelectorAll('select');
    
    fireEvent.change(likelihoodQuestions[0], { target: { value: '0' } });
    fireEvent.change(likelihoodQuestions[1], { target: { value: '1' } });
    fireEvent.change(likelihoodQuestions[2], { target: { value: '2' } });
    fireEvent.change(likelihoodQuestions[3], { target: { value: '3' } });
    fireEvent.change(likelihoodQuestions[4], { target: { value: '4' } });

    expect(screen.getByText('NA: 1')).toBeInTheDocument();
    expect(screen.getByText('Low: 1')).toBeInTheDocument();
    expect(screen.getByText('Medium: 1')).toBeInTheDocument();
    expect(screen.getByText('High: 1')).toBeInTheDocument();
    expect(screen.getByText('Very High: 1')).toBeInTheDocument();
  });

  test('calls window.location.reload when reset button is clicked', () => {
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
