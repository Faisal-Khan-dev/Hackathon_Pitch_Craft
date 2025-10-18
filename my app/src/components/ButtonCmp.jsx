import React from 'react'

const ButtonCmp = ({ title, className, onClick }) => {
  // console.log("onClick", onClick);
  return (
    <button onClick={onClick} className={className}>
      {title || "Button"}
    </button>
  );
};

export default ButtonCmp;
