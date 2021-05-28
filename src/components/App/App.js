import React, { Component } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { List } from "../List/List";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import './App.css';

export default class App extends Component {
  state = {
    todos: [],
    todoText: ""
  };

  onChangeInput = e => {
    this.setState({ todoText: e.target.value });
  };

  onSubmitTodo = () => {
    this.setState(({ todos, todoText }) => ({
      todos: [...todos, { id: todos.length + 1, name: todoText, done: false , isEdit: false}],
      todoText: ""
     }));
  };

    onChangeBox = item => {
    this.setState(({ todos }) => ({
      todos: todos.map(todoitem =>
        todoitem.id === item.id ? { ...todoitem, done: !todoitem.done } : todoitem
      )
    }));
  };

  handleDel = item => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todoitem => todoitem.id !== item.id)
    }));
  };

  handleEdit = item => {
    this.setState(({ todos }) => ({
      todos: todos.map(todoitem =>
      todoitem.id === item.id
        ? {
            ...todoitem,
            isEdit: !todoitem.isEdit,
          }
        : todoitem
      )}))
  }

  render() {
    const { todos, todoText } = this.state;

    return (
      <>
        <h2>Todo</h2>
        <Input value={todoText} onChange={this.onChangeInput} className= {'inputBox'} /> 
        <div>
        
        </div>
        <Button onClick={this.onSubmitTodo} customClassName= {'submit'}><FontAwesomeIcon icon={faPlus} /></Button>
        <List
          list={todos}
          onChangeBox={this.onChangeBox}
          handleDel={this.handleDel}
          handleEdit={this.handleEdit}
        />
      </>
    );
  }
}
