const globalInput = document.getElementById("box");
const container = document.querySelector(".container");
const addButton = document.querySelector(".addButton");

class todoList {
  constructor() {
    addButton.addEventListener("click", this.addNewTodo);
  }
  addNewTodo() {
    if (globalInput.value !== "") {
      new todoItem(globalInput.value);
      globalInput.value = "";
    }
  }
}
new todoList();

class todoItem {
  constructor(textInput) {
    this.input = document.createElement("div");
    this.input.setAttribute("contenteditable", "true");
    this.input.innerHTML = textInput;    
    this.input.classList.add("textarea");
  
    this.itemContainer = document.createElement("div");
    this.itemContainer.classList.add("item");

    this.editButton = document.createElement("button");
    this.editButton.setAttribute("id", "editButton");
    this.editButton.innerHTML = "Edit";
    this.editButton.classList.add("editButton");

    this.removeButton = document.createElement("button");
    this.removeButton.innerHTML = "Remove";
    this.removeButton.classList.add("removeButton");

    this.checkBox = document.createElement("input");
    this.checkBox.type = "checkbox";
    this.checkBox.classList.add("checkBox");

    this.checkBox.addEventListener("change", this.complete);
    this.editButton.addEventListener("click", this.edit);
    this.removeButton.addEventListener("click", this.remove);

    this.itemContainer.appendChild(this.checkBox);
    this.itemContainer.appendChild(this.input);
    this.itemContainer.appendChild(this.editButton);
    this.itemContainer.appendChild(this.removeButton);
    container.appendChild(this.itemContainer);
  }

  edit = () => {
    this.input.disabled = !this.input.disabled;
    if (this.input.disabled) {
      this.editButton.innerHTML = "Edit";

      this.checkBox.classList.remove("checkEdit");
    } else {
      this.checkBox.classList.add("checkEdit");
      this.editButton.innerHTML = "Submit";
    }
  };

  remove = () => {
    container.removeChild(this.itemContainer);
  };

  complete = () => {
    if (this.checkBox.checked) {
      this.editButton.classList.add("checkEdit");
    } else {
      this.editButton.classList.remove("checkEdit");
    }
    this.input.style.textDecoration = this.checkBox.checked
      ? "line-through"
      : "none";
  };
}
