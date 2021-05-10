const globalInput = document.getElementById("box");
const container = document.querySelector(".container");
const addButton = document.querySelector(".addButton");
const editButton = document.querySelector(".editButton");
const removeButton = document.querySelector(".removeButton");
const checkBox = document.querySelector(".checkBox");

class addEventListener {
  constructor() {
    document.addEventListener(
      "click",
      (e) => {
        console.log(e.target);
        if (this.hasClass(e.target, "editButton")) {
          console.log(e.target);
          this.edit(e);
        } else if (this.hasClass(e.target, "removeButton")) {
          console.log(e.target);
          this.remove(e);
        } else if (this.hasClass(e.target, "checkBox")) {
          console.log(e.target);
          this.complete(e);
        }
      },
      false
    );
  }
  hasClass = (elem, className) => {
    return elem.classList.contains(className);
  };

  edit = (e) => {
    console.log(e);
    const uniqid = e.target.uniqid;
    console.log(uniqid);
    const input = document.getElementById("inputbox" + uniqid);
    const checkBox = document.getElementById("checkBox" + uniqid);
    const editButton = document.getElementById("editButton" + uniqid);

    //input.disabled = !input.disabled;
    if (input.contentEditable == "false") {
      editButton.innerHTML = "Edit";
      checkBox.classList.remove("hideContent");
      input.contentEditable = "true";
    } else {
      checkBox.classList.add("hideContent");
      editButton.innerHTML = "Submit";
      input.contentEditable = "false";
    }
  };

  remove = (e) => {
    console.log(e);
    const uniqid = e.target.uniqid;
    console.log(uniqid);
    const itemContainer = document.getElementById("item" + uniqid);
    container.removeChild(itemContainer);
  };

  complete = (e) => {
    console.log(e);
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

class todoItem {
  constructor(textInput) {
    var uniqid = new Date().getTime();
    this.input = document.createElement("div");
    this.input.setAttribute("contenteditable", "false");
    this.input.setAttribute("id", "inputbox" + uniqid);
    this.input.disabled = true;

    this.input.innerHTML = textInput;
    this.input.classList.add("textarea");

    this.itemContainer = document.createElement("div");
    this.itemContainer.classList.add("item");
    this.itemContainer.setAttribute("id", "item" + uniqid);
    this.itemContainer.uniqid = uniqid;

    this.editButton = document.createElement("button");
    this.editButton.setAttribute("id", "editButton" + uniqid);
    this.editButton.uniqid = uniqid;
    this.editButton.innerHTML = "Edit";
    this.editButton.classList.add("editButton");

    this.removeButton = document.createElement("button");
    this.removeButton.setAttribute("id", "removeButton" + uniqid);
    this.removeButton.uniqid = uniqid;
    this.removeButton.innerHTML = "Remove";
    this.removeButton.classList.add("removeButton");

    this.checkBox = document.createElement("input");
    this.checkBox.setAttribute("id", "checkBox" + uniqid);
    this.checkBox.uniqid = uniqid;
    this.checkBox.type = "checkbox";
    this.checkBox.classList.add("checkBox");

    this.itemContainer.appendChild(this.checkBox);
    this.itemContainer.appendChild(this.input);
    this.itemContainer.appendChild(this.editButton);
    this.itemContainer.appendChild(this.removeButton);
    container.appendChild(this.itemContainer);
  }
}

class todoList {
  constructor() {
    addButton.addEventListener("click", this.addNewTodo);
    new addEventListener();
  }
  addNewTodo() {
    if (globalInput.value !== "") {
      new todoItem(globalInput.value);
      globalInput.value = "";
    }
  }
}
new todoList();
