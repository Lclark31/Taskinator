let pageContentEl = document.querySelector(`#page-content`);
let formEl = document.querySelector(`#task-form`);
let tasksToDoEl = document.querySelector(`#tasks-to-do`);
let taskIdCounter = 0;
let tasksInProgressEl = document.querySelector(`#tasks-in-progress`);
let tasksCompletedEl = document.querySelector(`#tasks-completed`);

let tasks = [];

let taskFormHandler = function (event) {
  event.preventDefault();
  // set the value of the variables to the value of the input in the browser
  let taskNameInput = document.querySelector(`input[name='task-name']`).value;
  let taskTypeInput = document.querySelector(`select[name="task-type"]`).value;

  if (!taskNameInput || !taskTypeInput) {
    alert(`You need to fill out the task form!`);
    return false;
  }
  formEl.reset();

  let isEdit = formEl.hasAttribute(`data-task-id`);
  if (isEdit) {
    let taskId = formEl.getAttribute(`data-task-id`);
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: `to do`,
    };

    createTaskEl(taskDataObj);
  }
  // send the object as an argument for the function
};

let createTaskEl = function (taskDataObj) {
  // create a li element in the variable and give it a class
  let listItemEl = document.createElement(`li`);
  listItemEl.className = `task-item`;
  //  add task id as a custom attribute
  listItemEl.setAttribute(`data-task-id`, taskIdCounter);
  // create a div in the element with the id "tasks-to-do" and give it a class
  let taskInfoEl = document.createElement(`div`);
  taskInfoEl.className = `task-info`;
  // add html to div variable
  taskInfoEl.innerHTML =
    `<h3 class="task-name">` +
    taskDataObj.name +
    `</h3><span class="task-type">` +
    taskDataObj.type +
    `</span>`;
  // assign the variables as children elements to the pre-existing elements in the html
  listItemEl.appendChild(taskInfoEl);

  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  let taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  taskIdCounter++;

  saveTasks();
};

let createTaskActions = function (taskId) {
  let actionContainerEl = document.createElement(`div`);
  actionContainerEl.className = `task-actions`;

  let editButtonEl = document.createElement(`button`);
  editButtonEl.textContent = `Edit`;
  editButtonEl.className = `btn edit-btn`;
  editButtonEl.setAttribute(`data-task-id`, taskId);

  actionContainerEl.appendChild(editButtonEl);

  let deleteButtonEl = document.createElement(`button`);
  deleteButtonEl.textContent = `Delete`;
  deleteButtonEl.className = `btn delete-btn`;
  deleteButtonEl.setAttribute(`data-task-id`, taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  let statusSelectEl = document.createElement(`select`);
  statusSelectEl.className = `select-status`;
  statusSelectEl.setAttribute(`name`, `status-change`);
  statusSelectEl.setAttribute(`data-task-id`, taskId);

  actionContainerEl.appendChild(statusSelectEl);

  let statusChoices = [`To Do`, `In Progress`, `Completed`];

  for (let i = 0; i < statusChoices.length; i++) {
    let statusOptionEl = document.createElement(`option`);
    statusOptionEl.textContent = statusChoices[i];

    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

let taskButtonHandler = function (event) {
  let targetEl = event.target;

  if (event.target.matches(`.delete-btn`)) {
    let taskId = targetEl.getAttribute(`data-task-id`);
    deleteTask(taskId);
  } else if (event.target.matches(`.edit-btn`)) {
    let taskId = targetEl.getAttribute(`data-task-id`);
    editTask(taskId);
  }
};

let deleteTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  tasks = updatedTaskArr;
  saveTasks();
};

let editTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  let taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector(`#save-task`).textContent = `Save Task`;
  formEl.setAttribute(`data-task-id`, taskId);
};

let completeEditTask = function (taskName, taskType, taskId) {
  // find the matching task list item
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  for (var i = o; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";

  saveTasks();
};

let taskStatusChangeHandler = function (event) {
  let taskId = event.target.getAttribute(`data-task-id`);

  let statusValue = event.target.value.toLowerCase();

  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};

let saveTasks = function () {
  localStorage.setItem(`tasks`, JSON.stringify(tasks));
};

formEl.addEventListener(`submit`, taskFormHandler);

pageContentEl.addEventListener(`click`, taskButtonHandler);
pageContentEl.addEventListener(`change`, taskStatusChangeHandler);
