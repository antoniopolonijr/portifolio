// variables assigned to access elements in HTML document
const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// array of objects to store data for each frame of the animation.
const animationData = [
  /*
  Recall that the call stack is a LIFO (last in, first out) data structure. This means that, as functions are called, they are added to the top or end of the stack, and as functions return, they are removed from the top of the stack.
  Treat your animationData array as a stack and add a new object to it. 
  Now it's time to set up for the next phase of the animation where you'll update and remove the paragraphs you append to the DOM during the animation.  
  */
  {
    inputVal: 5, // value of the input each time your recursive function runs
    marginTop: 300, // top margin for DOM elements you'll add to the page
    addElDelay: 1000, // delay between adding DOM elements to the page.
    msg: `decimalToBinary(5) returns '10' + 1 (5 % 2). Then it pops off the stack.`,
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: `decimalToBinary(2) returns '1' + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.`,
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: `decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.`,
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];

/*
This decimalToBinary function is complete. But there are some ways to improve it. For example, it's not necessary to keep track of the inputs and quotients. We can clean things up so the function is more efficient.

// function to do the decimal to binary conversion.
const decimalToBinary = (input) => {
  // it's time to finish building the function to do the conversion for you. You'll start off with a simpler solution first, then refactor that into a recursive solution.
  // First, you need to create some arrays to store the inputs and results of the division you'll do in the following steps. These will make it easier to see how the decimal to binary conversion works.
  const inputs = [];
  const quotients = [];
  const remainders = [];

  // Your decimalToBinary function works well, but there is an issue – because of the condition in your while loop, it only works for numbers greater than 0. If you try to convert 0 to binary, nothing will get added to the page.
  if (input === 0) {
    result.innerText = "0"; // // to display the result of the conversion on the screen
    return;
  }

  // For the decimal to binary conversion, you need to divide input by 2 until the quotient, or the result of dividing two numbers, is 0. But since you don't know how many times you need to divide input by 2, you can use a while loop to run a block of code as long as input is greater than 0 and can be divided.
  // As a reminder, a while loop is used to run a block of code as long as the condition evaluates to true, and the condition is checked before the code block is executed.
  // The tricky part about while loops is that, if you're not careful, they can run forever. This is called an infinite loop, and can cause your browser to crash.
  // To avoid infinite loops, you need to make sure that the condition for the while loop eventually becomes false. In this case, you want to make sure that the input variable eventually becomes 0.

  // while loop to run a block of code as long as input is greater than 0 and can be divided.
  while (input > 0) {
    const quotient = Math.floor(input / 2); // "input" is the dividend, or the number to be divided, and 2 is the divisor, or the number to divide by. The result, is called the quotient. // division can lead to a floating point number, or a number with a decimal point. The best way to handle this is to round down to the nearest whole number. // Math.floor() function to round down the quotient of input divided by 2 before it's assigned to quotient.

    const remainder = input % 2; // to calculate the remainder of input divided by 2. You can do this by using the remainder operator (%), which returns the remainder of the division of two numbers

    // This will help you get a better idea of how the conversion works later when you log the contents of your arrays to the console.
    inputs.push(input);
    quotients.push(quotient);
    remainders.push(remainder);

    // (removed) input = 0; // This will make it so that the loop will only run up to one time. // Now that you have an operation that will lower the value of input each time the loop runs, you don't have to worry about the loop running forever. // Update the last line of your while loop and assign quotient to input.
    input = quotient;
  }

  // Now's a good time to check your work.
  console.log("Inputs: ", inputs);
  console.log("Quotients: ", quotients);
  console.log("Remainders: ", remainders);

  /* Now if you enter in the number 6 and click the Convert button, you'll see the following output:
  Example Code
  Inputs:  [ 6, 3, 1 ]
  Quotients:  [ 3, 1, 0 ]
  Remainders:  [ 0, 1, 1 ]
  Notice that the remainders array is the binary representation of the number 6, but in reverse order. */ /*

  // to display the result of the conversion on the screen
  result.innerText = remainders.reverse().join(""); // .reverse() method to reverse the order of the remainders array, and .join() with an empty string as a separator to join the elements into a binary number string
};
*/

/*
// improved function to do the decimal to binary conversion.
// it's not necessary to keep track of the inputs and quotients. We can clean things up so the function is more efficient.
const decimalToBinary = (input) => {
  let binary = "";

  // Finally, you need to handle cases where input is 0. Rather than update the DOM and return early like you did before, you can update the binary string and let the rest of the code in the function run.
  if (input === 0) {
    binary = "0";
  }

  while (input > 0) {
    // In the previous version of this function, you pushed the remainder of input divided by 2 to binaryArray. Then later you reversed and joined the entries into a binary number string.
    // But it would be easier to use string concatenation within the loop to build the binary string from right to left, so you won't need to reverse it later.
    binary = (input % 2) + binary;

    // // Recall that, each time the loop runs, input is the quotient of the previous value of input divided by 2, rounded down. Eventually, input is less than 1, and the loop stops running.
    input = Math.floor(input / 2);
  }

  result.innerText = binary; // to display the result of the conversion
};
*/

/*
// learning a bit about the call stack and recursion

/* In computer science, a stack is a data structure where items are stored in a LIFO (last-in-first-out) manner. If you imagine a stack of books, the last book you add to the stack is the first book you can take off the stack. Or an array where you can only .push() and .pop() elements.

The call stack is a collection of function calls stored in a stack structure. When you call a function, it is added to the top of the stack, and when it returns, it is removed from the top / end of the stack.

You'll see this in action by creating mock call stack. */ /*

// While that's a simple example, it demonstrates how the call stack steps through your code and calls multiple functions.
const callStack = [
  `a(): returns 'freeCodeCamp ' + b()`, // When your code runs, the a() function is added to the call stack first.
  `b(): returns 'is ' + c()`, // since a() calls b(), the function b() is added to the call stack.
  `c(): returns 'awesome!'`, // since b() calls c(), the function c() is added to the call stack.
  // Your call stack is complete. As you can see, a() is at the bottom or beginning of the stack, which calls b() in the middle, which calls c() at the top or end. Once they're all in place, they begin to execute from top to bottom.
  // c() executes, returns the string "awesome!", and is popped off or removed from the top of the stack.
  // Then the function b() executes and evaluates to "is " + "awesome!".
  // Now that b() has executed, pop it off the call stack. Then, update your mock call to a() to the following: "a(): returns 'freeCodeCamp ' + 'is awesome!'".
  // Finally, a() returns the concatenated string "freeCodeCamp is awesome!".
];
const a = () => {
  return "freeCodeCamp" + b();
};
const b = () => {
  return "is " + c();
};
const c = () => {
  return "awesome!";
};
console.log(a());
*/

/*
// function that will count down from a given number to zero using recursion.
// To really see the call stack in action, you just need to modify the function slightly. rename the countdown() function to countDownAndUp(). Remember to update your function calls, too.
const countDownAndUp = (number) => {
  console.log(number); // log the current value of number to the console to act as the countdown

  // A recursive function is a function that calls itself over and over. But you have to be careful because you can easily create an infinite loop. That's where the base case comes in. The base case is when the function stops calling itself, and it is a good idea to write it first.
  // Since your countdown() function will count down from a given number to zero, the base case is when the number parameter is equal to 0. Then it should return to break out of its recursive loop.
  if (number === 0) {
    console.log("Reached base case");
    return;
  } else {
    // Recursive functions also have a recursive case, which is where the function calls itself.
    /* When writing the recursive case, you need to remember two things:
    What is the base case?
    What is the least amount of work you need to do to get closer to the base case?
    Since the base case is when number is equal to 0, you need to call countdown() again while also lowering the value of number by 1.*/ /*
    countDownAndUp(number - 1);
    console.log(number);
  }
};
countDownAndUp(3); // to test your function. Call countdown() with an argument of 3 to see if it works

// Now you should see a countdown from 3 to 0, followed by Reached base case, and a count from 1 to 3. This is because, after the recursive loop is finished, the function will continue to execute the code after the recursive call. This is why you see Reached base case before the count from 1 to 3.
*/

// Now that you have a better understanding of how the call stack and recursion work, you'll refactor the decimalToBinary() function to use recursion instead of a while loop.
const decimalToBinary = (input) => {
  // As a reminder, it's often best to start with the base case when writing a recursive function so you know what you're working towards, and to prevent an infinite loop.
  // Similar to your last implementation, you'll divide input by 2 repeatedly until input is 0.
  /*
    if (input === 0) {
    return "0";
    // But if you test your converter with 0, you'll see that nothing happens. This is because you return an empty string in your base case when input is 0. We can fix this now.
    // This mostly works – if you convert 0 into binary, 0 is displayed on the page. But now when you convert other numbers greater than 0, your binary number starts with a leading 0. For example, if you convert 1, the result is 01.
    // But if you think about it, 0 and 1 in base-10 always convert to 0 and 1 in base-2, respectively. So you can add another base case to handle when input is 1.
  } else if (input === 1) {
    return "1";
  } 
  */
  // Now everything should work as expected. And since you know that input will either be the numbers 0 or 1 at this point, you can combine your two base cases and just return input as a string.
  // For a reliable way to convert a value into a string, even falsy values like null and undefined, you can use the String() function.
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    // For the recursive case
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
    // This effectively lowers the input by roughly half each time the decimalToBinary() function is called.
    // However, remember that the binary number string is built by calculating the remainder of input divided by 2 and concatenating that to the end.
  }
};

// If you're still confused about how it works under the hood, don't worry. Next, you'll create a simple animation to help you understand what's happening each step of the way.
const showAnimation = () => {
  // let's do some testing. // You should see that text in the console when you enter 5 into the number input and click the Convert button.
  // The setTimeout function takes two arguments: a callback function and a number representing the time in milliseconds to wait before executing the callback function.
  /*
  If you test your code, you'll notice that your console logs are not in the expected order. Instead of logging "free", pausing for a second before logging "Code", and finally logging "Camp", you'll see this:
  Example Code
  free
  Camp
  Code
  This is because the setTimeout() function is asynchronous, meaning that it doesn't stop the execution of the rest of your code. All the code in the showAnimation() function runs line by line, but because setTimeout() is asynchronous, free and Camp are logged to the console immediately, and then Code is logged to the console after a one second delay.
  One way to fix this is to use multiple setTimeout() functions. Use setTimeout() to log free to the console after half a second, or 500 milliseconds.
*/
  /*
While asynchronous, or async, code can be difficult to understand at first, it has many advantages. One of the most important is that it allows you to write non-blocking code.
For example, imagine you're baking a cake, and you put the cake in the oven and set a timer. You don't have to sit in front of the oven waiting the entire time – you can wash dishes, read a book, or do anything else while you wait for the timer to go off.
Async code works in a similar way. You can start an async operation and other parts of your code will still work while that operation is running.
You'll learn more about async code in future projects, but the setTimeout() function is a good introduction.
*/
  /* removed
  setTimeout(() => {
    console.log("free");
  }, 500);
  setTimeout(() => {
    console.log("Code");
  }, 1000);
  setTimeout(() => {
    console.log("Camp");
  }, 1500);
*/

  // start building the animation itself.
  result.innerText = "Call Stack Animation"; // display
  animationData.forEach((obj) => {
    // Since you have the timing for each frame of animation stored in addElDelay, you can use that value with setTimeout() to set up the delay to add elements to the DOM.
    setTimeout(() => {
      animationContainer.innerHTML += `<p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
decimalToBinary(${obj.inputVal})
        </p>`;
    }, obj.addElDelay);
    // For the next phase of the animation you'll update the paragraphs with the msg text. Since you have the delays for each step of the animation already, you can add your code to the same .forEach() loop.
    setTimeout(() => {
      // You have set the id attribute for your paragraph elements to the obj.inputVal property.
      // Now that you've targeted the correct element, you can update its text after the delay you specified earlier
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);
    // Next, you'll remove the paragraph elements from the #show-animation element after the delays you specified earlier.
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove(); // to remove it from the DOM after the delay.
    }, obj.removeElDelay);
    // Now your animation is complete. When you enter 5 in the number input and click the Convert button, the animation will add paragraphs to the DOM, update the text of each paragraph, and then remove the paragraphs from the DOM.
    // The last thing you need to do is add the result of converting the number 5 into binary to the page once the animation is complete.
    setTimeout(() => {
      result.textContent = decimalToBinary(5); // Finally, set the textContent property of result equal to calling decimalToBinary() with 5 as an argument.
      // After this, test out your code by entering the number 5 into the number input and clicking the Convert button.
    }, 20000);
  });
};

// function to check if the number input is empty, the value is not a number or the number is negative.
const checkUserInput = () => {
  // Now your showAnimation() function is set up. But if you look closely at your checkUserInput() function, you'll notice that it's not very DRY – you're calling parseInt() to convert numberInput.value into a number several times.
  // A simple way to fix this is to create a new variable to store the converted number. Then you only have to convert the number once and can use it throughout the function.
  const inputInt = parseInt(numberInput.value);
  // Replace all instances of parseInt(numberInput.value) with inputInt.

  // It would be helpful to alert users if they don't enter a value into the number input, or the number they enter is invalid. While the input type="number" element makes validation easier by only allowing numbers and some special characters, remember that all values you get from HTML elements are actually strings. Also, if the number input is empty, the value property will be an empty string.
  /* (removed) if (numberInput.value === "") {
    // if users don't enter a value into the number input
  } */
  // In an earlier project you learned about truthy and falsy values, which are values that evaluate to true or false. In JavaScript, some common falsy values you'll see are null, undefined, the number 0, and empty strings.
  // Rather than check if a value is equal to a falsy value, you can use the logical NOT operator (!) to check if the value itself is falsy.
  // Because the input type="number" element allows special characters like ., +, and e, users can input floats like 2.2, equations like 2e+3, or even just e, which you don't want to allow.
  // A good way to check and normalize numbers in JavaScript is to use the built-in parseInt() function, which converts a string into an integer or whole number. parseInt() takes at least one argument, a string to be converted into an integer, and returns either an integer or NaN which stands for Not a Number
  // Next, you need to check if the value returned by the parseInt() function is a number or not.
  // To do that, you can use the isNaN() function. This function takes in a string or number as an argument, and returns true if it evaluates to NaN

  // if the user doesn't enter a number, or the number is invalid or the number is negative.
  if (
    !numberInput.value || // you can use the logical NOT operator (!) to check if the value itself is falsy.
    isNaN(inputInt) || // remember that all values you get from HTML elements are actually strings // parseInt() function takes a string to be converted into an integer, and returns either an integer or NaN which stands for Not a Number // isNaN() to check if the value returned by the parseInt() function is a number or not.
    inputInt < 0 // we are considering only positive numbers
  ) {
    window.alert("Please provide a decimal number greater than or equal to 0"); // alert the user
    return; // to break out of this function early. This will prevent future code in this function from running.
  }

  // A good way to test that everything is working is to log the value attribute of numberInput to the console. As a reminder, you can access the value attribute of an element by using dot or bracket notation.
  // (removed) console.log(numberInput.value); // to log the value of numberInput to the console.

  // You'll show the animation when users try to convert the decimal number 5 to binary, so you'll need to add a check for that within your checkUserInput() function.
  // Use an if statement to check if the value attribute of numberInput is equal to the number 5. Remember to use the parseInt() function to convert the string into a number before comparing it to 5
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // set the textContent property of result equal to the string returned by your decimalToBinary() function.
  result.textContent = decimalToBinary(inputInt); // call the function to do the decimal to binary conversion. // parseInt() function to convert the input into a number.

  numberInput.value = ""; //clear the number input by setting its value to an empty string. Then later when you convert several numbers in a row, you won't have to delete the previous number before entering the next one.
};

// event listener to call the checkUserInput function when users click the Convert button.
convertBtn.addEventListener("click", checkUserInput); // call the function to check if the number input is empty, the value is not a number or the number is negative.
// Remember that function references are not called with parentheses.

// event listener to call the checkUserInput function when users press the Enter / Return key.
numberInput.addEventListener("keydown", (e) => {
  // The keydown event fires every time a user presses a key on their keyboard
  // Remember that "e" is a common parameter name for the event object
  // (removed) console.log(e); // to log e to the console
  // If you open your browser's console and type in the number input, you'll see event objects logged to the browser. And if you take a closer look at one of those event objects, you'll see helpful properties like type and target.
  // Since you want to perform an action when the Enter key is pressed, the most helpful property is key, which tells you the string value of the key that was pressed.
  // Note: Since the Enter and Return keys have similar functions, they both have the same string value of "Enter".

  // if you press the Enter / Return key
  if (e.key === "Enter") {
    checkUserInput(); // call the function to check if the number input is empty, the value is not a number or the number is negative.
  }
});
