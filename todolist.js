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

// SortableJS will handle dragging

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
  // Clear existing DOM before re-rendering
  taskList.innerHTML = "";
  tasks.forEach((task) => addTask(task, false));
}

function persistTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Updates the tasks array to match the current DOM order and persists it
function syncTasksOrderFromDOM() {
  const idToTask = Object.fromEntries(tasks.map((t) => [t.id, t]));
  tasks = Array.from(taskList.children, (li) => idToTask[Number(li.id)])
    // filter out any undefined tasks
    .filter(Boolean);
  persistTasks();
}
/**
 * READ: Loads tasks from localStorage (Mock GET /todos).
 */
function fetchAndRenderTasks() {
  // loaded tasks from local storage
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // render/display tasks
  renderTasks();
}

// --- Mock CRUD Operations ---

/**
 * CREATE: Adds a new task to the array (Mock POST /todos).
 */
function addTask({ name, id }, insertAtTop = true) {
  const taskElement = document.createElement("li");
  // add class card p-2 mb-2
  taskElement.className = "card p-2 mb-2 d-flex justify-content-between";
  taskElement.setAttribute("id", id);

  const taskTextElement = document.createElement("div");
  taskTextElement.textContent = name;
  const taskDateElement = document.createElement("div");
  //<i class="fa fa-trash" aria-hidden="true"></i>
  taskDateElement.textContent = dayjs().format("DD/MM/YYYY hh:mm a");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn btn-danger w-10";
  deleteButton.addEventListener("click", () => {
    taskElement.remove();
    tasks = tasks.filter((task) => task.id !== id);
    persistTasks();
  });

  taskElement.append(...[taskTextElement, taskDateElement, deleteButton]);
  if (insertAtTop) {
    taskList.prepend(taskElement);
  } else {
    taskList.appendChild(taskElement);
  }
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

function addTaskHandler() {
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
  console.log({ taskText });
  if (taskText === "") {
    showMessage("Task cannot be empty.", "danger");
    return;
  }
  const task = {
    id: Math.floor(Math.random() * 1000),
    name: taskText,
    createAt: new Date(),
    completed: false,
  };
  tasks.unshift(task);
  persistTasks();

  addTask(task);
  taskInput.value = "";
}

// Attach the main event listener to the 'Add Task' button
addTaskBtn.addEventListener("click", addTaskHandler);
console.log("page load");
// Initial data load
fetchAndRenderTasks();
// Initialize SortableJS after initial render
if (window.Sortable) {
  Sortable.create(taskList, {
    animation: 150,
    onEnd() {
      syncTasksOrderFromDOM();
    },
  });
}
