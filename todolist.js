// --- Mock Server Setup (Simulating JSON Server persistence) ---

let tasks = []; // In-memory representation of the server's database

// A mock ID for creation (simulating server assignment)
let nextId = 1;

// --- DOM Elements ---
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const messageBox = document.getElementById("messageBox");
const loadingIndicator = document.getElementById("loadingIndicator");

// --- Helper Functions ---

/**
 * Saves the current tasks array to localStorage.
 */
function saveTasks() {}

/**
 * Shows a temporary success or error message (Bootstrap Alert).
 */
function showMessage(message, type) {
  alert(message);
}

/**
 * Creates and returns a new list item element for a task object.
 * @param {object} task - The task data {id, task, completed}
 */
function createTaskElement(task) {}

/**
 * READ: Renders the current state of the tasks array to the DOM.
 */
function renderTasks() {
  // DOM Manipulation: Clear the existing list
  taskList.innerHTML = "";
}

/**
 * READ: Loads tasks from localStorage (Mock GET /todos).
 */
function fetchAndRenderTasks() {}

// --- Mock CRUD Operations ---

/**
 * CREATE: Adds a new task to the array (Mock POST /todos).
 */
function addTask() {
  addTaskBtn.className = addTaskBtn.className.replace(
    "btn-primary",
    "btn-success"
  );
  setTimeout(() => {
    addTaskBtn.className = addTaskBtn.className.replace(
      "btn-success",
      "btn-primary"
    );
  }, 700);

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    showMessage("Task cannot be empty.", "danger");
    return;
  }
  taskInput.value = "";
  const taskElement = document.createElement("li");
  // add class card p-2 mb-2
  taskElement.className = "card p-2 mb-2 d-flex justify-content-between";
  //    <li class="d-flex justify-content-between">
  //   <div>112121</div>
  //   <div>1/2/2</div>
  //   <button class="btn btn-danger">delete</button>
  // </li>
  const taskTextElement = document.createElement("div");
  taskTextElement.textContent = taskText;
  const taskDateElement = document.createElement("div");
  taskDateElement.textContent = new Date();
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn btn-danger";
  deleteButton.addEventListener("click", () => {
    taskElement.remove();
  });

  taskElement.append(...[taskTextElement, taskDateElement, deleteButton]);
  taskList.prepend(taskElement);
}

/**
 * UPDATE: Toggles the completion status (Mock PATCH /todos/:id).
 */
function toggleTaskCompletion(id, isCompleted, taskName) {}

/**
 * DELETE: Removes a task from the array (Mock DELETE /todos/:id).
 */
function deleteTask(id, taskName) {}

// --- Event Listeners (DOM API) ---

// Attach the main event listener to the 'Add Task' button
addTaskBtn.addEventListener("click", addTask);

// Initial data load
fetchAndRenderTasks();
