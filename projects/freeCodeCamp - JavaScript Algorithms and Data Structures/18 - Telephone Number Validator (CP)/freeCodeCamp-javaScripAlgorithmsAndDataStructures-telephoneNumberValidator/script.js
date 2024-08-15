/// Telephone Number Validator

// variables assigned to access elements in HTML document
const checkBtn = document.getElementById("check-btn"); // set the "Check" buttom
const clearBtn = document.getElementById("clear-btn"); // set the "Clear" buttom
const userInput = document.getElementById("user-input"); // set the "input"
const resultsDiv = document.getElementById("results-div"); // set the "output"

/// Functions

// function to check if the user input is empty, or it's a Valid format for US phone number
const checkUserInput = (originalUserInput) => {
  if (originalUserInput === "") {
    // if the number input is empty
    window.alert("Please provide a phone number");
    return; // to break out of this function early. This will prevent future code in this function from running.
  }

  const countryCode = "^(1\\s?)?";
  // ^ Beginning: Matches the beginning of the string, or the beginning of a line if the multiline flag (m) is enabled. This matches a position, not a character.
  // () Capturing group: Groups multiple tokens together and creates a capture group for extracting a substring or using a backreference.
  // 1 matches a "1" character
  // \\ represent a backslash character as part of the string "\"
  // \s Whitespace: Matches any whitespace character (spaces, tabs, line breaks).
  // ? Optional: Matches 0 or 1 of the preceding token, effectively making it optional.

  const areaCode = "(\\([0-9]{3}\\)|[0-9]{3})";
  // \( represents a left parenthesis "("
  // [] Character Set: Match any character in the set
  // 0-9 Range: Matches a character having a character code between the two specified characters inclusive.
  // {3} Quantifier: Matches the specified quantity of the previous token. {1,3} will match 1 to 3. {3} will match exactly 3. {3,} will match 3 or more.
  // \) represents a right parenthesis ")"
  // | Alternation: Acts like a boolean OR. Matches the expression before or after the |. It can operate within a group, or on a whole expression. The patterns will be tested in order.

  const spacesDashes = "[\\s\\-]?";
  // \- represents a "-" character

  const phoneNumber = "[0-9]{3}[\\s\\-]?[0-9]{4}$";
  // End: Matches the end of the string, or the end of a line if the multiline flag (m) is enabled. This matches a position, not a character.

  const phoneRegex = new RegExp( // RegExp object is used for matching text with a pattern
    `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
  );

  const pTag = document.createElement("p");
  pTag.className = "results-text"; // sets the value of the class attribute of the specified element.
  phoneRegex.test(originalUserInput) // The test() method of RegExp instances executes a search with this regular expression for a match between a regular expression and a specified string. Returns true if there is a match; false otherwise.
    ? (pTag.style.color = "green")
    : (pTag.style.color = "red");
  pTag.appendChild(
    // The appendChild() method of the Node interface adds a node to the end of the list of children of a specified parent node.
    document.createTextNode(
      // Creates a text string from the specified value
      `${
        phoneRegex.test(originalUserInput) ? "Valid" : "Invalid"
      } US number: ${originalUserInput}`
    )
  );
  resultsDiv.appendChild(pTag);
};

// Event Listeners

// event listener to clear input and output text when users click the Clear button.
clearBtn.addEventListener("click", () => {
  userInput.value = ""; // clear the input text in the html
  resultsDiv.textContent = ""; // clear the output text in the html
});

// event listener to call the checkUserInput function when users click the Check button.
checkBtn.addEventListener("click", () => {
  checkUserInput(userInput.value); // take the value of text input and execute the checkUserInput function
  userInput.value = ""; // clear the input text in the html
});

// event listener to call the checkUserInput function when users press the Enter / Return key.
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // method to stop the browser from refreshing the page after submitting the form.
    checkUserInput(userInput.value); // take the value of text input and execute the checkUserInput function
    userInput.value = ""; // clear the input text in the html
  }
});
