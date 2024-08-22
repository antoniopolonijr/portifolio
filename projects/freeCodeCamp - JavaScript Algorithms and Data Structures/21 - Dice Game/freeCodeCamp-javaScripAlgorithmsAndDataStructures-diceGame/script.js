// set up HTML variables

const listOfAllDice = document.querySelectorAll(".die"); // Get all of your .die elements and assign them to a listOfAllDice variable
const scoreInputs = document.querySelectorAll("#score-options input"); //  Get your score inputs (the input elements in your #score-options)

const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = []; // Each time the user rolls the dice, you will need to keep track of all of the dice values.
let isModalShowing = false; // When the user clicks on the Show rules button, they should be able to toggle between showing and hiding the game rules.

// Throughout the game, you will need to keep track of the current score, total score, number of rolls and which round the player is on
let score = 0;
let round = 1;
let rolls = 0;

// roll the Dice
const rollDice = () => {
  // Clear the diceValuesArr
  diceValuesArr = []; // diceValuesArr is cleared every time rollDice() is called to ensure only the latest dice values are stored.

  // Generate five random numbers between 1 and 6
  for (let i = 0; i < 5; i++) {
    // loop runs five times
    const randomValue = Math.floor(Math.random() * 6) + 1; // generating a random number between 1 and 6 on each iteration
    diceValuesArr.push(randomValue); // these numbers are pushed into the diceValuesArr.
  }

  // Display the numbers the listOfAllDice elements
  listOfAllDice.forEach((element, index) => {
    element.textContent = diceValuesArr[index];
  }); // The listOfAllDice elements are updated from diceValuesArr. The forEach loop iterates through these elements and sets their textContent to the corresponding value.
};

const updateStats = () => {
  rollsElement.textContent = rolls; // update rolls on the page
  roundElement.textContent = round; // update round on the page
};

// Each time you roll the dice, you could end up with a Three of a kind, Four of a kind, Full house, Straight or a random combination of numbers. Based on the outcome, you can make a selection and add points to your score.
const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false; // set the scoreInputs at that index to be enabled
  scoreInputs[index].value = score; // set the value of that input to the score
  scoreSpans[index].textContent = `, score = ${score}`;
};

// function to add score to total and history
const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

// If you roll the dice and get a Three of a kind or Four of a kind, then you can get a score totalling the sum of all five dice values. To calculate this, create a getHighestDuplicates function which takes an array of numbers. The function will need to count how many times each number is found in the array.
const getHighestDuplicates = (arr) => {
  let counts = {}; // To store the count of each number in the array

  // Count occurrences of each number in the array
  arr.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });

  // Determine the sum of all dice
  const totalSum = arr.reduce((sum, num) => sum + num, 0);

  // Variables to track the highest duplicates
  let hasFourOfAKind = false;
  let hasThreeOfAKind = false;

  // Iterate through the counts to find the highest duplicates
  for (let num in counts) {
    if (counts[num] >= 4) {
      hasFourOfAKind = true;
    }
    if (counts[num] >= 3) {
      hasThreeOfAKind = true;
    }
  }

  // Update the scoring options
  if (hasFourOfAKind) {
    updateRadioOption(1, totalSum);
    updateRadioOption(0, totalSum);
  } else if (hasThreeOfAKind) {
    updateRadioOption(0, totalSum);
  } else {
    updateRadioOption(5, 0);
  }
};

// If the user rolls three of one number, and two of another number, this is called a full house.
const detectFullHouse = (arr) => {
  let counts = {}; // To store the count of each number in the array

  // Count occurrences of each number in the array
  arr.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });

  // Variables to track the duplicates
  let hasTwoOfAKind = false;
  let hasThreeOfAKind = false;

  // Check if counts has 3 and 2 of each number
  if (Object.values(counts).includes(3)) {
    hasThreeOfAKind = true;
  }
  if (Object.values(counts).includes(2)) {
    hasTwoOfAKind = true;
  }

  // Update the scoring options
  if (hasThreeOfAKind && hasTwoOfAKind) {
    updateRadioOption(2, 25);
  } else {
    updateRadioOption(5, 0);
  }
};

// Before each dice roll, you will need to reset the values for the score inputs and spans so a new value can be displayed.
const resetRadioOptions = () => {
  for (let index = 0; index < scoreInputs.length; index++) {
    // iterate through the scoreInputs
    scoreInputs[index].disabled = true; // disable them
    scoreInputs[index].checked = false; // remove the checked attribute
  }
  for (let index = 0; index < scoreSpans.length; index++) {
    scoreSpans[index].textContent = ``; // remove the text from each of the scoreSpans
  }
};

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};

// Function to check for small and large straights. A small straight is when four of the dice have consecutive values in any order (Ex. 1234) resulting in a score of 30 points. A large straight is when all five dice have consecutive values in any order (Ex. 12345) resulting in a score of 40 points.
const checkForStraights = (arr) => {
  // Create a sorted set of unique values from the dice array
  const sortedUniqueArr = [...new Set(arr)].sort((a, b) => a - b);

  // Convert the sorted array to a string to match patterns
  const sortedStr = sortedUniqueArr.join("");

  // Define patterns for small and large straights
  const smallStraights = ["1234", "2345", "3456"];
  const largeStraight = ["12345", "23456"];

  // Check for a large straight
  if (largeStraight.some((straight) => sortedStr.includes(straight))) {
    updateRadioOption(3, 30); // Update the 4th radio button with a score of 30
    updateRadioOption(4, 40); // Update the 5th radio button with a score of 40
  }
  // Check for a small straight
  else if (smallStraights.some((straight) => sortedStr.includes(straight))) {
    updateRadioOption(3, 30); // Update the 4th radio button with a score of 30
  }
  // If no straight is found, set the score to 0
  else {
    updateRadioOption(5, 0); // Update the last radio button with a score of 0
  }
};

// When the user clicks on the Roll the dice button, five random die numbers should be generated and displayed on the screen.
// For each round in the game, users are allowed to roll the dice a maximum of three times
rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    // If a user clicks the rollDiceBtn but has already made three rolls
    alert("You have made three rolls this round. Please select a score.");
  } else {
    resetRadioOptions(); // Before each dice roll, you will need to reset the values for the score inputs and spans so a new value can be displayed.
    rolls++; // increment the rolls variable.
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
  }
});

// When the user clicks on the Show rules button, the rules for the game should display on the screen. When they click on the button again, the rules should be hidden.
rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing; // invert the value of a boolean.
  rulesContainer.style.display = isModalShowing ? "block" : "none"; // show or hide the cart
  rulesBtn.textContent = isModalShowing ? "Hide rules" : "Show rules"; // change the buttom text
});

keepScoreBtn.addEventListener("click", () => {
  // Find the selected radio option
  const selectedRadio = document.querySelector("#score-options input:checked");

  // Check if a radio option is selected
  if (selectedRadio) {
    // Capture the value and id of the selected option
    const selectedValue = selectedRadio.value;
    const achieved = selectedRadio.id;

    // Reset rolls, increment round, and update the score
    rolls = 0;
    round++;
    updateScore(selectedValue, achieved);

    // Reset the radio options (disable or uncheck them)
    resetRadioOptions();

    // there should be a total of six rounds and then the game ends with the final score.
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500); // display an alert with the user's final score after 500 milliseconds.
    }
  } else {
    // If no option is selected, alert the user to select an option
    alert("Please select an option before proceeding to the next round.");
  }
});
