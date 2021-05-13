class EventListener {
  constructor() {
    document.addEventListener(
      "click",
      (e) => {
        switch (e.target.classList[0]) {
          case "editButtonClass":
            console.log(e.target);
            this.edit(e);
            break;
          case "removeButtonClass":
            console.log(e.target);
            this.remove(e);
            break;
          case "checkBoxClass":
            console.log(e.target);
            this.complete(e);
            break;
        }
      },
      false
    );
  }

  edit = (e) => {
    const uniqid = e.target.uniqid;
    console.log(uniqid);
    const input = document.getElementById("inputbox" + uniqid);
    const checkBox = document.getElementById("checkBox" + uniqid);
    const editButton = document.getElementById("editButton" + uniqid);

    if (input.contentEditable == "false") {
      checkBox.classList.add("hideContent");
      editButton.innerHTML = "Submit";
      input.contentEditable = "true";
    } else {
      editButton.innerHTML = "Edit";
      checkBox.classList.remove("hideContent");
      input.contentEditable = "false";
    }
  };

  remove = (e) => {
    const container = document.querySelector(".container");
    const uniqid = e.target.uniqid;
    console.log(uniqid);
    const itemContainer = document.getElementById("item" + uniqid);
    container.removeChild(itemContainer);
  };

  complete = (e) => {
    const uniqid = e.target.uniqid;
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

class TodoItem {
  constructor(textInput) {
    const uniqid = new Date().getTime();
    const container = document.querySelector(".container");
    this.input = document.createElement("div");
    this.input.setAttribute("contenteditable", "false");
    this.input.setAttribute("id", "inputbox" + uniqid);
    this.input.disabled = true;

    this.input.innerHTML = textInput;
    this.input.classList.add("textarea");

    this.itemContainer = document.createElement("div");
    this.itemContainer.classList.add("itemClass");
    this.itemContainer.setAttribute("id", "item" + uniqid);
    this.itemContainer.uniqid = uniqid;

    this.editButton = document.createElement("button");
    this.editButton.setAttribute("id", "editButton" + uniqid);
    this.editButton.uniqid = uniqid;
    this.editButton.innerHTML = "Edit";
    this.editButton.classList.add("editButtonClass");

    this.removeButton = document.createElement("button");
    this.removeButton.setAttribute("id", "removeButton" + uniqid);
    this.removeButton.uniqid = uniqid;
    this.removeButton.innerHTML = "Remove";
    this.removeButton.classList.add("removeButtonClass");

    this.checkBox = document.createElement("input");
    this.checkBox.setAttribute("id", "checkBox" + uniqid);
    this.checkBox.uniqid = uniqid;
    this.checkBox.type = "checkbox";
    this.checkBox.classList.add("checkBoxClass");

    this.itemContainer.appendChild(this.checkBox);
    this.itemContainer.appendChild(this.input);
    this.itemContainer.appendChild(this.editButton);
    this.itemContainer.appendChild(this.removeButton);
    container.appendChild(this.itemContainer);
  }
}

class TodoList {
  constructor() {
    const addButton = document.querySelector(".addButton");
    addButton.addEventListener("click", this.addNewTodo);
    new EventListener();
  }
  addNewTodo() {
    const globalInput = document.getElementById("box");
    if (globalInput.value !== "") {
      new TodoItem(globalInput.value);
      globalInput.value = "";
    }
  }
}
new TodoList();
