/// Swiper

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  // pagination: {
  // el: ".swiper-pagination",
  // },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

/// Palindrome Checker

// Set the DOM

const palindromeCheckBtn = document.getElementById("check-btn"); // set the "Check" buttom
const palindromeUserInput = document.getElementById("text-input"); // set the "text-input"
const palindromeResult = document.getElementById("result"); // set the "result"

// Functions

const checkPalindrome = (originalUserInput) => {
  const cleanUserInput = originalUserInput
    .replace(/[^a-zA-Z0-9]/g, "") // remove all non-alphanumeric characters
    .toLowerCase(); // turn everything into the same case (lower)
  if (cleanUserInput === "") {
    window.alert("Please input a value");
  } else if (cleanUserInput === cleanUserInput.split("").reverse().join("")) {
    // if the cleanUserInput is the same forward and backwards
    palindromeResult.innerText = `${originalUserInput} is a palindrome`; // change the result text
    palindromeResult.style.color = "green"; // change the result color
  } else {
    palindromeResult.innerText = `${originalUserInput} is not a palindrome`; // change the result text
    palindromeResult.style.color = "red"; // change the result color
  }
  palindromeResult.classList.remove("hidden"); // show the result
};

// Event Listeners

// add event "click" to the Check btn
palindromeCheckBtn.addEventListener("click", () => {
  checkPalindrome(palindromeUserInput.value); // take the value of text input and execute the ckeckPalindrome function
  palindromeUserInput.value = ""; // clear the input text in the html
});

// add event "Enter" to the Check btn
palindromeUserInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkPalindrome(palindromeUserInput.value); // take the value of text input and execute the ckeckPalindrome function
    palindromeUserInput.value = ""; // clear the input text in the html
  }
});
