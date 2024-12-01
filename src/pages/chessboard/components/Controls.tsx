import React from 'react';
import './Controls.css';

interface ControlsProps {
  startPosition: string | null;
  endPosition: string | null;
  shortestPath: string | null;
  loading: boolean;
  error: string | null;
  onFetchKnightPath: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  startPosition,
  endPosition,
  shortestPath,
  loading,
  error,
  onFetchKnightPath,
}) => {
  return (
    <div className="controls">
      <div className="controls-info">
        <p>
          <strong>Start Position:</strong>{' '}
          {startPosition || <span className="placeholder">Click to set</span>}
        </p>
        <p>
          <strong>End Position:</strong>{' '}
          {endPosition || <span className="placeholder">Click to set</span>}
        </p>
        <p>
          <strong>Shortest Path:</strong>{' '}
          {shortestPath || <span className="placeholder">Not found</span>}
        </p>
        {error && <p className="error">{error}</p>}
      </div>
      <button
        className="fetch-button"
        onClick={onFetchKnightPath}
        disabled={
          !startPosition ||
          !endPosition ||
          startPosition === endPosition ||
          loading
        }
      >
        {loading ? 'Loading...' : 'Fetch Knight Path'}
      </button>
    </div>
  );
};

export default Controls;
