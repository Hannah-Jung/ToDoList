// document: HTML, getElementById: find element with id "task-input"
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];

// addEventListener("event type", function())
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let taskValue = taskInput.value;
  if (taskValue === "") return alert("⚠️ Please enter a task first.");
  let task = {
    id: randomIdGenerate(),
    taskContent: taskValue,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let resultHTML = "";
  list = [];
  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task task-complete" id="${list[i].id}">
                        <span>${list[i].taskContent}</span>
                        <div class="button-box">
                            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left" style="color:#696969"></i></button>
                            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color:#696969"></i></button>
                        </div>
                    </div>`;
    } else {
      resultHTML += `<div class="task" id="${list[i].id}">
                        <span>${list[i].taskContent}</span>
                        <div class="button-box">
                            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color:#696969"></i></button>
                            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color:#696969"></i></button>
                        </div>
                    </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  filterList = [];
  if (mode === "inProgress") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "complete") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
