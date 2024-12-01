import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Board from './Board';

describe('Board Component', () => {
  test('renders a chessboard with 64 cells', () => {
    const { container } = render(
      <Board startPosition={null} endPosition={null} onCellClick={() => {}} />,
    );

    const cells = container.querySelectorAll('.cell');
    expect(cells).toHaveLength(64);
  });

  test('calls onCellClick with the correct cell ID when clicked', () => {
    const mockOnCellClick = jest.fn();

    render(
      <Board
        startPosition={null}
        endPosition={null}
        onCellClick={mockOnCellClick}
      />,
    );

    const cell = screen.getByText('a8'); // Example cell ID
    fireEvent.click(cell);

    expect(mockOnCellClick).toHaveBeenCalledWith('a8');
  });

  test('highlights start and end positions', () => {
    render(
      <Board startPosition="a1" endPosition="h8" onCellClick={() => {}} />,
    );

    expect(screen.getByText('a1').parentElement).toHaveClass('start');
    expect(screen.getByText('h8').parentElement).toHaveClass('end');
  });
});
