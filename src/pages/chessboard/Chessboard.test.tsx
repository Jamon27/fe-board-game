import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chessboard from './Chessboard';
import ChessService from './services/ChessService';

jest.spyOn(ChessService.prototype, 'getKnightPaths').mockImplementation();

const mockChessService = ChessService.getInstance();

describe('Chessboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls fetchKnightPath and handles success', async () => {
    (ChessService.prototype.getKnightPaths as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        shortestPaths: ['a1', 'b2', 'c3'],
      }),
    });

    render(<Chessboard />);
    const fetchButton = screen.getByText(/fetch knight path/i);
    expect(fetchButton).toBeDisabled();

    // Simulate clicking cells to set start and end positions
    const cellA1 = screen.getByText('a1').parentElement!;
    const cellB2 = screen.getByText('b2').parentElement!;

    fireEvent.click(cellA1);
    expect(fetchButton).toBeDisabled();

    fireEvent.click(cellB2);
    expect(fetchButton).toBeEnabled();

    await fireEvent.click(fetchButton);

    // Verify that ChessService.getKnightPaths was called correctly
    expect(mockChessService.getKnightPaths).toHaveBeenCalledTimes(1);
    expect(mockChessService.getKnightPaths).toHaveBeenCalledWith('a1', 'b2', 3);
  });
});
