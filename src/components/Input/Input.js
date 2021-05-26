import React from "react";
import './Input.css';

export const Input = ({ value, onChange }) => (
  <input  className={"inputBox"} type="text" value={value} onChange={onChange} />
);
