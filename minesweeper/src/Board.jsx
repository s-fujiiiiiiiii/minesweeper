import React, { useState } from "react";
import Cell from "./Cell";

function Board({ rows, cols, mines }) {
  // 8方向
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  // 盤面（最初は爆弾なし）
  const [board, setBoard] = useState(() => {
    const newBoard = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({ opened: false, hasMine: false, neighborMines: 0 });
      }
      newBoard.push(row);
    }
    return newBoard;
  });

  // ゲーム状態
  const [gameOver, setGameOver] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  // 地雷を配置する関数
  function placeMines(board, safeRow, safeCol) {
    const newBoard = board.map(r => r.map(cell => ({ ...cell })));
    let minesPlaced = 0;

    while (minesPlaced < mines) {
      const randRow = Math.floor(Math.random() * rows);
      const randCol = Math.floor(Math.random() * cols);

      // 最初にクリックしたセルとその周囲には爆弾を置かない
      if (Math.abs(randRow - safeRow) <= 1 && Math.abs(randCol - safeCol) <= 1) {
        continue;
      }

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
  }

  // セルを開く処理
  const handleClick = (row, col) => {
    setBoard(prevBoard => {
      let newBoard = prevBoard.map(r => r.map(cell => ({ ...cell })));

      // 最初のクリックで地雷を配置
      if (firstClick) {
        newBoard = placeMines(newBoard, row, col);
        setFirstClick(false);
      }

      const cell = newBoard[row][col];
      if (cell.opened || gameOver) return newBoard;

      if (cell.hasMine) {
        // 爆弾クリック → ゲームオーバー
        setGameOver(true);
        newBoard.forEach(r => r.forEach(c => {
          if (c.hasMine) c.opened = true;
        }));
      } else {
        // 空白セルは再帰的に展開
        const openCell = (r, c) => {
          if (r < 0 || r >= rows || c < 0 || c >= cols) return;
          const cur = newBoard[r][c];
          if (cur.opened) return;

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
