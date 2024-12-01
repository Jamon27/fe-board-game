import React, { useState, useMemo, useCallback } from 'react';

import ChessService from './services/chessService';
import Controls from './components/controls';
import Board from './components/board';

const Chessboard: React.FC = () => {
  const [state, setState] = useState({
    startPosition: null as string | null,
    endPosition: null as string | null,
    shortestPath: null as string | null,
    error: null as string | null,
    loading: false,
  });

  const chessService = useMemo(() => ChessService.getInstance(), []);

  const handleCellClick = useCallback((cellId: string) => {
    setState((prevState) => {
      if (!prevState.startPosition) {
        return { ...prevState, startPosition: cellId };
      }
      if (!prevState.endPosition) {
        return { ...prevState, endPosition: cellId };
      }
      return { ...prevState, startPosition: cellId, endPosition: null };
    });
  }, []);

  const fetchKnightPath = async () => {
    if (state.startPosition && state.endPosition) {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      try {
        const response = await chessService.getKnightPaths(
          state.startPosition,
          state.endPosition,
          3,
        );

        if (!response.ok) {
          const errResponse = await response.json();
          throw new Error(errResponse.message);
        }

        const result = await response.json();
        setState((prevState) => ({
          ...prevState,
          shortestPath: result?.shortestPaths[0] || null,
          loading: false,
        }));
      } catch (error) {
        console.log(error);
        setState((prevState) => ({
          ...prevState,
          shortestPath: null,
          error: (error as Error).message,
          loading: false,
        }));
      }
    }
  };

  return (
    <div>
      <Controls
        startPosition={state.startPosition}
        endPosition={state.endPosition}
        shortestPath={state.shortestPath}
        loading={state.loading}
        error={state.error}
        onFetchKnightPath={fetchKnightPath}
      />
      <Board
        startPosition={state.startPosition}
        endPosition={state.endPosition}
        onCellClick={handleCellClick}
      />
    </div>
  );
};

export default Chessboard;
