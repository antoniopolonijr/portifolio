/// Roman Numeral Converter

// variables assigned to access elements in HTML document
const convertBtn = document.getElementById("convert-btn"); // set the "Convert" buttom
const numberInput = document.getElementById("number"); // set the "input"
const output = document.getElementById("output"); // set the "output"

// array to store data for reference of roman numbers.
const reference = [
  { roman: "M", arabic: 1000 },
  { roman: "CM", arabic: 900 },
  { roman: "D", arabic: 500 },
  { roman: "CD", arabic: 400 },
  { roman: "C", arabic: 100 },
  { roman: "XC", arabic: 90 },
  { roman: "L", arabic: 50 },
  { roman: "XL", arabic: 40 },
  { roman: "X", arabic: 10 },
  { roman: "IX", arabic: 9 },
  { roman: "V", arabic: 5 },
  { roman: "IV", arabic: 4 },
  { roman: "I", arabic: 1 },
];

// Function to make the convert to Roman number
const convertToRoman = (input) => {
  const result = []; // inside function to clear the result every time the user call the function

  reference.forEach((element) => {
    // perform the follow while statement for each element of array (reference[0], reference[1]...)
    while (input >= element.arabic) {
      // condition: if imput is more or equal to element.arabic do the following actions: (until while condition is false, then go to the next element of array)
      result.push(element.roman); // push element.roman number to the result array
      input -= element.arabic; // subtract input with element.arabic that was pushed
    }
  });
  return result.join(""); // add elements of result array into a string
};

// function to check if the number input is empty, or the value is greater than or equal to 1 , or less than or equal to 3999.
// and display the result on the screen
const checkUserInput = () => {
  // values you get from HTML elements are actually strings // parseInt() function takes a string to be converted into an integer
  const inputInt = parseInt(numberInput.value);

  // if the number input is empty, or the value is not greater than or equal to 1 , or not less than or equal to 3999.
  if (
    !numberInput.value || // you can use the logical NOT operator (!) to check if the value itself is falsy.
    isNaN(inputInt) // isNaN() to check if the value returned by the parseInt() function is a number or not.
  ) {
    output.textContent = "Please enter a valid number"; // display it on the screen.
    output.style.borderColor = "red"; // change the output border color
    return; // to break out of this function early. This will prevent future code in this function from running.
  } else if (inputInt < 1) {
    // if the value is not greater than or equal to 1
    output.textContent = "Please enter a number greater than or equal to 1"; // display it on the screen.
    output.style.borderColor = "red"; // change the output border color
    return; // to break out of this function early. This will prevent future code in this function from running.
  } else if (inputInt > 3999) {
    // if the value is not greater than or equal to 1
    output.textContent = "Please enter a number less than or equal to 3999"; // display it on the screen.
    output.style.borderColor = "red"; // change the output border color
    return; // to break out of this function early. This will prevent future code in this function from running.
  }

  // Display the result on the screen
  output.style.borderColor = "var(--green)"; // change the output border color
  output.textContent = convertToRoman(inputInt); // call the function to do the Roman conversion and display it on the screen.
};

// Event Listeners

// event listener to call the checkUserInput function when users click the Convert button.
convertBtn.addEventListener("click", checkUserInput);

// event listener to call the checkUserInput function when users press the Enter / Return key.
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // method to stop the browser from refreshing the page after submitting the form.
    checkUserInput();
  }
});
