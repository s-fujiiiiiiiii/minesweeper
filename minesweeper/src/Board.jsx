import React  from "react";
import Cell from './Cell';

function Board({ rows, cols, mines}) {
  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 30px)`,
    margin: '0 auto',
  };

  return (
    <div style={boardStyle}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <Cell key={index} />
      ))}
    </div>
  );
}

export default Board;