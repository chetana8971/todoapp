import React from "react";

export const Checkbox = ({ onClick, defaultChecked , customClassName}) => (
  <input className={customClassName} type="checkbox" onClick={onClick} defaultChecked={defaultChecked} />
);
