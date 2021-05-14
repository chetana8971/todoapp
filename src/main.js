//@class Model, Manages the data of the application
class Model {
  constructor() {
    this.input = document.querySelector(".inputbox");
    this.todoList = [];
  }
  bindtodoListChanged(callback) {
    this.ontodoListChanged = callback;
  }

  //Initilize addNewTodo function here with new id.
  addNewTodo() {
    const uniqId = new Date().getTime();
    if (this.input.value !== "") {
      this.input.value;
      this.todoList.push({
        id: uniqId,
        value: this.input.value,
        isComplete: false,
        isEdit: false,
      });
      this.input.value = "";
    }
    this._commit(this.todoList);
  }
  _commit(todos) {
    this.ontodoListChanged(todos);
  }
  //Initilize editTodo Function here.
  editTodo(id) {
    this.todoList = this.todoList.map((todos) =>
      todos.id === id
        ? {
            ...todos,
            isEdit: !todos.isEdit,
          }
        : todos
    );
    this._commit(this.todoList);
  }

  //Initilize the removeTodo function where todos are removed from container.
  removeTodo = (id) => {
    this.todoList = this.todoList.filter((todos) => todos.id !== id);
    this._commit(this.todoList);
  };

  //Initilize CompleteTodo function.
  completeTodo = (id) => {
    this.todoList = this.todoList.map((todos) =>
      todos.id === id
        ? {
            ...todos,
            isComplete: !todos.isComplete,
          }
        : todos
    );
    this._commit(this.todoList);
  };
}

//@class View, Visual representation of the model.
class View {
  constructor() {
    this.input = document.createElement("input");
    this.input.classList.add(".itemInput");
    this.input.type = "text";
    this.addButton = document.querySelector(".addButton");

    this.container = document.querySelector(".container");
    this.todoList = document.createElement("ul", "todoList");
    this.todoList.classList.add("todoList");
    this.input.disabled = true;
    this.container.append(this.todoList);
  }

  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
    for (let i = 0; i < todos.length; i++) {
      this.createTodoItem(todos[i]);
    }
  }

  //TodoItem  is used to create todoItem in DOM.
  createTodoItem(todos) {
    const uniqId = todos.id;
    const isComplete = todos.isComplete;
    const isEdit = todos.isEdit;
    const inputText = document.createElement("div");
    inputText.setAttribute("contenteditable", "false");
    inputText.setAttribute("id", "inputbox" + uniqId);
    inputText.value = todos.value;
    inputText.classList.add("textContainer");
    inputText.innerHTML = todos.value;
    inputText.style.textDecoration = isComplete ? "line-through" : "none";

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("itemClass");
    itemContainer.setAttribute("id", "item" + uniqId);
    itemContainer.uniqId = uniqId;

    const editTodo = document.createElement("button");
    editTodo.setAttribute("id", "editTodo" + uniqId);
    editTodo.uniqId = uniqId;
    editTodo.innerHTML = "Edit";
    editTodo.classList.add("editTodoClass");

    const removeTodo = document.createElement("button");
    removeTodo.setAttribute("id", "removeTodo" + uniqId);
    removeTodo.uniqId = uniqId;
    removeTodo.innerHTML = "Remove";
    removeTodo.classList.add("removeTodoClass");

    const checkBox = document.createElement("input");
    checkBox.setAttribute("id", "checkBox" + uniqId);
    checkBox.uniqId = uniqId;
    checkBox.type = "checkBox";
    checkBox.classList.add("checkBoxClass");
    checkBox.checked = isComplete;

    //Here check condition of edit function, when we click on edit it enable us to edit inputbox & edit automatically change to submit at the same time
    //checkbox is disabled by using class hideContent.
    if (isEdit) {
      checkBox.classList.add("hideContent");
      editTodo.innerHTML = "Submit";
      inputText.contentEditable = "true";
    } else {
      editTodo.innerHTML = "Edit";
      checkBox.classList.remove("hideContent");
      inputText.contentEditable = "false";
    }

    //Here check condition of Complete Function describes when checkbox is checked the text in inputbox is striked & editTodo is hidden at the same time by
    // using class hideContent.
    if (isComplete) {
      editTodo.classList.add("hideContent");
    } else {
      editTodo.classList.remove("hideContent");
    }

    const li = document.createElement("list");
    li.id = "itemContainer" + uniqId;
    li.uniqId = todos.id;

    li.append(editTodo);
    li.append(removeTodo);
    li.append(checkBox);
    li.append(inputText);
    this.todoList.append(li);
  }

  bindaddNewTodo(handler) {
    this.addButton.addEventListener("click", (event) => {
      handler();
    });
  }

  bindeditTodo(handler) {
    this.todoList.addEventListener("click", (event) => {
      if (event.target.className == "editTodoClass") {
        const uniqId = parseInt(event.target.uniqId);
        handler(uniqId);
      }
    });
  }

  bindremoveTodo(handler) {
    this.todoList.addEventListener("click", (event) => {
      if (event.target.className == "removeTodoClass") {
        const uniqId = parseInt(event.target.uniqId);
        handler(uniqId);
      }
    });
  }

  bindcompleteTodo(handler) {
    this.todoList.addEventListener("change", (event) => {
      if (event.target.className == "checkBoxClass") {
        const uniqId = parseInt(event.target.uniqId);
        handler(uniqId);
      }
    });
  }
}

//@class Controller, Links the user input and the view output.
//@param model, @param view
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Explicit this binding
    this.model.bindtodoListChanged(this.ontodoListChanged);
    this.view.bindaddNewTodo(this.handleaddNewTodo);
    this.view.bindeditTodo(this.handleeditTodo);
    this.view.bindremoveTodo(this.handleremoveTodo);
    this.view.bindcompleteTodo(this.handlecompleteTodo);

    // Display initial todos
    this.ontodoListChanged(this.model.todoList);
  }
  ontodoListChanged = (todos) => {
    this.view.displayTodos(todos);
  };

  handleaddNewTodo = () => {
    this.model.addNewTodo();
  };

  handleeditTodo = (uniqId) => {
    this.model.editTodo(uniqId);
  };

  handleremoveTodo = (uniqId) => {
    this.model.removeTodo(uniqId);
  };

  handlecompleteTodo = (uniqId) => {
    this.model.completeTodo(uniqId);
  };
}
const app = new Controller(new Model(), new View());
