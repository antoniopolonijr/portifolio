const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");

// I like to do an init function so I can use "await"
async function init() {
  // the state for the app
  let currentRow = 0;
  let currentGuess = "";
  let done = false; // the game is done
  let isLoading = true;

  // nab the word of the day
  const res = await fetch(
    "https://words.dev-apis.com/word-of-the-day?random=1"
  );
  const { word: wordRes } = await res.json(); // get the property word (from the link) and assign it to wordRes
  const word = wordRes.toUpperCase();
  const wordParts = word.split(""); // make each character one entry in an array
  isLoading = false;
  setLoading(isLoading);

  // user adds a letter to the current guess
  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      // add letter to currentGuess until max length
      currentGuess += letter;
    } else {
      // replace the last letter to the currentGuess
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    // add letter to the current div
    letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].innerText =
      letter;
  }

  // use tries to enter a guess
  async function enter() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      // do nothing
      return;
    }

    // check the API to see if it's a valid word
    // skip this step if you're not checking for valid words
    isLoading = true;
    setLoading(isLoading);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });
    const { validWord } = await res.json();
    isLoading = false;
    setLoading(isLoading);

    // not valid, mark the word as invalid and return
    if (!validWord) {
      markInvalidWord();
      return;
    }

    const guessParts = currentGuess.split(""); // make each character one entry in an array
    const map = makeMap(wordParts);
    let allRight = true;

    // first pass just finds correct letters so we can mark those as
    // correct first
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // test each letter and mark as correct
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct"); // add this class to the div
        map[guessParts[i]]--; // is there a left letter to mark as close?
      }
    }

    // second pass finds close and wrong letters
    // we use the map to make sure we mark the correct amount of
    // close letters
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // do nothing we already dit it
      } else if (map[guessParts[i]] && map[guessParts[i]] > 0) {
        // test each letter and mark as close
        allRight = false;
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close"); // add this class to the div
        map[guessParts[i]]--;
      } else {
        // wrong
        allRight = false;
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong"); // add this class to the div
      }
    }

    currentRow++; // go to the next row

    if (allRight) {
      // win
      alert("you win");
      document.querySelector(".brand").classList.add("winner");
      done = true;
    } else if (currentRow === ROUNDS) {
      // lose
      alert(`you lose, the word was ${word}`);
      done = true;
    }
    currentGuess = ""; // reset the currentGuess
  }

  // user hits backspace, if the the length of the string is 0 then do
  // nothing
  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1); // delete the last letter to the currentGuess
    letters[currentRow * ANSWER_LENGTH + currentGuess.length].innerText = ""; // delete the last letter to the div
  }

  // let the user know that their guess wasn't a real word
  // skip this if you're not doing guess validation
  function markInvalidWord() {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid"); // remove "invalid" class to be able to repaint

      // long enough for the browser to repaint without the "invalid class" so we can then add it again
      setTimeout(
        () => letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid"),
        10
      );
    }
  }

  // listening for event keys and routing to the right function
  // we listen on keydown so we can catch Enter and Backspace
  document.addEventListener("keydown", function handleKeyPress(event) {
    if (done || isLoading) {
      // do nothing;
      return;
    }

    const pressedKey = event.key;

    if (pressedKey === "Enter") {
      enter();
    } else if (pressedKey === "Backspace") {
      backspace();
    } else if (isLetter(pressedKey)) {
      // if is true
      addLetter(pressedKey.toUpperCase()); // letter to upper case
    } else {
      // do nothing
    }
  });
}

// a little function to check to see if a character is alphabet letter
// this uses regex (the /[a-zA-Z]/ part) but don't worry about it
// you can learn that later and don't need it too frequently
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter); // give true or false
}

// show the loading spinner when needed
function setLoading(isLoading) {
  loadingDiv.classList.toggle("hidden", !isLoading); // if notIsLoading is true add the "hidden" class, if notIsLoading is false remove it.
}

// takes an array of letters (like ['E', 'L', 'I', 'T', 'E']) and creates
// an object out of it (like {E: 2, L: 1, T: 1}) so we can use that to
// make sure we get the correct amount of letters marked close instead
// of just wrong or correct
function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++; // increments 1 for repeated letters
    } else {
      obj[array[i]] = 1;
    }
  }
  return obj;
}

init();
