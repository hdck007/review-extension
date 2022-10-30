import React from 'react';

export default function MarkerSidebarElement({ comment, selector }) {
  const handleClick = () => {
    const node = document.querySelector(selector);
    node.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100%',
        padding: '10px',
        border: '1px solid black',
        borderRadius: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
      }}
    >
      {comment}
    </div>
  );
}
