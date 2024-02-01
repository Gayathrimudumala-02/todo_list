// ********** SELECT ITEMS **********
const form = document.querySelector(".todo-form");
const alert = document.querySelector(".alert");
const  todo= document.querySelector("#todo");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".todo-container");
const List = document.querySelector(".todo-list");
const clearBtn = document.querySelector(".clear-btn")




// ********** Edit ITEMS **********
let editElement;
let editId;
let editFlag = false;


// ********** EVENT LISTENERS **********
form.addEventListener("submit",addItem);
clearBtn.addEventListener("click",clearItems);
window.addEventListener("DOMContentLoaded",setupItems);


// ********** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    let id = new Date().getTime().toString();
    const value = todo.value;
    if (value != "" && !editFlag) {
        let element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("todo-item");

        element.innerHTML = ` 
        <p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `;
        
        // Event Listeners for edit and delete buttons
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click",editItem);
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",deleteItem);

        //Append child into the list
        List.appendChild(element);

        //Append "show-container" class name to change visibility of the container
        container.classList.add("show-container");

        // display alert
        displayAlert("success", "item added to the list");

        //Adding into local storage
        addToLocalStorage(id,value);
    } else if (value != "" && editFlag) {
        editElement.textContent = value;

        displayAlert("success", "value changed");
        editFromLocalStorage(editID,value);
    }
    setBackToDefault();    
}

function editItem(e) {
    let element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    todo.value = editElement.textContent;
    submitBtn.textContent = "Edit";
    editFlag = true;
    editID = element.dataset.id;

    //calling the addItem function to the edit element

}

function deleteItem(e) {
    let element = e.currentTarget.parentElement.parentElement;

    //Removing child from list
    List.removeChild(element);

    //check the length of the list
    if (List.children.length === 0) {
        container.classList.remove("show-container");
    }

    displayAlert("danger", "Item removed");

    removeFromLocalStorage(element.dataset.id);
}

function clearItems(e) {
    let items = document.querySelectorAll(".todo-item");

    items.forEach((item) => {
        List.removeChild(item);
    });

    container.classList.remove("show-container");

    displayAlert("danger", "empty list");

    localStorage.removeItem("list");
}

function displayAlert(className, message) {
    alert.classList.add(`alert-${className}`);
    alert.textContent = message;

    setTimeout(() => {
        alert.classList.remove(`alert-${className}`);
        alert.textContent = "";
    }, 1500);
    
}

function setBackToDefault() {
    todo.value = "";
    submitBtn.textContent = "Submit";
    editFlag = false;
}

// ********** LOCAL STORAGE **********
function getFromLocalStorage() {
    let items = localStorage.getItem("list");
    return items ? JSON.parse(items):[];

}
function addToLocalStorage(id,value) {
    let items = getFromLocalStorage();
    let todo = {id,value};
    items.push(todo);
    localStorage.setItem("list",JSON.stringify(items));

}
function removeFromLocalStorage(id) {
    let items = getFromLocalStorage();
    items = items.filter((item) => {
        if (item.id !=id) {
            return item;
        }
    });
    localStorage.setItem("list",JSON.stringify(items));
}
function editFromLocalStorage(id,value) {
    let items = getFromLocalStorage();
    items = items.map((item) => {
        if (item.id ===id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list",JSON.stringify(items));
}

//setupItems
function setupItems() {
    let items = getFromLocalStorage();
    items.forEach((item) => {
        setupItems(item.id,item.value);
    });
    container.classList.add("show-container");
}

function setupItem(id,value) {
    let element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("todo-item");

    element.innerHTML = ` 
        <p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `;
        
        // Event Listeners for edit and delete buttons
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click",editItem);
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",deleteItem);

        //Append child into the list
        List.appendChild(element);

}



// ********** SETUP ITEMS **********
