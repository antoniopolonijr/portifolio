// set access to elements in HTML document

const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// If you add, update, or remove a task, it should reflect in the UI. However, that's not happening now because you have yet to retrieve the tasks. To do this, you need to modify your initial taskData to be an empty array.
const taskData = JSON.parse(localStorage.getItem("data")) || []; // store all the tasks along with their associated data

let currentTask = {}; // track the state when editing and discarding tasks

// The function to add the input values to taskData
const addOrUpdateTask = () => {
  // determine whether the task being added to the taskData array already exists or not. If the task does not exist, you will add it to the array. If it does exist, you will update it.
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id); // The findIndex() array method finds and returns the index of the first element in an array that meets the criteria specified by a provided testing function. If no such element is found, the method returns -1

  // When a user creates a task, it should be saved in an object.
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`, // add title to the object / For the id, the value should be all lowercase. / the final result should be a hyphenated string, split the string into an array of words / the join method to turn the result back into a string / To make the id more unique, add another hyphen and use Date.now() (returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC)
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  // Now that you have obtained the values from the input fields and generated an id, you want to add them to your taskData array to keep track of each task. However, you should only do this if the task is new. If the task already exists, you will set it up for editing. This is why you have the dataArrIndex variable, which provides the index of each task.
  if (dataArrIndex === -1) {
    // dataArrIndex variable, which provides the index of each task.
    taskData.unshift(taskObj); // add the taskObj object to the beginning of the taskData array. // unshift() is an array method that is used to add one or more elements to the beginning of an array.
  } else {
    taskData[dataArrIndex] = taskObj; // To make the editing functional
  }

  // Now you should save the task items to local storage when the user adds, updates, or removes a task.
  // This would persist data once the user adds or updates tasks.
  localStorage.setItem("data", JSON.stringify(taskData));

  updateTaskContainer(); // responsible for adding the tasks to the DOM.

  // If you attempt to add another task now, you'll notice that the input fields retain the values you entered for the previous task. To resolve this, you need to clear the input fields after adding a task.
  // Instead of clearing the input fields one by one, it's a good practice to create a function that handles clearing those fields. You can then call this function whenever you need to clear the input fields again. (reset function)
  reset();
};

// The function responsible for adding the tasks to the DOM.
const updateTaskContainer = () => {
  //If you add a task, and then add another, the previous task gets duplicated. This means you need to clear out the existing contents of tasksContainer before adding a new task.
  tasksContainer.innerHTML = "";

  // display the task on the page by looping through it.
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `<div class="task" id="${id}">
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Description:</strong> ${description}</p>
      <button onclick="editTask(this)" type="button" class="btn">Edit</button>
      <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
      </div>`; // template strings (${}) to set the parameter you destructured from the task data. / To allow for task management, you need to include both a delete and an edit button for each task. / To enable editing and deleting for each task, add an onclick attribute to both buttons. / "this" is a keyword that refers to the current context. In this case, "this" points to the element that triggers the event – the buttons.
  });
};

// function will handle task deletion
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  ); // You need to find the index of the task you want to delete first.

  // You need to remove the task from the DOM using remove() and from the taskData array using splice().
  // splice() is an array method that modifies arrays by removing, replacing, or adding elements at a specified index, while also returning the removed elements. It can take up to three arguments: the first one is the mandatory index at which to start, the second is the number of items to remove, and the third is an optional replacement element.
  buttonEl.parentElement.remove(); // to remove the task from the DOM
  taskData.splice(dataArrIndex, 1); // to remove the task from the taskData array

  // You also want a deleted task to be removed from local storage. For this, you don't need the removeItem() or clear() methods. Since you already use splice() to remove the deleted task from taskData, all you need to do now is save taskData to local storage again.
  localStorage.setItem("data", JSON.stringify(taskData));
};

// function will handle task editing
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  ); // You need to find the index of the task you want to delete first.

  currentTask = taskData[dataArrIndex]; // retrieve the task to be edited from the taskData array using the dataArrIndex. Then, assign it to the currentTask object to keep track of it.

  // The task to be edited is now in the currentTask object. Stage it for editing inside the input fields by setting the value of...
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = `Update Task`; // Set the innerText of the addOrUpdateTaskBtn button to Update Task
  taskForm.classList.toggle("hidden"); // display the form modal with the values of the input fields

  // At this point, editing a task won't reflect when you submit the task. To make the editing functional, go back to the if statement inside the addOrUpdateTask function. Create an else block and set taskData[dataArrIndex] to taskObj.

  //If the user attempts to edit a task but decides not to make any changes before closing the form, there is no need to display the modal with the Cancel and Discard buttons. Inside the closeTaskFormBtn event listener, check if the user made changes while trying to edit a task
};

// reset function to clear the input fields
const reset = () => {
  //If you try to add a new task, edit that task, and then click on the Add New Task button, you will notice a bug. The form button will display the incorrect text of "Update Task" instead of "Add Task".
  addOrUpdateTaskBtn.innerText = "Add Task"; // To fix this, assign the string "Add Task"

  titleInput.value = ""; // clear the input field
  dateInput.value = ""; // clear the input field
  descriptionInput.value = ""; // clear the input field
  taskForm.classList.toggle("hidden"); //  hide the form modal for the user to see the added task
  currentTask = {}; // That's because at this point, currentTask will be filled with the task the user might have added.
};

// You've retrieved the task item(s) now, but they still don't reflect in the UI when the page loads. However, they appear when you add a new task.
// You can check if there's a task inside taskData using the length of the array. Because 0 is a falsy value all you need for the condition is the array length.
if (taskData.length) {
  // Check if there's a task inside
  updateTaskContainer();
}

// opening and closing the modal dialog box on the web page
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden"); // toggle method add the class if it is not present on the element, and remove the class if it is present on the element.
});

// You should display the Cancel and Discard buttons to the user only if there is some text present in the input fields.
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value; // variable to check if there is a value in the titleInput field or the dateInput field or the descriptionInput field.

  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description; // Check if the user made changes while trying to edit a task

  if (formInputsContainValues && formInputValuesUpdated) {
    // If formInputsContainValues is true, indicating that there are changes / (formInputValuesUpdated as the second mandatory) This way, the Cancel and Discard buttons in the modal won't be displayed to the user if they haven't made any changes to the input fields while attempting to edit a task.
    confirmCloseDialog.showModal(); // showModal() method display a modal dialog box on a web page
  } else {
    // Otherwise, if there are no changes
    reset(); // call the reset() function to clear the input fields and hide the form modal.
  }
});

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // close() method to close a modal dialog box on a web page
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // close the modal showing the Cancel and Discard buttons
  reset(); // (removed the existing code toggling the class hidden on taskForm and call the reset function instead) That's because when you click the Discard button, everything in the input fields should go away.
});

// get the values from the input fields, save them into the taskData array, and display them on the page.
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // method to stop the browser from refreshing the page after submitting the form.

  // You can enhance code readability and maintainability by refactoring the submit event listener into two separate functions. The first function can be used to add the input values to taskData (addOrUpdateTask function), while the second function can be responsible for adding the tasks to the DOM. (updateTaskContainer function (inside of addOrUpdateTask funcition))
  addOrUpdateTask();
});

/* /// Remove the myTaskArr array and all of the code for localStorage because you don't need them anymore.

// localStorage offers methods for saving, retrieving, and deleting items. The items you save can be of any JavaScript data type.
// For instance, the setItem() method is used to save an item, and the getItem() method retrieves the item. To delete a specific item, you can utilize the removeItem() method, or if you want to delete all items in the storage, you can use clear().

// A myTaskArr array has been provided for you.
const myTaskArr = [
  { task: "Walk the Dog", date: "22-04-2022" },
  { task: "Read some books", date: "02-11-2023" },
  { task: "Watch football", date: "10-08-2021" },
];

localStorage.setItem("data", JSON.stringify(myTaskArr)); // to save it with a key of data.
// open your browser console and go to the Applications tab, select Local Storage, and the domain you see.
// If you check the "Application" tab of your browser console, you'll notice a series of [object Object]. This is because everything you save in localStorage needs to be in string format.
// To resolve the issue, wrap the data you're saving in the JSON.stringify() method. Then, check local storage again to observe the results.

// Now that you have the myTaskArr array saved in localStorage correctly, you can retrieve it with getItem() by specifying the key you used to save the item.
const getTaskArr = localStorage.getItem("data");
console.log(getTaskArr);

// The item you retrieve is a string, as you saved it with JSON.stringify(). To view it in its original form before saving, you need to use JSON.parse().
// Check the console to see the difference between getTaskArr and getTaskObj.
const getTaskArrObj = JSON.parse(localStorage.getItem("data"));
console.log(getTaskArrObj); // log the getTaskArr variable to the console to see the result.

// You can use localStorage.removeItem() to remove a specific item and localStorage.clear() to clear all items in the local storage.
// Remove the data item from local storage and open the console to observe the result. You should see null.
localStorage.removeItem("data");

// Using localStorage.clear() won't just delete a single item from local storage but will remove all items.
// Remove localStorage.removeItem() and use localStorage.clear() instead. You don't need to pass in anything. You should also see null in the console.
localStorage.clear(); */
