import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/knight path finder/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the Chessboard component', () => {
    render(<App />);
    const chessboardElement = screen.getByText(/start position/i); // Verify text from Chessboard
    expect(chessboardElement).toBeInTheDocument();
  });
});
