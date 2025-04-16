import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Wrap component with Router for testing
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar Component', () => {
  test('renders app title', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText('Workout Guide')).toBeInTheDocument();
  });

  test('displays all navigation links', () => {
    renderWithRouter(<Navbar />);
    const links = ['Home', 'Exercises', 'Workout Builder', 'Progress', 'Form Check'];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('shows menu icon on mobile', () => {
    // Mock useMediaQuery to simulate mobile view
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true);
    renderWithRouter(<Navbar />);
    expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
  });

  test('opens drawer when menu icon is clicked', () => {
    // Mock useMediaQuery to simulate mobile view
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true);
    renderWithRouter(<Navbar />);
    
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);
    
    // Check if drawer content is visible
    const links = ['Home', 'Exercises', 'Workout Builder', 'Progress', 'Form Check'];
    links.forEach((link) => {
      expect(screen.getAllByText(link).length).toBeGreaterThan(0);
    });
  });

  test('closes drawer when a link is clicked', () => {
    // Mock useMediaQuery to simulate mobile view
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true);
    renderWithRouter(<Navbar />);
    
    // Open drawer
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);
    
    // Click a link
    fireEvent.click(screen.getAllByText('Exercises')[0]);
    
    // Check if drawer is closed (link should only appear once now)
    expect(screen.getAllByText('Exercises').length).toBe(1);
  });
}); 