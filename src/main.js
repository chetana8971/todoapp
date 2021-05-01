const addButton = document.querySelector(".addButton");
const input = document.querySelector(".input");
const container = document.querySelector(".container");


  createDiv=(textInput)=>{
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

    checkBox.addEventListener("click", ()=> input.classList.add('itemInput','checkboxClicked'))
    editButton.addEventListener("click", () => this.edit(input, editButton));
    removeButton.addEventListener("click", () => this.remove(itemContainer));

    itemContainer.appendChild(checkBox);
    itemContainer.appendChild(input);
    itemContainer.appendChild(editButton);
    itemContainer.appendChild(removeButton);
    container.appendChild(itemContainer);
  }

  edit=(input, editButton) =>{
    input.disabled = !input.disabled;
    if (input.disabled) {
      editButton.innerHTML = "Edit";
    } else {
      editButton.innerHTML = "Submit";
    }
  }

  remove=(item)=>{
    container.removeChild(item);
  }

function addNewTodo() {
  if (input.value !== "") {
    createDiv(input.value);
    input.value = "";
  }
}

addButton.addEventListener("click", addNewTodo);





// function addNewTodo(event) {
//   event.preventDefault();
//   const input = document.createElement('');
//   todoDiv.classList.add("todo");
//   const addNewTodo = document.createElement('li');
//   newItem.innerText =" hey";
//   newItem.classList.add('input');
//   todoDiv.appendChild(newItem);
// }





// class Model {
//   constructor() {
//     const addButton = document.querySelector(".addButton");
//     const input = document.querySelector(".input",".textInput");
//     const container = document.querySelector(".container");
//   }
//   addNewTodo(){
//     if (input.value !== "") {
//       create.newItem(input.value);
//       input.value = "";
//     }
//   }

//   edit(input, editButton) {
//     input.disabled = !input.disabled;
//     if (input.disabled) {
//       editButton.innerHTML = "Edit";
//     } else {
//       editButton.innerHTML = "Submit";
//     }
//   }
//   remove(item) {
//     container.removeChild(item);
//   }

//   checkBox() {
//     if (item.classList[0] === "completed") {
//       const addNewTodo = newItem.checkBox;
//       addNewTodo.classList.toggle("completed");
//     }
//   }
// }

// class View {
//   constructor() {
//     const input = document.createElement("input");
//     input.classList.add("newItem");

//     const itemContainer = document.createElement("textInput");
//     itemContainer.classList.add("newItem");

//     const editButton = document.createElement("button");
//     editButton.setAttribute("id", "editButton");
//     editButton.innerHTML = "Edit";
//     editButton.classList.add("editButton");

//     const removeButton = document.createElement("button");
//     removeButton.innerHTML = "Remove";
//     removeButton.classList.add("removeButton");

//     const checkBox = document.createElement("input");
//     checkBox.setAttribute("type", "checkbox");
//     checkBox.classList.add("checkBox");
//   }
// }
// class Controller {
//   constructor(model, view) {
//     this.model = model;
//     this.view = view;
//   }
// }



// const app = new Controller(new Model(), new View());
