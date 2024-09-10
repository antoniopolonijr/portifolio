// HTML elements

const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

// regular expressions

// regular expression to catch help requests
const helpRegex = /please help|assist me/i;
// Regular expressions can take flags to modify their behavior. For instance, the i flag can be used to make the expression ignore case, causing it to match hello, HELLO, and Hello for the expression /hello/.
// The alternate sequence | can be used to match either the text on the left or the text on the right of the |. For example, the regular expression /yes|no/ will match either yes or no.

// regular expression you will work on is one that matches mentions of dollar amounts.
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
// You need to match a number before the text dollars. While you could write out 0|1|2 and so on, regular expressions have a feature that makes this easier.
// A character class is defined by square brackets, and matches any character within the brackets. For example, [aeiou] matches any character in the list aeiou. You can also define a range of characters to match using a hyphen. For example, [a-z] matches any character from a to z.
// Add a character class to match the digits 0 through 9 to your dollarRegex expression - remember the digit must come before the word dollars, and there should be a space between the digit and the word.
// The dollar value may be more than one digit. To match this, the + quantifier can be used - this matches one or more consecutive occurrences. For example, the regular expression /a+/ matches one or more consecutive a characters.
// A capture group is a way to define a part of the expression that should be captured and saved for later reference. You can define a capture group by wrapping a part of your expression in parentheses. For example, /h(i|ey) camper/ would match either hi camper or hey camper, and would capture i or ey in a group.
// Now that you have your capture group, you can mark the entire pattern as an optional match. The ? quantifier matches zero or one occurrence of the preceding character or group. For example, the regular expression /colou?r/ matches both color and colour, because the u is optional.
// One last thing with this expression. You don't actually need the match value from your capture group, so you can turn it into a non-capturing group. This will allow you to group the characters together without preserving the result.
// To create a non-capturing group in a regular expression, you can add ?: after the opening parenthesis of a group. For instance, (?:a|b) will match either a or b, but it will not capture the result.
// While this expression does match 1 hundred dollars, it will not match 1  hundred  dollars, or 10 dollars. Spam messages can and will find a way to exploit flaws in your detection. Time to improve your regex. Replace the first literal space with the \s* expression. The \s character class matches whitespace, such as spaces, tabs, and new lines. The * quantifier means "match the previous character 0 or more times". Replace the second literal space with \s+. The + quantifier means "match the previous character at least one time".

// regular expression will look for strings like free money
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
// Spam messages often use numbers instead of letters to bypass filters. Your regular expression should catch these. "[e3]"
// Your regex should match whole words, not partial words. That is, you do not want to match hands-free money management.
// To do this, start by checking for spaces before and after your pattern. You can do this by using the meta character \s, which will match spaces, tabs, and line breaks.
// If you try entering the message free money, you'll notice it doesn't match your expression! This is because \s doesn't match the beginning or end of the text.
// To match the beginning of the text, you can use the ^ anchor. This asserts that your pattern match starts at the beginning of the full string.
// ou still aren't matching free money yet, because you need to match the end of the string as well.
// Like the ^ anchor, you can use the $ anchor to match the end of the string.

// regular expression will match strings like stock alert.
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
// Character classes can take more than two characters

// regular expression will look for strings like dear friend
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;

// to check more than one regular expression.
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// functions

// function to check if the msg is spam

const isSpam = (msg) => denyList.some((regex) => regex.test(msg));
// function implicitly
// const isSpam = (msg) => false; // (removed) "false" for testing
// const isSpam = (msg) => msg.match(helpRegex); // (removed) Strings have a .match() method, which accepts a regular expression as an argument and determines if the string matches that expression.
// const isSpam = (msg) => helpRegex.test(msg); // (removed) .match() method, you can use the .test() method of a regular expression to test if a string matches the pattern. Unlike .match(), .test() returns a boolean value indicating whether or not the string matches the pattern.
// Arrays have a .some() method. Like the .filter() method, .some() accepts a callback function which should take an element of the array as the argument. The .some() method will return true if the callback function returns true for at least one element in the array.

// event listeners

checkMessageButton.addEventListener("click", () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = "";
});
