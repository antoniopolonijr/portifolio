// In mathematics, an infix is a mathematical operator that appears between its two operands. For example, 1 + 2 is an infix expression. To parse these expressions, you will need to map the symbols to relevant functions. Declare an infixToFunction variable, and assign it an empty object.
const infixToFunction = {
  // Object values do not have to be primitive types, like a string or a number. They can also be functions.
  "+": (x, y) => x + y, // Because + is not alphanumeric, you'll need to wrap it in quotes for your property.
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

// Now that you have your infix functions, you need a way to evaluate them.
const infixEval = (str, regex) =>
  str.replace(regex, (_match, arg1, operator, arg2) =>
    infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
  );
// You will not be using the match parameter, so remember to prefix it
// The regex you will be passing to your infixEval function will match two numbers with an operator between them. The first number will be assigned to arg1 in the callback, the second to arg2, and the operator to operator. Have your callback function implicitly return the operator property of your infixToFunction object. Remember that operator is a variable which holds the property name, not the actual property name.
// infixToFunction[operator] returns a function. Call that function directly, passing arg1 and arg2 as the arguments.
// You have a slight bug. arg1 and arg2 are strings, not numbers. infixToFunction['+']("1", "2") would return 12, which is not mathematically correct. Wrap each of your infixToFunction[operator] arguments in a parseFloat() call.

// Now that you can evaluate mathematical expressions, you need to account for order of operations.
const highPrecedence = (str) => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  // return regex.test(str); // In your highPrecedence function, declare a variable using const and assign it a regex that checks if the string passed to the str parameter matches the pattern of a number followed by a * or / operator followed by another number. Your function should return a boolean value. Remember that you can use the test() method for this.
  const str2 = infixEval(str, regex); // Now that you have a regular expression to match multiplication or division, you can evaluate that expression.
  return str === str2 ? str : highPrecedence(str2); // Your infixEval function will only evaluate the first multiplication or division operation, because regex isn't global. This means you'll want to use a recursive approach to evaluate the entire string. If infixEval does not find any matches, it will return the str value as-is. Using a ternary expression, check if str2 is equal to str. If it is, return str, otherwise return the result of calling highPrecedence() on str2.
};
console.log(highPrecedence("5*3")); // You should use console.log() to print the result of calling the highPrecedence function with the string "5*3". // Remove both the console.log() with your highPrecedence call, and the return statement from your highPrecedence function.

// Most spreadsheet programs include built-in functions for calculation.

// Declare an isEven function, which takes a num parameter and returns true if the number is even, and false otherwise. Use the modulo operator % to determine if a number is even or odd.
const isEven = (num) => num % 2 === 0;

// Declare a sum function that takes a nums parameter, which will be an array of numbers. It should return the result of calling reduce on the array to sum all of the numbers.
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);

// Declare an average function which takes an array of numbers as the nums parameter. It should return the average of all the numbers in the array. The average can be calculated by dividing the sum of all the numbers in the array by the length of the array. Remember that you have a sum function you can use.
const average = (nums) => sum(nums) / nums.length;

// function will calculate the median value of an array of numbers.
const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  // Using ternary syntax, check if length is even using your isEven function. If it is, return the average of the number at the middle index and the number after that. If it's odd, return the number at the middle index – you'll need to round the middle value up.
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};

/*
Object properties consist of key/value pairs. You can use shorthand property names when declaring an object literal. When using the shorthand property name syntax, the name of the variable becomes the property key and its value the property value.
The following example declares a user object with the properties userId, firstName, and loggedIn.
Example Code
const userId = 1;
const firstName = "John";
const loggedIn = true;
const user = {
  userId,
  firstName,
  loggedIn,
};
console.log(user); // { userId: 1, firstName: 'John', loggedIn: true }
*/
const spreadsheetFunctions = {
  "": (nums) => nums, // Finally, to handle potential edge cases, add an empty string property (you will need to use quotes) which is a function that takes a single argument and returns that argument.
  sum,
  average,
  median,
  even: (nums) => nums.filter(isEven), // Add an even property to your spreadsheetFunctions. It should take a nums parameter, and return the result of filtering the nums array to only include even numbers. Use a reference to your isEven function to help.
  someeven: (nums) => nums.some(isEven), // to check if any element in the array is even.
  // Arrays have an .every() method. Like the .some() method, .every() accepts a callback function which should take an element of the array as the argument. The .every() method will return true if the callback function returns true for all elements in the array.
  // Here is an example of a .every() method call to check if all elements in the array are uppercase letters.
  // Example Code
  // const arr = ["A", "b", "C"];
  // arr.every(letter => letter === letter.toUpperCase());
  everyeven: (nums) => nums.every(isEven), // to check whether all array elements are even
  firsttwo: (nums) => nums.slice(0, 2), // returns the first two elements of the nums array.
  lasttwo: (nums) => nums.slice(-2), // returns the last two elements of the nums array
  has2: (nums) => nums.includes(2), // returns whether the nums array has 2 in the values
  increment: (nums) => nums.map((num) => num + 1), // returns nums with every value incremented by one.
  random: ([x, y]) => Math.floor(Math.random() * y + x), // Create a random property. This property should use the first two numbers from an array to generate a random whole number. The range for this number starts at the smaller positive number (inclusive) among the first two numbers and ends just before the sum of these two numbers. Use the Math.floor() and Math.random() methods for the calculation.
  range: (nums) => range(...nums), // Add a range property which generates a range from the first number in nums to the second number in nums. Remember that you have a range function you can reuse here.
  // Add a nodupes property which returns nums with all duplicate values removed. For example, [2, 1, 2, 5, 3, 2, 7] should return [2, 1, 5, 3, 7].
};

// Now you can start applying your function parsing logic to a string.
const applyFunction = (str) => {
  const noHigh = highPrecedence(str); // First you need to handle the higher precedence operators
  const infix = /([\d.]+)([+-])([\d.]+)/; // Now that you've parsed and evaluated the multiplication and division operators, you need to do the same with the addition and subtraction operators.
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i; // This expression will look for function calls like sum(1, 4).
  const toNumberList = (args) => args.split(",").map(parseFloat);
  const apply = (fn, args) =>
    spreadsheetFunctions[fn.toLowerCase()](toNumberList(args)); // The fn parameter will be the name of a function, such as SUM. Remember that fn might not be lowercase, so you'll need to convert it to a lowercase string.
  // Your apply function is returning the spreadsheet function, but not actually applying it. Update apply to call the function. Pass in the result of calling toNumberList with args as an argument.
  return str2.replace(functionCall, (match, fn, args) =>
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())
      ? apply(fn, args)
      : match
  ); // Now your applyFunction needs to return a result
};

// function to generate a range of numbers.
const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);
// Your array will need to be the size of the range. You can calculate this by finding the difference between end and start, and adding 1 to the result.
// The Array() constructor has a .fill() method which can be used to fill an array with a value. You can use this to fill your array with the start value.
// Currently your range function returns an array with the correct length, but all of the values are the value of start. To fix this, chain the .map() method to your .fill() method.

// Now that you have a range function, you can use it to create a range of letters as well.
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code)
  );
// Your range function expects numbers, but your start and end values will be strings (specifically, they will be single characters such as A).
// Convert your start and end values in your range() call to numbers by using the .charCodeAt() method on them, passing the number 0 as the argument to that method.
// range() will return an array of numbers, which you need to convert back into characters. Chain the .map() method to your range() call.

// In order to run your spreadsheet functions, you need to be able to parse and evaluate the input string. This is a great time to use another function.
const evalFormula = (x, cells) => {
  const idToText = (id) => cells.find((cell) => cell.id === id).value; // Your idToText function currently returns an input element. Update it to return the value of that input element.
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi; // You need to be able to match cell ranges in a formula. Cell ranges can look like A1:B12 or A3:A25. You can use a regular expression to match these patterns. Start by declaring a rangeRegex variable and assign it a regular expression that matches A through J (the range of columns in your spreadsheet). Use a capture group with a character class to achieve this.
  // After matching a cell letter successfully, your rangeRegex needs to match the cell number. Cell numbers in your sheet range from 1 to 99. Add a capture group after your letter capture group. Your new capture group should match one or two digits – the first digit should be 1 through 9, and the second digit should be 0 through 9. The second digit should be optional.
  // Ranges are separated by a colon. After your two capture groups, your rangeRegex should look for a colon.
  // After your rangeRegex finds the :, it needs to look for the same letter and number pattern as it did before.
  // Finally, make your rangeRegex global and case-insensitive.
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2)); // To be safe, parse num1 and num2 into integers as you pass them into range.
  /*
  const elemValue = (num) => {
    const inner = (character) => {
      return idToText(character + num);
    };
    return inner;
  };
  */
  const elemValue = (num) => (character) => idToText(character + num); // Use the same syntax as your addCharacters function to update your elemValue function. It should no longer declare inner, but should return the function implicitly.
  const addCharacters = (character1) => (character2) => (num) =>
    charRange(character1, character2).map(elemValue(num));
  /*
The concept of returning a function within a function is called currying. This approach allows you to create a variable that holds a function to be called later, but with a reference to the parameters of the outer function call.
For example:
Example Code
const innerOne = elemValue(1);
const final = innerOne("A");
innerOne would be your inner function, with num set to 1, and final would have the value of the cell with the id of A1. This is possible because functions have access to all variables declared at their creation. This is called closure.
*/
  /*
In your elemValue function, you explicitly declared a function called inner and returned it. However, because you are using arrow syntax, you can implicitly return a function. For example:
Example Code
const curry = soup => veggies => {};
curry is a function which takes a soup parameter and returns a function which takes a veggies parameter. Using this syntax, update your addCharacters function to return an empty function which takes a character2 parameter.
*/
  // Your inner functions can also return a function. Using the same arrow syntax, update your addCharacters function to return a third function which takes a num parameter.
  // Now update your innermost function in the addCharacters chain to implicitly return the result of calling charRange() with character1 and character2 as the arguments.
  // Your addCharacters function ultimately returns a range of characters. You want it to return an array of cell ids. Chain the .map() method to your charRange() call. Do not pass a callback function yet.
  /*
You can pass a function reference as a callback parameter. A function reference is a function name without the parentheses. For example:
Example Code
const myFunc = (val) => `value: ${val}`;
const array = [1, 2, 3];
const newArray = array.map(myFunc);
The .map() method here will call the myFunc function, passing the same arguments that a .map() callback takes. The first argument is the value of the array at the current iteration, so newArray would be [value: 1, value: 2, value: 3].
  */
  // Because elemValue returns a function, your addCharacters function ultimately returns an array of function references. You want the .map() method to run the inner function of your elemValue function, which means you need to call elemValue instead of reference it. Pass num as the argument to your elemValue function.
  const rangeExpanded = x.replace(
    rangeRegex,
    (_match, char1, num1, char2, num2) =>
      rangeFromString(num1, num2).map(addCharacters(char1)(char2))
  );
  // Declare a rangeExpanded variable and assign it the result of calling the .replace() method of your x parameter. Pass the rangeRegex variable as the argument.
  // The second argument to the .replace() method does not have to be a string. You can instead pass a callback function to run more complex logic on the matched string. The callback function takes a few parameters. The first is the matched string. Pass an empty callback function to your .replace() call, and give it a match parameter.
  // The callback function then has a parameter for each capture group in the regular expression. In your case, rangeRegex has four capture groups: the first letter, the first numbers, the second letter, and the second numbers. Give your callback function four more parameters to match those capture groups: char1, num1, char2, and num2. char will be short for character.
  // Have your callback implicitly return the result of calling rangeFromString() with num1 and num2 as the arguments.
  // Call the .map() method on your rangeFromString() call, passing a reference to addCharacters as the callback function.
  // addCharacters returns a function, so you'll want to call it. Pass char1 as the argument.
  /*
  Your addCharacters(char1) is also returning a function, which returns another function. You need to make another function call to access that innermost function reference for the .map() callback. JavaScript allows you to immediately invoke returned functions:
  Example Code
  myFunc(1)("hi");
  Immediately invoke the function returned from your addCharacters(char1) call, and pass char2 as the argument.
  */
  // Now that your .map() function is receiving the innermost function reference from addCharacters, it will properly iterate over the elements and pass each element as n to that function. You'll notice that you are not using your match parameter. In JavaScript, it is common convention to prefix an unused parameter with an underscore _. You could also leave the parameter empty like so: (, char1) but it is often clearer to name the parameter for future readability. Prefix your match parameter with an underscore.
  const cellRegex = /[A-J][1-9][0-9]?/gi; // Declare a variable cellRegex to match cell references. It should match a letter from A to J, followed by a digit from 1 to 9, and an optional digit from 0 to 9. Make the regular expression case-insensitive and global.
  const cellExpanded = rangeExpanded.replace(cellRegex, (match) =>
    idToText(match.toUpperCase())
  ); // Declare a cellExpanded variable and assign it the value of calling .replace() on your rangeExpanded variable. Pass it your cellRegex and an empty callback function. The callback function should take a match parameter.
  // Update your callback function to return the result of calling idToText() with match as the argument. Remember that your regular expression is case-insensitive, so you will need to call toUpperCase() on match before passing it to idToText().
  const functionExpanded = applyFunction(cellExpanded); // Now you can start applying your function parser to your evalFormula logic.
  return functionExpanded === x // Like you did with your highPrecedence() function, your evalFormula() function needs to ensure it has evaluated and replaced everything.
    ? functionExpanded
    : evalFormula(functionExpanded, cells);
};

// function to programmatically generate the cells for the spreadsheet.
window.onload = () => {
  // The global window object represents the browser window (or tab). It has an onload property which allows you to define behavior when the window has loaded the entire page, including stylesheets and scripts.
  const container = document.getElementById("container");
  /*
  Functions are ideal for reusable logic. When a function itself needs to reuse logic, you can declare a nested function to handle that logic. Here is an example of a nested function:
  Example Code
  const outer = () => {
  const inner = () => {
  };
  };
  */
  const createLabel = (name) => {
    const label = document.createElement("div"); // Remember that the document object has a .createElement() method which allows you to dynamically create new HTML elements.
    label.className = "label"; // Set the className of the label element to label
    label.textContent = name; // set the textContent to the name parameter.
    container.appendChild(label); // .appendChild() method to add your label element to the container element.
  };
  const letters = charRange("A", "J");
  letters.forEach(createLabel); // You should see some letters appear across the top of your spreadsheet.
  range(1, 99).forEach((number) => {
    createLabel(number); // Remember that range() returns an array, so you can chain array methods directly to the function call. // You should see some numbers appear in your spreadsheet.
    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      /*
        In earlier projects you learned about the setAttribute method. Another way to update an attribute in JavaScript is to use the following syntax:
        Example Code
        el.attribute = value;
        The property names for hyphenated HTML attribute values, such as aria-label, follow camel case, becoming ariaLabel.
        Example Code
        el.ariaLabel = "Aria Label Value";
        */
      input.onchange = update; // In your window.onload function, you need to tell your input elements to call the update function when the value changes. You can do this by directly setting the onchange property.
      container.appendChild(input); // You should now be able to see the cells of your spreadsheet.
    });
  });
};

const update = (event) => {
  const element = event.target; // Since your update event is running as a change event listener, the event parameter will be a change event. The target property of the change event represents the element that changed.
  const value = element.value.replace(/\s/g, ""); // Because the change event is triggering on an input element, the element will have a value property that represents the current value of the input. Use .replace() to remove all whitespace.
  if (!value.includes(element.id) && value.startsWith("=")) {
    // to check if the value does not include the id of the element.
    // Spreadsheet software typically uses = at the beginning of a cell to indicate a calculation should be used, and spreadsheet functions should be evaluated. Check if the first character of value is =
    element.value = evalFormula(
      value.slice(1),
      Array.from(document.getElementById("container").children)
    ); // Now your update() function can actually evaluate formulas. Remember that you wrote the if condition to check that a function was called.
    // The first argument for your evalFormula call needs to be the contents of the cell (which you stored in value). However, the contents start with an = character to trigger the function, so you need to pass the substring of value starting at index 1.
    // You can quickly get all cells from your page by getting the #container element by its id and accessing the children property of the result. Pass that to your evalFormula() call as the second parameter.
    // Unfortunately, that children property is returning a collection of elements, which is array-like but not an array. Wrap your second argument in Array.from() to convert it to an array.
  }
};
