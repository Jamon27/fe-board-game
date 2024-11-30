import React, { useState } from 'react';
import './App.css';
import Chessboard from './pages/chessboard/chessboard';
import ErrorBoundary from './common/ErrorBoundary';

function App() {
  return (
    <div>
      <h1>Knight Path Finder</h1>
      <ErrorBoundary>
        <Chessboard />
      </ErrorBoundary>
    </div>
  );
}

export default App;
