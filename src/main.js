//EventListeners for edit,remove,complete functions.
class EventListener {
  constructor() {
    document.addEventListener(
      "click",
      (e) => {
        switch (e.target.classList[0]) {
          case "editTodoClass":
            this.edit(e);
            break;
          case "removeTodoClass":
            this.remove(e);
            break;
          case "checkBoxClass":
            this.complete(e);
            break;
        }
      },
      false
    );
  }
  // Initialize the edit function, when we click on edit it enables to edit inputbox & edit is automatically change to submit at the same time checkbox
  // is disabled by using class hideContent.
  edit = (e) => {
    const uniqId = e.target.uniqId;
    const input = document.getElementById("inputbox" + uniqId);
    const checkBox = document.getElementById("checkBox" + uniqId);
    const editTodo = document.getElementById("editTodo" + uniqId);

    if (input.contentEditable == "false") {
      checkBox.classList.add("hideContent");
      editTodo.innerHTML = "Submit";
      input.contentEditable = "true";
    } else {
      editTodo.innerHTML = "Edit";
      checkBox.classList.remove("hideContent");
      input.contentEditable = "false";
    }
  };
  //Initilize the remove function where todos are removed from container
  remove = (e) => {
    const container = document.querySelector(".container");
    const uniqId = e.target.uniqId;
    const itemContainer = document.getElementById("item" + uniqId);
    container.removeChild(itemContainer);
  };

  //Complete Function describes when checkbox is checked the text in inputbox is striked & edit is hidden at the same time by using class hideContent.
  complete = (e) => {
    const uniqId = e.target.uniqId;
    const input = document.getElementById("inputbox" + uniqId);
    const editTodo = document.getElementById("editTodo" + uniqId);
    const checkBox = document.getElementById("checkBox" + uniqId);
    if (checkBox.checked) {
      editTodo.classList.add("hideContent");
    } else {
      editTodo.classList.remove("hideContent");
    }
    input.style.textDecoration = checkBox.checked ? "line-through" : "none";
  };
}
//TodoItem class is used to create todoItem in DOM
class TodoItem {
  constructor(textInput) {
    const uniqId = new Date().getTime();
    const container = document.querySelector(".container");
    this.input = document.createElement("div");
    this.input.setAttribute("contenteditable", "false");
    this.input.setAttribute("id", "inputbox" + uniqId);
    this.input.setAttribute("disabled", "true");

    this.input.innerHTML = textInput;
    this.input.classList.add("textContainer");

    this.itemContainer = document.createElement("div");
    this.itemContainer.classList.add("itemClass");
    this.itemContainer.setAttribute("id", "item" + uniqId);
    this.itemContainer.uniqId = uniqId;

    this.editTodo = document.createElement("button");
    this.editTodo.setAttribute("id", "editTodo" + uniqId);
    this.editTodo.uniqId = uniqId;
    this.editTodo.innerHTML = "Edit";
    this.editTodo.classList.add("editTodoClass");

    this.removeTodo = document.createElement("button");
    this.removeTodo.setAttribute("id", "removeTodo" + uniqId);
    this.removeTodo.uniqId = uniqId;
    this.removeTodo.innerHTML = "Remove";
    this.removeTodo.classList.add("removeTodoClass");

    this.checkBox = document.createElement("input");
    this.checkBox.setAttribute("id", "checkBox" + uniqId);
    this.checkBox.uniqId = uniqId;
    this.checkBox.type = "checkbox";
    this.checkBox.classList.add("checkBoxClass");

    this.itemContainer.appendChild(this.checkBox);
    this.itemContainer.appendChild(this.input);
    this.itemContainer.appendChild(this.editTodo);
    this.itemContainer.appendChild(this.removeTodo);
    container.appendChild(this.itemContainer);
  }
}
//TodoList class makes a list of newtodo
class TodoList {
  constructor() {
    const addButton = document.querySelector(".addButton");
    addButton.addEventListener("click", this.addNewTodo);
    new EventListener();
  }
  //Initilize addNewTodo function here.
  addNewTodo() {
    const globalInput = document.getElementById("box");
    if (globalInput.value !== "") {
      new TodoItem(globalInput.value);
      globalInput.value = "";
    }
  }
}
new TodoList();
