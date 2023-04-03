// Get the input fields and list
var taskNameInput = document.getElementById("taskNameInput");
var taskDescInput = document.getElementById("taskDescriptionInput");

    var taskList = document.getElementById("taskList");

    // Add tasks to list from local storage
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key.substring(0, 5) == "task-") {
        var li = document.createElement("li");
        li.innerText = localStorage.getItem(key);

        // Add event listener to toggle completed status on click
        li.addEventListener("click", function () {
          this.classList.toggle("completed");
        });

        // Add delete button
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("t", function () {
          var taskIndex = this.parentNode.getAttribute("data-index");
          localStorage.removeItem("task-" + taskIndex);
          this.parentNode.remove();
          updateTaskIndexes();
        });
        li.appendChild(deleteButton);

        li.setAttribute("data-index", key.substring(5));
        taskList.appendChild(li);
      }
    }

    function addTask() {
      // Get the input fields and list
      // Get the input fields and list
  var taskNameInput = document.getElementById("taskNameInput");
  var taskDescriptionInput = document.getElementById("taskDescriptionInput");
  var taskList = document.getElementById("taskList");

      // Create new list item
      var li = document.createElement("li");

      // Create span element for task name and append to list item
      var taskNameSpan = document.createElement("span");
      taskNameSpan.innerText = taskNameInput.value;
      li.appendChild(taskNameSpan);

      // Create span element for task description and append to list item
      var taskDescSpan = document.createElement("span");
      taskDescSpan.innerText = taskDescInput.value;
      li.appendChild(taskDescSpan);

      // Add event listener to toggle completed status on click
      li.addEventListener("click", function () {
        this.classList.toggle("completed");
      });

      // Add edit button
      var editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.className = "edit";
      editButton.addEventListener("click", function () {
        var taskIndex = this.parentNode.getAttribute("data-index");
        var taskData = JSON.parse(localStorage.getItem("task-" + taskIndex));
        taskNameInput.value = taskData.name;
        taskDescInput.value = taskData.desc;
        li.remove();
        localStorage.removeItem("task-" + taskIndex);
        updateTaskIndexes();
      });
      li.appendChild(editButton);

      // Add delete button
      var deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";
      deleteButton.addEventListener("click", function () {
        var taskIndex = this.parentNode.getAttribute("data-index");
        localStorage.removeItem("task-" + taskIndex);
        this.parentNode.remove();
        updateTaskIndexes();
      });
      li.appendChild(deleteButton);

      // Add new list item to the list and save to local storage
      var taskIndex = localStorage.length;
      var taskData = { name: taskNameInput.value, desc: taskDescInput.value };
      localStorage.setItem("task-" + taskIndex, JSON.stringify(taskData));
      li.setAttribute("data-index", taskIndex);
      taskList.appendChild(li);

      // Clear the input fields
      taskNameInput.value = "";
      taskDescInput.value = "";
    }

    function updateTaskIndexes() {
      var taskItems = taskList.getElementsByTagName("li");
      for (var i = 0; i < taskItems.length; i++) {
        taskItems[i].setAttribute("data-index", i);
      }
      localStorage.clear(); // clear local storage and re-save all tasks with updated indexes
      for (var i = 0; i < taskItems.length; i++) {
        var taskData = {
          name: taskItems[i].getElementsByTagName("span")[0].innerText,
          desc: taskItems[i].getElementsByTagName("span")[1].innerText,
        };
        localStorage.setItem("task-" + i, JSON.stringify(taskData));
      }
    }