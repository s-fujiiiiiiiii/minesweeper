import React, { useState } from "react";
import Cell from "./Cell";

function Board({ rows, cols, mines }) {
  // 8方向
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  // 盤面初期化
  const [board, setBoard] = useState(() => {
    const newBoard = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({ opened: false, hasMine: false, neighborMines: 0 });
      }
      newBoard.push(row);
    }

    // 地雷ランダム配置
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const randRow = Math.floor(Math.random() * rows);
      const randCol = Math.floor(Math.random() * cols);
      if (!newBoard[randRow][randCol].hasMine) {
        newBoard[randRow][randCol].hasMine = true;
        minesPlaced++;
      }
    }

    // 周囲の地雷数を計算
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newBoard[r][c].hasMine) continue;
        let count = 0;
        directions.forEach(([dr, dc]) => {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (newBoard[nr][nc].hasMine) count++;
          }
        });
        newBoard[r][c].neighborMines = count;
      }
    }

    return newBoard;
  });

  // セルを開く（再帰で空白マスも開く）
  const handleClick = (row, col) => {
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(r => r.map(cell => ({ ...cell })));

      const openCell = (r, c) => {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        const cell = newBoard[r][c];
        if (cell.opened) return;

        cell.opened = true;

        if (!cell.hasMine && cell.neighborMines === 0) {
          directions.forEach(([dr, dc]) => openCell(r + dr, c + dc));
        }
      };

      openCell(row, col);

      return newBoard;
    });
  };

  // 盤面CSS
  const boardStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 40px)`,
    margin: "20px auto",
  };

  return (
    <div style={boardStyle}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell
            key={`${r}-${c}`}
            row={r}
            col={c}
            cellData={cell}
            onClick={() => handleClick(r, c)}
          />
        ))
      )}
    </div>
  );
}

export default Board;
