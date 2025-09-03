import React from "react";

function Cell({ cellData, onClick }) {
  let content = "";
  if (cellData.opened) {
    if (cellData.hasMine) {
      content = "💣";
    } else if (cellData.neighborMines > 0) {
      content = cellData.neighborMines;
    }
  }

  return (
    <div
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        fontSize: 20,
        textAlign: "center",
        border: "1px solid #999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: cellData.opened ? "#ddd" : "#eee",
        userSelect: "none",
      }}
    >
      {content}
    </div>
  );
}

export default Cell;
