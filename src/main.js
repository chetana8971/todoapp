class Model {
  constructor() {
    this.input = document.querySelector(".inputbox");
    this.todoList = [];
  }
  bindtodoListChanged(callback) {
    this.ontodoListChanged = callback;
  }

  addNewTodo() {
    const uniqid = new Date().getTime();
    if (this.input.value !== "") {
      this.input.value;
      this.todoList.push({ uniqid, value: this.input.value });
      console.log(this.todoList);
      this.input.value = "";
    }
    this._commit(this.todoList);
  }
  _commit(todos) {
    this.ontodoListChanged(todos);
  }

  editButton(uniqid, _temporaryTodoText) {
    const input = document.getElementById("inputbox" + uniqid);
    const editButton = document.getElementById("editButton" + uniqid);
    const checkBox = document.getElementById("checkBox" + uniqid);

    if (input.contentEditable == "false") {
      checkBox.classList.add("hideContent");
      editButton.innerHTML = "Submit";
      input.contentEditable = "true";
    } else {
      editButton.innerHTML = "Edit";
      checkBox.classList.remove("hideContent");

      input.contentEditable = "false";
    }
  }

  removeButton = (uniqid) => {
    console.log(uniqid);
    this.todoList = this.todoList.filter((todos) => todos.uniqid !== uniqid);
    this._commit(this.todoList);
  };

  completeButton = (uniqid) => {
    console.log(uniqid);
    const input = document.getElementById("inputbox" + uniqid);
    const editButton = document.getElementById("editButton" + uniqid);
    const checkBox = document.getElementById("checkBox" + uniqid);

    if (checkBox.checked) {
      editButton.classList.add("hideContent");
    } else {
      editButton.classList.remove("hideContent");
    }
    input.style.textDecoration = checkBox.checked ? "line-through" : "none";
  };
}

class View {
  constructor() {
    this.input = document.createElement("input");
    this.input.classList.add(".itemInput");
    this.input.type = "text";
    this.addButton = document.querySelector(".addButton");

    this.container = document.querySelector(".container");
    this.todoList = document.createElement("ul", "todoList");
    this.todoList.classList.add("todoList");
    this.input.name = "todos";
    this.input.disabled = true;
    this.container.append(this.todoList);

    this._temporaryTodoText = "";
    this._initLocalListeners();
  }

  displayTodos(todos) {
    console.log(todos);
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
    for (let i = 0; i < todos.length; i++) {
      this.createDiv(todos[i]);
    }
  }

  createDiv(todos) {
    console.log(todos);
    const uniqid = todos.uniqid;
    const inputbutton = document.createElement("div");
    inputbutton.setAttribute("contenteditable", "false");
    inputbutton.setAttribute("id", "inputbox" + uniqid);
    inputbutton.value = todos.value;
    inputbutton.classList.add("textarea");
    inputbutton.innerHTML = todos.value;

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item");
    itemContainer.setAttribute("id", "item" + uniqid);
    itemContainer.uniqid = uniqid;

    const editButton = document.createElement("button");
    editButton.setAttribute("id", "editButton" + uniqid);
    editButton.uniqid = uniqid;
    editButton.innerHTML = "Edit";
    editButton.classList.add("editButton");

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", "removeButton" + uniqid);
    removeButton.uniqid = uniqid;
    removeButton.innerHTML = "Remove";
    removeButton.classList.add("removeButton");

    const checkBox = document.createElement("input");
    checkBox.setAttribute("id", "checkBox" + uniqid);
    checkBox.uniqid = uniqid;
    checkBox.type = "checkBox";
    checkBox.classList.add("checkBox");

    const li = document.createElement("li");
    li.id = "itemContainer" + uniqid;
    li.uniqid = todos.uniqid;

    li.append(editButton);
    li.append(removeButton);
    li.append(checkBox);
    li.append(inputbutton);
    this.todoList.append(li);
  }

  _initLocalListeners() {
    this.todoList.addEventListener("click", (event) => {
      if (event.target.className == "editButton") {
        this._temporaryTodoText = event.target.innerText;
      }
    });
  }

  bindaddNewTodo(handler) {
    this.addButton.addEventListener("click", (event) => {
      handler();
    });
  }

  bindeditButton(handler) {
    this.todoList.addEventListener("click", (event) => {
      console.log("this.editButton");
      if (this._temporaryTodoText) {
        const uniqid = parseInt(event.target.uniqid);
        handler(uniqid, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }

  bindremoveButton(handler) {
    this.todoList.addEventListener("click", (event) => {
      console.log("this.removeButton");
      if (event.target.className == "removeButton") {
        const uniqid = parseInt(event.target.uniqid);
        handler(uniqid);
      }
    });
  }

  bindcompleteButton(handler) {
    this.todoList.addEventListener("change", (event) => {
      console.log("this.completeButton");
      if (event.target.className == "checkBox") {
        const uniqid = parseInt(event.target.uniqid);
        handler(uniqid);
      }
    });
  }
}
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindtodoListChanged(this.ontodoListChanged);
    this.view.bindaddNewTodo(this.handleaddNewTodo);
    this.view.bindeditButton(this.handleeditButton);
    this.view.bindremoveButton(this.handleremoveButton);
    this.view.bindcompleteButton(this.handlecompleteButton);

    // Display initial todos
    this.ontodoListChanged(this.model.todoList);
  }
  ontodoListChanged = (todos) => {
    this.view.displayTodos(todos);
  };

  handleaddNewTodo = () => {
    this.model.addNewTodo();
  };

  handleeditButton = (_temporaryTodoText) => {
    this.model.editButton(_temporaryTodoText);
  };

  handleremoveButton = (uniqid) => {
    this.model.removeButton(uniqid);
  };

  handlecompleteButton = (uniqid) => {
    this.model.completeButton(uniqid);
  };
}
const app = new Controller(new Model(), new View());
