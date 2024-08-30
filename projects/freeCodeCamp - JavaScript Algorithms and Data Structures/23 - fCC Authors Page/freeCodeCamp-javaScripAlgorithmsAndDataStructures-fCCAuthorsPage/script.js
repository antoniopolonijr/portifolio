const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

// Now that you have the data you want, you can use it to populate the UI. But the fetched data contains an array of 26 authors, and if you add them all to the page at the same time, it could lead to poor performance. Instead, you should add 8 authors at a time, and have a button to add 8 more until there's no more data to display.
let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

/*
The Fetch API is a built-in JavaScript interface to make network requests to a server. It has a fetch() method you can use to make GET, POST, PUT, or PATCH requests. In this project, you'll make a GET request to a URL for a JSON file with information about authors on freeCodeCamp News.
Here is how you can make a GET request with the fetch() method:
Example Code
fetch("url-goes-here")

The fetch() method returns a Promise, which is a placeholder object that will either be fulfilled if your request is successful, or rejected if your request is unsuccessful.
If the Promise is fulfilled, it resolves to a Response object, and you can use the .then() method to access the Response.
Here's how you can chain .then() to the fetch() method:
Example Code
fetch("sample-url-goes-here")
  .then((res) => res)
*/
fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
  .then((res) => res.json()) // Open your browser console and expand the Response object to see what it contains. Again, don't terminate the code with a semicolon yet.
  // The data you get from a GET request is not usable at first. To make the data usable, you can use the .json() method on the Response object to parse it into JSON. If you expand the Prototype of the Response object in the browser console, you will see the .json() method there.
  // Remove console.log(res) and implicitly return res.json() instead. "fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json").then((res) => console.log(res));"
  .then((data) => {
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
    // In order to start working with the data, you will need to use another .then() method.Chain another .then() to the existing .then() method. This time, pass in data as the parameter for the callback function. For the callback, use a curly brace because you will have more than one expression. Within your callback function, log data to the console to see what it looks like.
    // To see the authors' names on the page, you need to call the displayAuthors function inside the second .then() method. But before that, you need to assign the author data to the empty authorDataArr array.
    // remove your console.log() statement. Then, assign data to the authorDataArr variable. "console.log(data);"
    // Now authorDataArr is the same as the data you logged to the console a while ago. Log authorDataArr to the console to confirm this.
    // Inside your console.log() statement, add the text "Author Data Array:" as the first argument and authorDataArr as the second argument. Use comma to separate the text from authorDataArr.
    // Now it's time to call the displayAuthors function. But again, you don't want to populate the page with all the authors at once. Instead, you can extract a portion of the authors with the startingIndex and endingIndex variables. The best method to do this is the .slice() array method.
    // First, remove the console log statement showing authorDataArr. Then, call the displayAuthors function with the authorDataArr array and .slice(). Use the startingIndex variable for the starting point and the endingIndex variable for the ending point.
  })
  .catch((err) => {
    authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors</p>`;
    // The .catch() method is another asynchronous JavaScript method you can use to handle errors. This is useful in case the Promise gets rejected. Chain .catch() to the last .then(). Pass in a callback function with err as the parameter. Inside the callback, use console.error() to log possible errors to the console with the text There was an error: ${err}
    // Note: Now you can terminate your code with a semicolon. You couldn't do that in the previous steps because you'll signal to JavaScript to stop parsing your code, which will affect the fetch() syntax.
    // console.error(`There was an error: ${err}`); // what if there's an error and the author data fail to load? Then we need to show an error in the UI. That's exactly what the .catch() method is for – handling errors.Inside the .catch(), remove the console.error() and set the innerHTML of the authorContainer to a p element with the class "error-msg" and text "There was an error loading the authors".
  });

// function to incrementing the startingIndex and endingIndex variables to make the Load More Authors button fetch more authors
const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  // if you click the Load More Authors button a couple of times, you'll see that it won't add more authors to the page. That's because you've reached the end of the authors list. For a better user experience, you should make it clear when there's no more data to display by disabling the button and changing its text
  if (authorDataArr.length <= endingIndex) {
    // meaning there's no more data to load.
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.cursor = "not-allowed"; // If you keep clicking the Load More Authors button until there's no more data to load and the text changes to "No more data to load", the cursor value is still pointer. Why not change the cursor value to not-allowed instead?
    loadMoreBtn.textContent = "No more data to load";
  }
};

// Now you'll create a function to populate the UI with the author data. You will call this function inside the second .then() method.
const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    // index. This will represent the position of each author, and will be useful for pagination.
    authorContainer.innerHTML += `<div id="${index}" class="user-card">
    <h2 class="author-name">${author}</h2>
    <img class="user-img" src="${image}" alt="${author} avatar" />
    <div class="purple-divider"></div>
    <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author}'s author page</a>
    </div>
    `;
    // Some of the author bios are much longer than others. To give the cards a uniform look, you can extract the first 50 characters of each one and replace the rest with an ellipsis ("..."). Otherwise, you can show the entire bio.
  });
};

// to make the Load More Authors button fetch more authors whenever it's clicked.
loadMoreBtn.addEventListener("click", fetchMoreAuthors);
