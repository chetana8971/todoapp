const addButton = document.querySelector(".addButton");
const input = document.querySelector(".input");
const container = document.querySelector(".container");

class Item {
  constructor(textInput) {
    this.createDiv(textInput);
  }

  createDiv(textInput) {
    const input = document.createElement("input");
    input.value = textInput;
    input.disabled = true;
    input.classList.add("item_Input");
    input.type = "text";

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item");

    const editButton = document.createElement("button");
    editButton.setAttribute("id", "editButton");
    editButton.innerHTML = "Edit";
    editButton.classList.add("editButton");

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.classList.add("removeButton");

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("checkBox");

    editButton.addEventListener("click", () => this.edit(input, editButton));
    removeButton.addEventListener("click", () => this.remove(itemContainer));

    itemContainer.appendChild(checkBox);
    itemContainer.appendChild(input);
    itemContainer.appendChild(editButton);
    itemContainer.appendChild(removeButton);
    container.appendChild(itemContainer);
  }

  edit(input, editButton) {
    input.disabled = !input.disabled;
    if (input.disabled) {
      editButton.innerHTML = "Edit";
    } else {
      editButton.innerHTML = "Submit";
    }
  }

  remove(item) {
    container.removeChild(item);
  }
}

function addNewTodo() {
  if (input.value !== "") {
    new Item(input.value);
    input.value = "";
  }
}

addButton.addEventListener("click", addNewTodo);
