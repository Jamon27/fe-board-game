import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cell from './Cell';

describe('Cell Component', () => {
  test('renders correctly with the given props', () => {
    render(<Cell id="a1" color="light" />);

    const cellElement = screen.getByText('a1');
    expect(cellElement).toBeInTheDocument();
    expect(cellElement.parentElement).toHaveClass('cell light');
  });

  test('applies the "start" class and renders knight icon for start cells', () => {
    render(<Cell id="a1" color="light" isStart />);

    const cellElement = screen.getByText('♘');
    expect(cellElement).toBeInTheDocument();
    expect(cellElement).toHaveClass('cell light start');
  });

  test('applies the "end" class and renders knight icon for end cells', () => {
    render(<Cell id="a8" color="dark" isEnd />);

    const cellElement = screen.getByText('♘');
    expect(cellElement).toBeInTheDocument();
    expect(cellElement).toHaveClass('cell dark end');
  });

  test('calls onClick handler when clicked, unless it is a start cell', () => {
    const mockOnClick = jest.fn();

    // Render a non-start cell
    render(<Cell id="b2" color="light" onClick={mockOnClick} />);

    const cellElement = screen.getByText('b2');
    fireEvent.click(cellElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('b2');

    // Render a start cell
    mockOnClick.mockClear();
    render(<Cell id="a1" color="dark" isStart onClick={mockOnClick} />);

    const startCell = screen.getByText('a1');
    fireEvent.click(startCell);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('does not throw an error if onClick is not provided', () => {
    render(<Cell id="c3" color="dark" />);

    const cellElement = screen.getByText('c3');
    fireEvent.click(cellElement); // Should not throw any errors
  });
});
