import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormCheck from '../FormCheck';

// Mock the Webcam component
jest.mock('react-webcam', () => {
  return function DummyWebcam(props: any) {
    return <video data-testid="webcam" {...props} />;
  };
});

describe('FormCheck Component', () => {
  test('renders form check title', () => {
    render(<FormCheck />);
    expect(screen.getByText('Form Check')).toBeInTheDocument();
  });

  test('displays exercise selection dropdown', () => {
    render(<FormCheck />);
    expect(screen.getByLabelText('Select Exercise')).toBeInTheDocument();
  });

  test('shows webcam component', () => {
    render(<FormCheck />);
    expect(screen.getByTestId('webcam')).toBeInTheDocument();
  });

  test('start button is disabled when no exercise is selected', () => {
    render(<FormCheck />);
    const startButton = screen.getByText('Start Form Check');
    expect(startButton).toBeDisabled();
  });

  test('enables start button after selecting exercise', () => {
    render(<FormCheck />);
    
    // Select an exercise
    const select = screen.getByLabelText('Select Exercise');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Push-ups'));
    
    const startButton = screen.getByText('Start Form Check');
    expect(startButton).not.toBeDisabled();
  });

  test('shows recording indicator when recording starts', () => {
    render(<FormCheck />);
    
    // Select an exercise
    const select = screen.getByLabelText('Select Exercise');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Push-ups'));
    
    // Start recording
    const startButton = screen.getByText('Start Form Check');
    fireEvent.click(startButton);
    
    // Check if button text changed
    expect(screen.getByText('Stop Recording')).toBeInTheDocument();
  });

  test('shows feedback after recording stops', async () => {
    jest.useFakeTimers();
    render(<FormCheck />);
    
    // Select an exercise
    const select = screen.getByLabelText('Select Exercise');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Push-ups'));
    
    // Start and stop recording
    const startButton = screen.getByText('Start Form Check');
    fireEvent.click(startButton);
    
    // Fast-forward 5 seconds
    jest.advanceTimersByTime(5000);
    
    // Check if feedback is shown
    expect(screen.getByText(/Your form looks good!/)).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('displays instructions', () => {
    render(<FormCheck />);
    expect(screen.getByText('How to use Form Check')).toBeInTheDocument();
    expect(screen.getByText('1. Select the exercise you want to perform')).toBeInTheDocument();
    expect(screen.getByText('2. Position yourself so your full body is visible in the camera')).toBeInTheDocument();
    expect(screen.getByText('3. Click "Start Form Check" and perform the exercise')).toBeInTheDocument();
    expect(screen.getByText('4. Our AI will analyze your form and provide real-time feedback')).toBeInTheDocument();
  });
}); 