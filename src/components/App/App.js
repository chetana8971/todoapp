import React, { Component } from "react";
import { List } from "../List/List";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import './App.css';
import { Checkbox } from "../Checkbox/Checkbox";
import classNames from 'classnames';


export default class App extends Component {
  state = {
    todos: [
    //   { id: 1, name: "Read book", done: true },
    //   { id: 2, name: "Write letter", done: false },
    //   { id: 3, name: "Edit cover", done: false }
    ],
    todoText: ""
  };

  onChangeInput = e => {
    this.setState({ todoText: e.target.value });
  };

  onSubmitTodo = () => {
    this.setState(({ todos, todoText }) => ({
      todos: [...todos, { id: todos.length + 1, name: todoText, done: false }],
      todoText: ""
    }));
  };

  onChangeBox = item => {
    this.setState(({ todos }) => ({
      todos: todos.map(el =>
        el.id === item.id ? { ...el, done: !el.done } : el
      )
    }));
  };

  handleDel = item => {
    this.setState(({ todos }) => ({
      todos: todos.filter(el => el.id !== item.id)
    }));
  };

  handleEdit = item => {
    this.setState(({ todos }) => ({
      todos: this.todos.map(el =>
      el.id === item.id
        ? {
            ...todos,
            isEdit: !todos.isEdit,
          }
        : todos
      )}))
  }

  render() {
    const { todos, todoText } = this.state;

    return (
      <>
        <h2>Todo</h2>
        <Input value={todoText} onChange={this.onChangeInput} className= {'inputBox'} /> 
        <Button onClick={this.onSubmitTodo} customClassName= {'submit'}>Add</Button>
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
