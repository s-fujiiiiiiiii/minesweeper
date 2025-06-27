import React, { useState } from "react";
import Cell from './Cell';


function Board({ rows, cols, mines }) {
  // 盤面の初期化
  const [board, setBoard] = useState(() => {
    const newBoard = [];
    for (let r = 0; r < rows; r++) {
      const row = []
      for (let c = 0; c < cols; c++) {
        row.push({ opened: false, hasMine: false });
      }
      newBoard.push(row);
    }

    // 地雷ランダム配置
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const randRow = Math.floor(Math.random() * rows);
      const randCol = Math.floor(Math.random() * cols);
      if (!newBoard[randRow][randCol].hasMine) {
        newBoard[randRow][randCol].hasMine =true;
        minesPlaced++;
      }
    }
    return newBoard;
  });

  // クリックでセルを開く
  const handleClick = (row, col) => {
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(r => r.map(cell => ({ ...cell })));
      newBoard[row][col].opened = true;
      return newBoard;
    })
  }

  // 盤面css
  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 30px)`,
    margin: '0 auto',
  };

  return (
    <div style={boardStyle}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell key={`${r}-${c}`} row={r} col={c} cellData={cell} onClick={() => handleClick(r, c)} />
        ))
      )}
    </div>
  );
}

export default Board;