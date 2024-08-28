// Helper functions to convert between dollars and cents to avoid precision issues with floating-point numbers.
const dollarsToCents = (dollars) => dollars * 100;
const centsToDollars = (cents) => (cents / 100).toFixed(2);

// Initial variables for the price of the item and the cash in the drawer (in dollars)
let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

// Array of currency units and their corresponding values in dollars
const currencyUnits = [
  ["ONE HUNDRED", 100.0],
  ["TWENTY", 20.0],
  ["TEN", 10.0],
  ["FIVE", 5.0],
  ["ONE", 1.0],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01],
];

// Accessing HTML elements
const totalPriceElement = document.getElementById("total-price");
const cashElement = document.getElementById("cash");
const changeDueElement = document.getElementById("change-due");
const cashInDrawerElement = document.getElementById("cash-in-drawer");
const purchaseBtn = document.getElementById("purchase-btn");

// Function to display the current cash in the drawer on the webpage
const displayCashInDrawer = () => {
  totalPriceElement.textContent = `Total Price: $${price.toFixed(2)}`;
  cashInDrawerElement.innerHTML = cid
    .map(
      (currency) => `<p>${currency[0]}: $${Number(currency[1]).toFixed(2)}</p>`
    )
    .join(""); // Creating an HTML p item for each currency unit and its value
};

// Main function to handle the purchase and calculate the change
const handlePurchase = () => {
  if (!cashElement.value) {
    return;
  }

  let cash = parseFloat(cashElement.value); // dollars
  let changeDue = dollarsToCents(cash) - dollarsToCents(price); // calculating change due in cents

  // Check if the customer has provided enough cash
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  // Check if the customer paid the exact amount
  if (cash === price) {
    changeDueElement.textContent =
      "No change due - customer paid with exact cash";
    return;
  }

  // Calculate the total cash in the drawer (in cents)
  let totalCid = cid.reduce((acc, curr) => acc + dollarsToCents(curr[1]), 0);

  // Check if the drawer has enough cash to give the change
  if (totalCid < changeDue) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Calculate the change to give back using available currency units
  let changeArray = [];
  let originalChangeDue = changeDue;

  for (let [unitName, unitValue] of currencyUnits) {
    let currencyAmount = dollarsToCents(
      cid.find((currency) => currency[0] === unitName)[1]
    ); // Find the amount available in the drawer for this unit (in cents)
    let amountToReturn = 0;

    // Determine how much of each currency unit is needed for the change
    while (changeDue >= unitValue * 100 && currencyAmount >= unitValue * 100) {
      changeDue -= unitValue * 100;
      currencyAmount -= unitValue * 100;
      amountToReturn += unitValue * 100;
    }

    // Add the currency unit and amount to the change array if any of that unit is needed
    if (amountToReturn > 0) {
      changeArray.push([unitName, centsToDollars(amountToReturn)]);
      // Update the cash in the drawer for this unit
      cid.find((currency) => currency[0] === unitName)[1] =
        centsToDollars(currencyAmount);
    }
  }

  displayCashInDrawer(); // Update the display of cash in drawer after the transaction

  if (changeDue > 0) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (originalChangeDue === totalCid) {
    // Check if the entire cash in drawer was used
    changeDueElement.innerHTML = `Status: CLOSED ${changeArray
      .map((change) => `<p>${change[0]}: $${change[1]}</p>`)
      .join(" ")}`;
  } else {
    changeDueElement.innerHTML = `Status: OPEN ${changeArray
      .map((change) => `<p>${change[0]}: $${change[1]}</p>`)
      .join(" ")}`;
  }
};

// Event listener for the purchase button click
purchaseBtn.addEventListener("click", handlePurchase);

// Event listener when users press the Enter / Return key.
cashElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handlePurchase();
  }
});

// Display the initial cash in the drawer when the page loads
displayCashInDrawer();
