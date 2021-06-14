let formEl = document.querySelector(`#task-form`);
let tasksToDoEl = document.querySelector(`#tasks-to-do`);

let createTaskHandler = function(event) {
    event.preventDefault();
    // set the value of the variables to the value of the input in the browser
    let taskNameInput = document.querySelector(`input[name='task-name']`).value;
    let taskTypeInput = document.querySelector(`select[name="task-type"]`).value;
    
    // create a li element in the variable and give it a class
    let listItemEl = document.createElement(`li`);
    listItemEl.className = `task-item`;
    // create a div in the element with the id "tasks-to-do" and give it a class
    let taskInfoEl = document.createElement(`div`);
    taskInfoEl.className = `task-info`;
    // add html to div variable
    taskInfoEl.innerHTML = `<h3 class="task-name">` + taskNameInput + `</h3><span class="task-type">` + taskTypeInput + `</span>`;
    // assign the variables as children elements to the pre-existing elements in the html
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener(`submit`, createTaskHandler);