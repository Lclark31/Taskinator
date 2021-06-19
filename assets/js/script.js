let pageContentEl = document.querySelector(`#page-content`);
let formEl = document.querySelector(`#task-form`);
let tasksToDoEl = document.querySelector(`#tasks-to-do`);
let taskIdCounter = 0;

let taskFormHandler = function (event) {
    event.preventDefault();
    // set the value of the variables to the value of the input in the browser
    let taskNameInput = document.querySelector(`input[name='task-name']`).value;
    let taskTypeInput = document.querySelector(`select[name="task-type"]`).value;

    if (!taskNameInput || !taskTypeInput) {
        alert(`You need to fill out the task form!`);
        return false;
    };
    formEl.reset();
    // put the values in an object
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    // send the object as an argument for the function
    createTaskEl(taskDataObj)
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
    taskInfoEl.innerHTML = `<h3 class="task-name">` + taskDataObj.name + `</h3><span class="task-type">` + taskDataObj.type + `</span>`;
    // assign the variables as children elements to the pre-existing elements in the html
    listItemEl.appendChild(taskInfoEl);

    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
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

    actionContainerEl.appendChild(deleteButtonEl)

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
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

let editTask = function (taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector(`#save-task`).textContent = `Save Task`;
    formEl.setAttribute(`data-task-id`, taskId);

}

formEl.addEventListener(`submit`, taskFormHandler);

pageContentEl.addEventListener(`click`, taskButtonHandler);