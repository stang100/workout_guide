import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutBuilder from '../WorkoutBuilder';

describe('WorkoutBuilder Component', () => {
  test('renders workout builder title', () => {
    render(<WorkoutBuilder />);
    expect(screen.getByText('Workout Builder')).toBeInTheDocument();
  });

  test('shows all steps in stepper', () => {
    render(<WorkoutBuilder />);
    const steps = ['Select Goal', 'Choose Exercises', 'Review & Save'];
    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  test('starts with disabled next button', () => {
    render(<WorkoutBuilder />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('enables next button after selecting goal', () => {
    render(<WorkoutBuilder />);
    
    // Select a workout goal
    const select = screen.getByLabelText('Workout Goal');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Build Strength'));
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
  });

  test('can add and remove exercises', () => {
    render(<WorkoutBuilder />);
    
    // Go to exercise selection step
    const select = screen.getByLabelText('Workout Goal');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Build Strength'));
    fireEvent.click(screen.getByText('Next'));
    
    // Add an exercise
    const exerciseSelect = screen.getByLabelText('Exercise');
    fireEvent.mouseDown(exerciseSelect);
    fireEvent.click(screen.getByText('Push-ups'));
    
    // Set exercise details
    const setsInput = screen.getByLabelText('Sets');
    const repsInput = screen.getByLabelText('Reps');
    fireEvent.change(setsInput, { target: { value: '3' } });
    fireEvent.change(repsInput, { target: { value: '12' } });
    
    // Add the exercise
    fireEvent.click(screen.getByText('Add Exercise'));
    
    // Verify exercise was added
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('3 sets × 12 reps, 60s rest')).toBeInTheDocument();
    
    // Remove the exercise
    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);
    
    // Verify exercise was removed
    expect(screen.queryByText('3 sets × 12 reps, 60s rest')).not.toBeInTheDocument();
  });
}); 