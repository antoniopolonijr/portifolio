// html elements

const sortButton = document.getElementById("sort");

// functions

// function to sort input
const sortInputArray = (event) => {
  event.preventDefault(); // buttons associated with a form element submit by default, you need to prevent that behavior. Call event.preventDefault()
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown"),
  ].map((dropdown) => Number(dropdown.value)); // document.getElementsByClassName() to get all the elements with this class
  // .getElementsByClassName() returns an array-like object. You can use the spread operator to convert it into an array. [...element]
  // map function to iterate over the array to get the values from your select elements. These values will currently be strings
  // Number() function to convert those strings into numbers
  //
  // const sortedValues = bubbleSort(inputValues); // call the Bubble Sort function to actually sort the array.
  // const sortedValues = selectionSort(inputValues); // call the Selection Sort function to actually sort the array.
  // const sortedValues = insertionSort(inputValues); // call the Insertion Sort function to actually sort the array.
  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  }); // To sort the elements of an array, you can use the built-in method called .sort()
  // The Sort button may appear to work correctly when clicked, but this is only because all the values in the array are single digits, and the sorting may not work as expected with more complex values.
  // Notice how the number 10 is placed at the beginning of the array. This is because the default behavior of .sort() is to convert the numbers values to strings, and sort them alphabetically. And 10 comes before 2 alphabetically.
  // o fix this, you can pass a callback function to the .sort() method. The callback function has two parameters - for yours, use a and b. The parameters of a and b represent the number values in the array that will be sorted.
  /* The callback to .sort() should return a number. That number determines how to sort the elements a and b:
      If the number is negative, sort a before b.
      If the number is positive, sort b before a.
      If the number is zero, do not change the order of a and b.
     Keeping in mind that you want the numbers to be sorted in ascending order (smallest to largest), return a single subtraction calculation using a and b that will correctly sort the numbers with the above logic.
  */
  updateUI(sortedValues); // call the function to update the display
};

// function to update the display with the sorted numbers
const updateUI = (array = []) => {
  // function that takes a single array parameter. Because you will be writing algorithms that won't immediately have a return value, set a fallback value for array to be an empty array.
  array.forEach((num, i) => {
    // To perform an action on each element in the array
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  });
};

// Bubble Sort function
// which starts at the beginning of the array and 'bubbles up' unsorted values towards the end, iterating through the array until it is completely sorted.
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      // for loop to iterate through the array
      // to compare elements, you'll need to use a nested for loop. This loop should iterate through every element in the array except the last one
      // console.log(array, array[j], array[j + 1]); // For debugging purposes, add a console.log() call in your inner loop
      if (array[j] > array[j + 1]) {
        // To achieve the "bubble up" result, you need to check if the current element is larger than the next element
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        // When your if condition is true, you need to swap the two elements, "bubbling" the larger element up toward the end of the array.
      }
    }
  }
  return array;
};

// Selection sort function
// works by finding the smallest value in the array, then swapping it with the first value in the array. Then, it finds the next smallest value in the array, and swaps it with the second value in the array. It continues iterating through the array until it is completely sorted.
const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i; // A selection sort relies on tracking the index of the smallest value in the array. This ensures that if your current value is the smallest, it will be swapped with itself and not be moved. You will need to be able to reassign the value of minIndex as you iterate through the array.
    for (let j = i + 1; j < array.length; j++) {
      // console.log(array, array[j], array[minIndex]); // For debugging purposes
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    // you've found the smallest value. You need to swap it with your current value.
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
};

// Insertion Sort function
// This algorithm works by building up a sorted array at the beginning of the list. It begins the sorted array with the first element. Then it inspects the next element and swaps it backward into the sorted array until it is in a sorted position, and so on.
const insertionSort = (array) => {
  // An insertion sort algorithm starts the sort at the beginning of the list, meaning the first element is already sorted
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > currValue) {
      // First condition, it should not run beyond the beginning of the array (accessed with j).
      // Second condition, the loop should not run after it finds a value smaller than the current value.
      array[j + 1] = array[j]; // On each iteration of your while loop, it is finding an element that is larger than your current value. You need to move that element to the right to make room for your current value.
      j--; // To prevent an infinite loop
      // On each iteration of your while loop, it is finding an element that is larger than your current value. You need to move that element to the right to make room for your current value.
    }
    array[j + 1] = currValue; // to insert current value. Remember that the loop ends when j is either out of the array bounds, or when the value at j is less than current value.
  }
  return array;
};

// event listeners

sortButton.addEventListener("click", sortInputArray);
