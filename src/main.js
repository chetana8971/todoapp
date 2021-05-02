const addButton = document.querySelector(".addButton");
const input = document.querySelector(".input");
const container = document.querySelector(".container");

(function createTodoApplication() {
  function createDiv(textInput) {
    const input = document.createElement("input");
    input.value = textInput;
    input.disabled = true;
    input.classList.add("itemInput");
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

    checkBox.addEventListener("change", function () {
      input.style.textDecoration = checkBox.checked ? "line-through" : "none";
    });

    editButton.addEventListener("click", () => edit(input, editButton));

    removeButton.addEventListener("click", () => remove(itemContainer));

    itemContainer.appendChild(checkBox);
    itemContainer.appendChild(input);
    itemContainer.appendChild(editButton);
    itemContainer.appendChild(removeButton);
    container.appendChild(itemContainer);
  }

  function edit(input, editButton) {
    input.disabled = !input.disabled;
    if (input.disabled) {
      editButton.innerHTML = "Edit";
    } else {
      editButton.innerHTML = "Submit";
    }
  }

  function remove(item) {
    container.removeChild(item);
  }

  function check() {
    document.getElementById("checkboxClicked").checked = true;
  }

  function uncheck() {
    document.getElementById("checkboxClicked").checked = false;
  }

  function addNewTodo() {
    if (input.value !== "") {
      createDiv(input.value);
      input.value = "";
    }
  }

  addButton.addEventListener("click", addNewTodo);
})();
