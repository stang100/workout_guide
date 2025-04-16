import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Exercises from '../Exercises';

describe('Exercises Component', () => {
  test('renders exercise library title', () => {
    render(<Exercises />);
    expect(screen.getByText('Exercise Library')).toBeInTheDocument();
  });

  test('displays all exercise categories', () => {
    render(<Exercises />);
    const categories = ['All', 'Upper Body', 'Lower Body', 'Core'];
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test('filters exercises when category is selected', () => {
    render(<Exercises />);
    
    // Click on Core category
    fireEvent.click(screen.getByText('Core'));
    
    // Should show Planks (Core exercise)
    expect(screen.getByText('Planks')).toBeInTheDocument();
    
    // Should not show Push-ups (Upper Body exercise)
    expect(screen.queryByText('Push-ups')).not.toBeInTheDocument();
  });

  test('displays exercise details', () => {
    render(<Exercises />);
    
    // Exercise name
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    
    // Difficulty level
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    
    // Muscle groups
    expect(screen.getByText('Chest')).toBeInTheDocument();
    expect(screen.getByText('Shoulders')).toBeInTheDocument();
    
    // Form tips
    expect(screen.getByText('Keep your body in a straight line')).toBeInTheDocument();
  });
}); 