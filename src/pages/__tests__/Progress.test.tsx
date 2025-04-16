import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Progress from '../Progress';

describe('Progress Component', () => {
  test('renders progress page title', () => {
    render(<Progress />);
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });

  test('displays progress statistics', () => {
    render(<Progress />);
    expect(screen.getByText('Workouts Completed')).toBeInTheDocument();
    expect(screen.getByText('Total Minutes')).toBeInTheDocument();
    expect(screen.getByText('Current Streak')).toBeInTheDocument();
    expect(screen.getByText('Monthly Goal')).toBeInTheDocument();
  });

  test('shows all tabs', () => {
    render(<Progress />);
    const tabs = ['Workout History', 'Achievements', 'Statistics'];
    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test('switches between tabs', () => {
    render(<Progress />);
    
    // Click Achievements tab
    fireEvent.click(screen.getByText('Achievements'));
    expect(screen.getByText('First Workout')).toBeInTheDocument();
    expect(screen.getByText('3-Day Streak')).toBeInTheDocument();
    
    // Click Statistics tab
    fireEvent.click(screen.getByText('Statistics'));
    expect(screen.getByText(/Coming soon!/)).toBeInTheDocument();
    
    // Click back to Workout History tab
    fireEvent.click(screen.getByText('Workout History'));
    expect(screen.getByText('Full Body Strength')).toBeInTheDocument();
  });

  test('displays workout history details', () => {
    render(<Progress />);
    
    // Check workout details
    expect(screen.getByText('Full Body Strength - 2024-04-15')).toBeInTheDocument();
    expect(screen.getByText('Duration: 45 minutes')).toBeInTheDocument();
    
    // Check exercise details
    expect(screen.getByText(/Push-ups: 3 sets × 12/)).toBeInTheDocument();
    expect(screen.getByText(/Squats: 4 sets × 15/)).toBeInTheDocument();
  });
}); 