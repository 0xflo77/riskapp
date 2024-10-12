import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LikelihoodQuestions from './LikelihoodQuestions';

describe('LikelihoodQuestions', () => {
  test('renders all questions', () => {
    render(<LikelihoodQuestions onScoreChange={() => {}} />);
    expect(screen.getAllByRole('combobox')).toHaveLength(6);
  });

  test('calls onScoreChange when an answer is selected', () => {
    const mockOnScoreChange = jest.fn();
    render(<LikelihoodQuestions onScoreChange={mockOnScoreChange} />);
    const firstQuestion = screen.getAllByRole('combobox')[0];
    fireEvent.change(firstQuestion, { target: { value: '2' } });
    expect(mockOnScoreChange).toHaveBeenCalled();
  });

  test('updates severity counts correctly', () => {
    const mockOnScoreChange = jest.fn();
    render(<LikelihoodQuestions onScoreChange={mockOnScoreChange} />);
    const questions = screen.getAllByRole('combobox');

    fireEvent.change(questions[0], { target: { value: '0' } });
    fireEvent.change(questions[1], { target: { value: '1' } });
    fireEvent.change(questions[2], { target: { value: '2' } });
    fireEvent.change(questions[3], { target: { value: '3' } });
    fireEvent.change(questions[4], { target: { value: '4' } });

    expect(mockOnScoreChange).toHaveBeenLastCalledWith(10, {
      NA: 1,
      Low: 1,
      Medium: 1,
      High: 1,
      VeryHigh: 1
    });
  });

  test('applies correct severity class to dropdowns', () => {
    render(<LikelihoodQuestions onScoreChange={() => {}} />);
    const questions = screen.getAllByRole('combobox');

    fireEvent.change(questions[0], { target: { value: '0' } });
    fireEvent.change(questions[1], { target: { value: '1' } });
    fireEvent.change(questions[2], { target: { value: '2' } });
    fireEvent.change(questions[3], { target: { value: '3' } });
    fireEvent.change(questions[4], { target: { value: '4' } });

    expect(questions[0]).toHaveClass('severity-na');
    expect(questions[1]).toHaveClass('severity-low');
    expect(questions[2]).toHaveClass('severity-medium');
    expect(questions[3]).toHaveClass('severity-high');
    expect(questions[4]).toHaveClass('severity-very-high');
  });
});
