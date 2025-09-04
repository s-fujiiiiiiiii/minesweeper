import React from "react";

function Cell({ row, col, cellData, onClick, onRightClick }) {
  const style = {
    width: "40px",
    height: "40px",
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cellData.opened ? "#ddd" : "#999",
    cursor: "pointer",
    fontSize: "20px",
  };

  let content = "";
  if (cellData.opened) {
    if (cellData.hasMine) {
      content = "💣";
    } else if (cellData.neighborMines > 0) {
      content = cellData.neighborMines;
    }
  } else if (cellData.flagged) {
    content = "🚩";
  }

  return (
    <div
      style={style}
      onClick={onClick}
      onContextMenu={onRightClick} // 🚩 右クリック対応
    >
      {content}
    </div>
  );
}

export default Cell;
