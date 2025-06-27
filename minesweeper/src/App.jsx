import React from 'react';
import Board from './Board';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Minesweeper</h1>
      <Board rows={10} cols={10} mines={10} />
    </div>
  );
}

export default App;
