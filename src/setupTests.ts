// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom';

// Mock the Material-UI components that might cause issues in tests
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: () => ({
    breakpoints: {
      down: () => false,
    },
  }),
}));

// Mock the react-webcam component
jest.mock('react-webcam', () => {
  return function DummyWebcam(): JSX.Element {
    return React.createElement('video');
  };
});
