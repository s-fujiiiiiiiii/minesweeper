import React, { useState } from "react";
import Cell from "./Cell";

function Board({ rows, cols, mines }) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  // 初期盤面
  const [board, setBoard] = useState(() => {
    const newBoard = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({ opened: false, hasMine: false, neighborMines: 0, flagged: false }); // 🚩 flagged追加
      }
      newBoard.push(row);
    }
    return newBoard;
  });

  const [gameOver, setGameOver] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  // 地雷を配置
  function placeMines(board, safeRow, safeCol) {
    const newBoard = board.map(r => r.map(cell => ({ ...cell })));
    let minesPlaced = 0;

    while (minesPlaced < mines) {
      const randRow = Math.floor(Math.random() * rows);
      const randCol = Math.floor(Math.random() * cols);

      if (Math.abs(randRow - safeRow) <= 1 && Math.abs(randCol - safeCol) <= 1) continue;
      if (!newBoard[randRow][randCol].hasMine) {
        newBoard[randRow][randCol].hasMine = true;
        minesPlaced++;
      }
    }

    // 周囲の地雷数
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newBoard[r][c].hasMine) continue;
        let count = 0;
        directions.forEach(([dr, dc]) => {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (newBoard[nr][nc].hasMine) count++;
          }
        });
        newBoard[r][c].neighborMines = count;
      }
    }

    return newBoard;
  }

  // 左クリック（セルを開く）
  const handleClick = (row, col) => {
    setBoard(prevBoard => {
      let newBoard = prevBoard.map(r => r.map(cell => ({ ...cell })));

      if (firstClick) {
        newBoard = placeMines(newBoard, row, col);
        setFirstClick(false);
      }

      const cell = newBoard[row][col];
      if (cell.opened || cell.flagged || gameOver) return newBoard;

      if (cell.hasMine) {
        setGameOver(true);
        newBoard.forEach(r => r.forEach(c => { if (c.hasMine) c.opened = true; }));
      } else {
        const openCell = (r, c) => {
          if (r < 0 || r >= rows || c < 0 || c >= cols) return;
          const cur = newBoard[r][c];
          if (cur.opened || cur.flagged) return;

          cur.opened = true;
          if (cur.neighborMines === 0) {
            directions.forEach(([dr, dc]) => openCell(r + dr, c + dc));
          }
        };
        openCell(row, col);
      }
      return newBoard;
    });
  };

  // 右クリック（旗を立てる／外す）
  const handleRightClick = (e, row, col) => {
    e.preventDefault(); // 右クリックメニューを無効化
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(r => r.map(cell => ({ ...cell })));
      const cell = newBoard[row][col];
      if (!cell.opened) {
        cell.flagged = !cell.flagged; // 🚩 トグル
      }
      return newBoard;
    });
  };

  // フラッグの数を数える
    const flaggedCount = board.flat().filter(cell => cell.flagged).length;
    const remainingMines = mines - flaggedCount

  // CSS
  const boardStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 40px)`,
    margin: "20px auto",
  };

  return (
    <div>
      {/* 残り爆弾数表示 */}
      <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "20px" }}>
      🚩 {remainingMines}/{mines}
      </div>
    <div style={boardStyle}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell
            key={`${r}-${c}`}
            row={r}
            col={c}
            cellData={cell}
            onClick={() => handleClick(r, c)}
            onRightClick={(e) => handleRightClick(e, r, c)} // 🚩 追加
          />
        ))
      )}
    </div>
  </div>
  );
}

export default Board;
