// function to get the Mean, it is the average value of all numbers in a list.
const getMean = (array) =>
  array.reduce((acc, el) => acc + el, 0) / array.length;
// const sum = array.reduce((acc, el) => acc + el, 0); // clean this logic up a bit. Using the implicit return of an arrow function
// The first step in calculating the mean is to take the sum of all numbers in the list. Arrays have another method, called .reduce(), which is perfect for this situation. The .reduce() method takes an array and applies a callback function to condense the array into a single value.
// Like the other methods, .reduce() takes a callback. This callback, however, takes at least two parameters. The first is the accumulator, and the second is the current element in the array. The return value for the callback becomes the value of the accumulator on the next iteration.
// The .reduce() method takes a second argument that is used as the initial value of the accumulator. Without a second argument, the .reduce() method uses the first element of the array as the accumulator, which can lead to unexpected results. To be safe, it's best to set an initial value. Set the initial value of the accumulator to 0.
// const mean = sum / array.length; // clean this logic up a bit. Using the implicit return of an arrow function
// The next step in calculating the mean is to divide the sum of numbers by the count of numbers in the list.
// return mean; // clean this logic up a bit. Using the implicit return of an arrow function
// You can actually clean this logic up a bit. Using the implicit return of an arrow function, you can directly return the value of the .reduce() method divided by the length of the array, without having to assign any variables.

// function to get the Median. The median is the midpoint of a set of numbers.
const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b); // The first step in calculating the median is to ensure the list of numbers is sorted from least to greatest. Once again, there is an array method ideal for this – the .sort() method.
  // By default, the .sort() method converts the elements of an array into strings, then sorts them alphabetically. This works well for strings, but not so well for numbers. For example, 10 comes before 2 when sorted as strings, but 2 comes before 10 when sorted as numbers. To fix this, you can pass in a callback function to the .sort() method. This function takes two arguments, which represent the two elements being compared. The function should return a value less than 0 if the first element should come before the second element, a value greater than 0 if the first element should come after the second element, and 0 if the two elements should remain in their current positions. To sort your numbers from smallest to largest, pass a callback function that takes parameters a and b, and returns the result of subtracting b from a.
  // The .sort() method mutates the array it's called on. It is generally bad practice to mutate a function parameter, which array is. To fix this, add an empty .slice() call before your .sort() method. The empty .slice() call will make a shallow copy of the array, which you are free to mutate.
  const median =
    array.length % 2 === 0 // check if the length of array is even.
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]]) // If it even, find the middle two numbers, calculate their mean
      : sorted[Math.floor(array.length / 2)]; // If it is odd, return the middle number.
  return median;
  /*
In the next few steps, you'll learn how to determine if an array's length is even or odd, as well as how to find the median. You will then be able to apply what you learned to the getMedian function.
To check if a number is even or odd, you can use the modulus operator %. The modulus operator returns the remainder of the division of two numbers.
Here is an example checking if an array length is even or odd:
Example Code
// check if array length is even
arr.length % 2 === 0;
// check if array length is odd
arr.length % 2 === 1;
If the remainder is 0, the number is even. If the remainder is 1, the number is odd.
const testArr1 = [1, 2, 3, 4, 5];
const testArr2 = [1, 2, 3, 4, 5, 6];
const isEven = testArr2.length % 2 === 0;
console.log(isEven);
To get the median of an array with an odd number of elements, you will need to find and return the middle number.
Here is how to find the middle number of an array with an odd number of elements:
Example Code
arr[Math.floor(arr.length / 2)];
Here is a longer example finding the middle number of an array with 5 elements:
Example Code
const numbers = [1, 2, 3, 4, 5];
const middleNumber = numbers[Math.floor(numbers.length / 2)];
console.log(middleNumber); // 3
The reason why you use Math.floor is because the result of dividing an odd number by 2 will be a decimal. Math.floor will round down to the nearest whole number.
const oddListMedian = testArr1[Math.floor(testArr1.length / 2)];
console.log(oddListMedian);
To find the median of an even list of numbers, you need to find the two middle numbers and calculate the mean of those numbers.
Here is how to find the two middle numbers of an even list of items:
Example Code
// first middle number
arr[arr.length / 2];
// second middle number
arr[(arr.length / 2) - 1];
To find the median, you can use the getMean function which adds the middle numbers and divides the sum by 2.
Example Code
const numbers = [1, 2, 3, 4];
const firstMiddleNumber = numbers[numbers.length / 2];
const secondMiddleNumber = numbers[(numbers.length / 2) - 1];
// result is 2.5
getMean([firstMiddleNumber, secondMiddleNumber]);
const evenListMedian = getMean([
  testArr2[testArr2.length / 2 - 1],
  testArr2[testArr2.length / 2],
]);
console.log(evenListMedian);
Now that you have a better understanding of how to find the median for odd and even lists of numbers, you can remove all your test code from the previous steps.
*/
};

// function to get the Mode, which is the number that appears most often in the list
const getMode = (array) => {
  /* To calculate the occurrence you can use the following approach:
Example Code
const numbersArr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4];
const counts = {};
numbersArr.forEach((el) => {
  if (counts[el]) {
    counts[el] += 1;
  } else {
    counts[el] = 1;
  }
});
Check if the current number is already in the counts object. If it is, increment it by 1. If it is not, set it to 1.
Resulting object. The keys are the numbers from the array and the values are the number of times each number appears in the list:
Example Code
{ 1: 3, 2: 3, 3: 3, 4: 3, 5: 2 } */
  const counts = {};
  // o better understand how the getMode function is going to work, you will need to print out its contents. This will allow you to see what is happening as you build out the function
  array.forEach((el) => (counts[el] = (counts[el] || 0) + 1)); // loop to count the frequency of occurrences of each number in the array.
  // return array; // To see the result, enter the numbers 4, 4, 2, 5 and click on the "Calculate" button. Open up the console to see the following array: [ 2, 4, 4, 5 ]
  // return counts; // To test this, enter the numbers 4, 4, 2, 5 and click Calculate. You should see the following in the console: { '2': 1, '4': 2, '5': 1 }
  /* There are a few edge cases to account for when calculating the mode of a dataset. First, if every value appears the same number of times, there is no mode.
  To calculate this, you will use a Set. A Set is a data structure that only allows unique values. If you pass an array into the Set constructor, it will remove any duplicate values.
  Start by creating an if statement. In the condition, create a Set with new Set() and pass it the Object.values() of your counts object. If the size property of this Set is equal to 1, that tells you every value appears the same number of times. In this case, return null from your function. */
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  // Now you need to find the value that occurs with the highest frequency. You'll use the Object.keys() method for this.
  /* Now you need to sort the values properly. Chain the .sort() method to your Object.keys() call.
  For the callback, you'll need to use the counts object to compare the values of each key. You can use the a and b parameters to access the keys. Then, return the value of counts[b] minus the value of counts[a].
  Finally, access the first element in the array using bracket notation to complete your highest variable. */
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  ); // If multiple numbers in a series occur at the same highest frequency, they are all considered the mode. Otherwise, the mode is the number that occurs most often, that single number is the mode. Thankfully, you can handle both of these cases at once with the .filter() method.
  // the filter method to your latest Object.keys() call. The callback function should return whether the value of counts[el] is equal to your counts[highest].
  return mode.join(", "); // mode is an array, so return it as a string with the .join() method.
};

// function to get the Range, which is the difference between the largest and smallest numbers in the list.
const getRange = (array) => Math.max(...array) - Math.min(...array);
/* You previously learned about the global Math object. Math has a .min() method to get the smallest number from a series of numbers, and the .max() method to get the largest number. Here's an example that gets the smallest number from an array:
  Example Code
  const numbersArr = [2, 3, 1];
  console.log(Math.min(...numbersArr));
  // Expected output: 1 */

// function to get the Variance, The variance of a series represents how much the data deviates from the mean, and can be used to determine how spread out the data are.
const getVariance = (array) => {
  const mean = getMean(array);
  /*
  const differences = array.map((el) => el - mean); // to calculate how far each element is from the mean.
  const squaredDifferences = differences.map((el) => el ** 2); // To square a value, you can use the ** operator.
  const sumSquaredDifferences = squaredDifferences.reduce(
    (acc, el) => acc + el,
    0
  );  // Next, you need to take the sum of the squared differences.
  */
  // With two .map() calls and a .reduce() call, you're creating extra arrays and iterating more times than needed. You should move all of the logic into the .reduce() call to save time and memory.
  const variance =
    array.reduce((acc, el) => {
      const difference = el - mean;
      const squared = difference ** 2;
      return acc + squared;
    }, 0) / array.length; // The final step in calculating the variance is to divide the sum of the squared differences by the count of numbers.
  return variance;
};

// function to get the Standard Deviation, which is the square root of the variance.
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  /*
  To calculate a root exponent, such as  x−−√n
 , you can use an inverted exponent  x1/n
 . JavaScript has a built-in Math.pow() function that can be used to calculate exponents.
Here is the basic syntax for the Math.pow() function:
Example Code
Math.pow(base, exponent);
Here is an example of how to calculate the square root of 4:
Example Code
const base = 4;
const exponent = 0.5;
// returns 2
Math.pow(base, exponent);
  */
  // const standardDeviation = Math.pow(variance, 1 / 2);
  const standardDeviation = Math.sqrt(variance); // The Math object has a .sqrt() method specifically for finding the square root of a number.
  return standardDeviation;
};

// this function is called when the form is submitted <form onsubmit="calculate();">
const calculate = () => {
  const value = document.querySelector("#numbers").value; // to find the number that was entered in the #numbers input field
  const array = value.split(/,\s*/g); // you need to split it into an array of numbers. The .split() method takes a string and splits it into an array of strings. You can pass it a string of characters or a RegEx to use as a separator. For example, string.split(",") would split the string at each comma and return an array of strings. Use the /,\s*/g regex to split the value string by commas. You can tweak it based on the number of spaces separating your values.
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el)); // The value of an input element is always a string, even if the input type is number. You need to convert this array of strings into an array of numbers. To do this, you can use the .map() method. Remember that .map() creates a new array, instead of mutating the original array. // The .map() method takes a callback function as its first argument. This callback function takes a few arguments, but the first one is the current element being processed. The callback function needs to return a value. In this case, you want to return the value of each element converted to a number. You can do this by using the Number() constructor, passing the element as an argument.
  // const filtered = numbers.filter((el) => !isNaN(el)); // chained together to perform multiple operations at once.
  // A user could put any text they want into the input box. You want to make sure that you are only working with numbers. The Number() constructor will return NaN (which stands for "not a number") if the value passed to it cannot be converted to a number. You need to filter these values out – thankfully, arrays have a method specifically for this. The .filter() method will allow you to filter elements out of an array, creating a new array in the process.
  // Much like the .map() method, the .filter() method takes a callback function. The callback function takes the current element as its first argument. The callback function needs to return a Boolean value, which indicates whether the element should be included in the new array. In this case, you want to return true if the element is not NaN (not a number). However, you cannot check for equality here, because NaN is not equal to itself. Instead, you can use the isNaN() method, which returns true if the argument is NaN.
  // Array methods can often be chained together to perform multiple operations at once.
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);
  document.querySelector("#mean").textContent = mean; // To display the value of mean
  // If you test your form with a list of numbers, you should see the mean display on the page. However, this only works because freeCodeCamp's iframe has special settings. Normally, when a form is submitted, the event triggers a page refresh. To resolve this, add return false; after your calculate(); call in the onsubmit attribute. // update the respective HTML element.
  document.querySelector("#median").textContent = median;
  // console.log(getMode(numbers)); for testing
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};
