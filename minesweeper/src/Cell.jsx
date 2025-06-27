import React, { useState } from "react";

function Cell() {
    const [opened, setOpened] = useState(false);

    const handleClick = () => {
        setOpened(true);
    };

  const cellStyle = {
    width: '30px',
    height: '30px',
    border: '1px solid #999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: opened ? '#ccc' : '#eee',
    cursor: 'pointer',
    userSelect: 'none',
  };

  
  return (
    <div style={cellStyle} onClick={handleClick}>
      {opened ? '💣' : ''}
    </div>
  );
}

export default Cell;