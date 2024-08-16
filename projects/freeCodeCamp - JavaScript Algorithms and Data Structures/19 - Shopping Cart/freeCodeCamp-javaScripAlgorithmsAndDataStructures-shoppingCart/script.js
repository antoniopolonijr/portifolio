const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");

let isCartShowing = false;

// Using an array will allow you to store multiple products.
const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

// Now that you have your list of products, you can use JavaScript to insert them into the HTML. With this approach, if you decide to add more products, the HTML will automatically reflect that.
products.forEach(({ name, id, price, category }) => {
  // Remember that you can use destructuring to extract multiple values from an array or object in a single statement.
  dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>`; // to display the available products in your HTML.
});

class ShoppingCart {
  // You are already familiar with an HTML class, but JavaScript also has a class. In JavaScript, a class is like a blueprint for creating objects. It allows you to define a set of properties and methods, and instantiate (or create) new objects with those properties and methods.
  constructor() {
    // Classes have a special constructor method, which is called when a new instance of the class is created. The constructor method is a great place to initialize properties of the class.
    this.items = []; // The this keyword in JavaScript is used to refer to the current object. Depending on where this is used, what it references changes. In the case of a class, it refers to the instance of the object being constructed. You can use the this keyword to set the properties of the object being instantiated.
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    // Your ShoppingCart class needs the ability to add items. The first parameter, id, is the id of the product the user has added to their cart. The second parameter, products, is an array of product objects. By using a parameter instead of directly referencing your existing products array, this method will be more flexible if you wanted to add additional product lists in the future.
    const product = products.find((item) => item.id === id); // You need to find the product that the user is adding to the cart.
    const { name, price } = product; // to extract name and price variables from product.
    this.items.push(product); // to push the product into the cart's items array.
    const totalCountPerProduct = {}; // total count of each product that the user has in the cart
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1;
    }); // to update the totalCountPerProduct object.
    // You now have a small bug. When you try to access a property of an object and the property doesn't exist, you get undefined. This means if the dessert isn't already present in the totalCountPerProduct object, you end up trying to add 1 to undefined, which results in NaN. To fix this, you can use the || operator to set the value to 0 if it doesn't exist.
    const currentProductCount = totalCountPerProduct[product.id]; // to get prepared to update the display with the new product the user added.
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${id}`
    ); // You haven't written the code to generate the HTML yet, but if a product has already been added to the user's cart then there will be a matching element which you'll need.
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : (productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `); // to add new HTML to your productsContainer
    // The behaviour of the addItem method needs to change if the product is already in the cart or not. Use undefined for both the truthy and falsy expressions to avoid a syntax error.
  }

  getCounts() {
    return this.items.length; // You need a way to access the total number of items in the cart. The best way to do this is to add another method to your ShoppingCart class, rather than accessing the items array directly.
  }

  // feature is to allow users to clear their cart
  clearCart() {
    if (!this.items.length) {
      // check if the items array is empty. Remember that 0 is a falsy value, so you can use the ! operator to check if the array is empty.
      alert("Your shopping cart is already empty");
      return;
    }
    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    ); // Browsers have a built-in confirm() function which displays a confirmation prompt to the user. confirm() accepts a string, which is the message displayed to the user. It returns true if the user confirms, and false if the user cancels.
    if (isCartCleared) {
      // You only want to clear the cart if the user confirms the prompt.
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = ""; // start clearing the HTML
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    // Part of the total cost will include the tax, so you need to calculate that as well.
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2)); // divided by 100, to convert it to a percent
    // Because of the way computers store and work with numbers, calculations involving decimal numbers can result in some strange behavior. For example, 0.1 + 0.2 is not equal to 0.3. This is because computers store decimal numbers as binary fractions, and some binary fractions cannot be represented exactly as decimal fractions. We want to clean up the number result from your calculation. the .toFixed() method the number 2 as an argument. This will round the number to two decimal places and return a string.
    // The issue with .toFixed() returning a string is that you want to be able to perform calculations with the tax rate. To fix this, you can pass the .toFixed() call (including the calculation) to the parseFloat() function. This will convert the fixed string back into a number, preserving the existing decimal places.
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0); // to update the total price of the cart when the user adds an item.
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`; //  to update the HTML in this method as well
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
}

const cart = new ShoppingCart(); // There is still more functionality that your ShoppingCart class needs, but first you need to be able to test the code you have currently written. You'll need to instantiate a new ShoppingCart object and assign it to a variable.

const addToCartBtns = document.getElementsByClassName("add-to-cart-btn"); // to get all of the Add to cart buttons that you added to the DOM earlier.
[...addToCartBtns].forEach((btn) => {
  // You need to iterate through the buttons in your addToCartBtns variable. However, .getElementsByClassName() returns a Collection, which does not have a forEach method. Use the spread operator on the addToCartBtns variable to convert it into an array. Then, use the forEach method to iterate through the array
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products); // Remember that the id here will be a string, so you need to convert it to a number.
    totalNumberOfItems.textContent = cart.getCounts(); // update the total number of items on the webpage
    cart.calculateTotal();
  });
});

// Your cart currently isn't visible on the webpage. To make it visible
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing; // Remember that you can use the logical not operator ! to invert the value of a boolean.
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show"; // chance the buttom text
  cartContainer.style.display = isCartShowing ? "block" : "none"; // show or hide the cart
  // Now you should be able to see your cart and add items to it.
});

// to make your clear button functional
clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));
// For the callback, you can pass in cart.clearCart directly. However, doing so will not work, because the context of this will be the clearCartBtn element. You need to bind the clearCart method to the cart object. You can do this by passing cart.clearCart.bind(cart) as the callback.
