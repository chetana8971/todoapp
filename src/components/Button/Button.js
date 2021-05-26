import React from "react";

export const Button = ({ onClick, children, customClassName}) => (
  <button className={customClassName} type="button" onClick={onClick}>
    {children}
  </button>

  
);

