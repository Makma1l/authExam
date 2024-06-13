import { checkToken, redirect, logout } from "./utils.js";

const form = document.forms[0];
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const addButton = document.getElementById("btn-add");
const productList = document.getElementById("product-list");

// Check the token and redirect if necessary
window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();
  if (!hasToken) {
    redirect("/login.html");
  } else {
    checkInputs(); // Call checkInputs on page load
  }
});

// Attach the logout function to the logout button
document.getElementById("logout-btn").onclick = logout;

// Array to hold the products
const products = [];

// Form submission handler
form.onsubmit = function(event) {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    title: titleInput.value,
    price: parseFloat(priceInput.value), // Make sure price is a number
    description: descriptionInput.value,
  };

  // Clear the input fields after adding the product
  titleInput.value = '';
  priceInput.value = '';
  descriptionInput.value = '';

  products.push(newProduct);
  displayProducts();
  checkInputs(); // Re-check inputs after clearing them
  console.log(products);
};

// Function to display products in the list
function displayProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${product.id}, Title: ${product.title}, Price: $${product.price}, Description: ${product.description}`;
    productList.appendChild(listItem);
  });
}

// Function to check if all inputs are filled
function checkInputs() {
  const isTitleFilled = titleInput.value.trim() !== '';
  const isPriceFilled = priceInput.value.trim() !== '';
  const isDescriptionFilled = descriptionInput.value.trim() !== '';

  // Enable the button only if all inputs are filled
  addButton.disabled = !(isTitleFilled && isPriceFilled && isDescriptionFilled);
}

// Attach the checkInputs function to the input events of each form field
titleInput.addEventListener('input', checkInputs);
priceInput.addEventListener('input', checkInputs);
descriptionInput.addEventListener('input', checkInputs);
