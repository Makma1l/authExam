import { checkToken, redirect, logout } from "./utils.js";

const form = document.forms[0];
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const addButton = document.getElementById("btn-add");
const productList = document.getElementById("product-list");

window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();
  if (!hasToken) {
    redirect("/login.html");
  } else {
    checkInputs(); 
  }
});

document.getElementById("logout-btn").onclick = logout;

const products = [];

form.onsubmit = function(event) {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    title: titleInput.value,
    price: parseFloat(priceInput.value),
    description: descriptionInput.value,
  };

  titleInput.value = '';
  priceInput.value = '';
  descriptionInput.value = '';

  products.push(newProduct);
  displayProducts();
  checkInputs(); 
  console.log(products);
};

function displayProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${product.id}, Title: ${product.title}, Price: $${product.price}, Description: ${product.description}`;
    productList.appendChild(listItem);
  });
}

function checkInputs() {
  const isTitleFilled = titleInput.value.trim() !== '';
  const isPriceFilled = priceInput.value.trim() !== '';
  const isDescriptionFilled = descriptionInput.value.trim() !== '';

  addButton.disabled = !(isTitleFilled && isPriceFilled && isDescriptionFilled);
}

titleInput.addEventListener('input', checkInputs);
priceInput.addEventListener('input', checkInputs);
descriptionInput.addEventListener('input', checkInputs);
