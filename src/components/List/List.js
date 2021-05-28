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
       {console.log(item)}
        <Checkbox
          onClick={() => onChangeBox(item)}
          defaultChecked={item.done}
          customClassName={ classNames( "checkBox",{
          'hideContent': item.isEdit
          })} 
          />
        {" "}
        <div contentEditable = {item.isEdit ? 'true' : 'false'}  className="listText" style={{ textDecoration: item.done ? "line-through" : null }}> 
          {item.name}
        </div> 
      <Button onClick={() => handleEdit(item)} customClassName= {classNames('editButton',{'hideContent': item.done})}> {item.isEdit ?  "Submit" : "Edit"}
      </Button>
      <Button onClick={() => handleDel(item)} customClassName= {'removeButton'}>Remove</Button>
         </li>
    ))}
  </ul>
);

