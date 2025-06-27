import React from 'react';
import Board from './Board';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Minesweeper</h1>
      <Board rows={9} cols={9} mines={10} />
    </div>
  );
}

export default App;
