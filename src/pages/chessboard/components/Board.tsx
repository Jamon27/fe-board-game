import React, { useMemo } from 'react';
import './Board.css';
import Cell from './Cell';

interface BoardProps {
  startPosition: string | null;
  endPosition: string | null;
  onCellClick: (cellId: string) => void;
}

const Board: React.FC<BoardProps> = ({
  startPosition,
  endPosition,
  onCellClick,
}) => {
  const board = useMemo(() => {
    const cells = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cellId = `${String.fromCharCode(97 + col)}${8 - row}`;
        const color = (row + col) % 2 === 0 ? 'light' : 'dark';

        cells.push(
          <Cell
            key={cellId}
            id={cellId}
            color={color}
            isStart={cellId === startPosition}
            isEnd={cellId === endPosition}
            onClick={onCellClick}
          />,
        );
      }
    }
    return cells;
  }, [startPosition, endPosition, onCellClick]);

  return <div className="chessboard">{board}</div>;
};

export default Board;
