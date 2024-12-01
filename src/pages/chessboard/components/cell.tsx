import React from 'react';
import './Cell.css';

interface CellProps {
  id: string;
  color: string;
  isStart?: boolean;
  isEnd?: boolean;
  onClick?: (id: string) => void;
}

const Cell: React.FC<CellProps> = (props) => {
  const { id, color, isStart, isEnd, onClick } = props;
  return (
    <div
      className={`cell ${color} ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''}`}
      onClick={() => !isStart && onClick && onClick(id)}
    >
      <div className="cell-id">{id}</div>
      <div></div>
      {isStart ? '♘' : isEnd ? '♘' : ''}
    </div>
  );
};

export default React.memo(Cell);
