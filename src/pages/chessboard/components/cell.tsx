import React from 'react';
import './cell.css';
import { classNameBuilder } from '../../../common/classNameUtils';

interface CellProps {
  id: string;
  color: string;
  isStart?: boolean;
  isEnd?: boolean;
  onClick?: (id: string) => void;
}

const Cell: React.FC<CellProps> = (props) => {
  const { id, color, isStart, isEnd, onClick } = props;
  const className = classNameBuilder(
    'cell',
    color,
    isStart && 'start',
    isEnd && 'end',
  );

  return (
    <div
      className={className}
      onClick={() => !isStart && onClick && onClick(id)}
    >
      <div className="cell-id">{id}</div>
      <div></div>
      {isStart ? '♘' : isEnd ? '♘' : ''}
    </div>
  );
};

export default React.memo(Cell);
