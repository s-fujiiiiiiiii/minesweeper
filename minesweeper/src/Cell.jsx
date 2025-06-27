import React, { useState } from "react";

function Cell({ cellData, onClick }) {

  const cellStyle = {
    width: '30px',
    height: '30px',
    border: '1px solid #999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cellData.opened ? '#ccc' : '#eee',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '20px',
  };

  // 地雷があるセルで開いているなら💣マーク表示
  const content = cellData.opened ? (cellData.hasMine ? '💣' : '') : '';

  
  return (
    <div style={cellStyle} onClick={onClick}>
      {content}
    </div>
  );
}

export default Cell;