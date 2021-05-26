import React from "react";

export const Checkbox = ({ onClick, defaultChecked }) => (
  <input className="checkBox" type="checkbox" onClick={onClick} defaultChecked={defaultChecked} />
);
