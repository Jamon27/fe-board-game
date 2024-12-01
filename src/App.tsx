import React from 'react';
import './App.css';
import ErrorBoundary from './common/ErrorBoundary';
import Chessboard from './pages/chessboard/Chessboard';

function App() {
  return (
    <div className="App-wrapper">
      <h1>Knight Path Finder</h1>
      <ErrorBoundary>
        <Chessboard />
      </ErrorBoundary>
    </div>
  );
}

export default App;
