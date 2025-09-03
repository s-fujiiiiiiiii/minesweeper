import React, { useState } from "react";
import Board from "./Board";

function App() {
  const [settings, setSettings] = useState(null);

  const difficulties = {
    easy: { rows: 5, cols: 5, mines: 5 },
    medium: { rows: 10, cols: 10, mines: 20 },
    hard: { rows: 15, cols: 15, mines: 40 },
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Minesweeper</h1>

      {!settings && (
        <div>
          <button onClick={() => setSettings(difficulties.easy)}>初級 (5x5)</button>
          <button onClick={() => setSettings(difficulties.medium)}>中級 (10x10)</button>
          <button onClick={() => setSettings(difficulties.hard)}>上級 (15x15)</button>
        </div>
      )}

      {settings && (
        <Board rows={settings.rows} cols={settings.cols} mines={settings.mines} />
      )}
    </div>
  );
}

export default App;
