import React from 'react';
import './cell.css';

interface ICellProps {
  id: string;
  isHighlighted: boolean;
  color: string;
  onClick: (id: string) => void;
}

function Square(props: ICellProps) {
  const { id, isHighlighted, color, onClick } = props;
  return (
    <div
      className={`cell ${color} ${isHighlighted ? 'highlighted' : ''}`}
      onClick={() => onClick(id)}
    >
      {id}
    </div>
  );
}

export default Square;
