import React, { useState } from 'react';

import './chessboard.css';
import Cell from './components/cell';

function Chessboard() {
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);

  const handleCellClick = (cellId: string) => {
    throw new Error();

    if (!start) {
      setStart(cellId);
    } else if (!end) {
      setEnd(cellId);
    } else {
      setStart(cellId); // Reset positions
      setEnd(null);
    }
  };

  const createBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cellId = `${String.fromCharCode(97 + col)}${8 - row}`; // e.g., "a8", "b1"
        const color = (row + col) % 2 === 0 ? 'light' : 'dark';

        board.push(
          <Cell
            key={cellId}
            id={cellId}
            color={color}
            isHighlighted={false}
            onClick={handleCellClick}
          />,
        );
      }
    }
    return board;
  };

  return (
    <div>
      <h2>Chessboard</h2>
      <p>Start Position: {start || 'Click to set'}</p>
      <p>End Position: {end || 'Click to set'}</p>
      <div className="chessboard">{createBoard()}</div>
    </div>
  );
}

export default Chessboard;
