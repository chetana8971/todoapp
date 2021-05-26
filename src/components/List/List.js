import React from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Button/Button";
import './List.css';
import classNames from 'classnames';


export const List = ({ list, onChangeBox, handleDel, handleEdit }) => (
  <ul>
    {list.map(item => (
      <li
        key={item.id}
        >
       
        <Checkbox
        ClassName="checkBox"
          onClick={() => onChangeBox(item)}
          defaultChecked={item.done}
         
          className={ Checkbox({
            'hideContent': 'isEdit'
          })} />
        {" "}
        <div contentEditable = {item.done ? 'true' : 'false'} className="listText" style={{ textDecoration: item.done ? "line-through" : null }}> 
          {item.name}
        </div> 
      <Button onClick={() => handleEdit(item)} customClassName= {'editButton'}> {isEdit ?  "Submit" : "Edit"} </Button>
        
      <Button onClick={() => handleDel(item)} customClassName= {'removeButton'}>Remove</Button>
         </li>
    ))}
  </ul>
);

