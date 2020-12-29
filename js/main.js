var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");
var productsContainer = [];
var editInput;

addBtn.onclick = function () {
  if (addBtn.innerHTML == "Add product") {
    addProduct();
  } else {
    editProduct();
  }
  displayProducts();
  clearForm();
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
};

function editProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescInput.value,
  };

  productsContainer[editInput] = product;
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
}

if (localStorage.getItem("myProducts") == null) {
  productsContainer = [];
} else {
  productsContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProducts();
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescInput.value,
  };

  productsContainer.push(product);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
}

function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function displayProducts() {
  var container = "";
  for (var i = 0; i < productsContainer.length; i++) {
    container += ` <tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].description}</td>
        <td><button onclick="getEmpData(${i})"  class="btn btn-outline-warning ">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>`;
  }
  document.getElementById("tableBody").innerHTML = container;
}

function deleteProduct(productIndex) {
  productsContainer.splice(productIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  displayProducts();
}

function searchProduct(searchTerm) {
  var container = "";
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      container += ` <tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].description}</td>
        <td><button onclick="getEmpData(${i})" class="btn btn-outline-primary">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = container;
}

function getEmpData(productIndex) {
  editInput = productIndex;
  productNameInput.value = productsContainer[productIndex].name;
  productPriceInput.value = productsContainer[productIndex].price;
  productCategoryInput.value = productsContainer[productIndex].category;
  productDescInput.value = productsContainer[productIndex].description;
  addBtn.innerHTML = "update";
}

function validateName() {
  var nameRegex = /^[A-Za-z]/;
  if (!nameRegex.test(productNameInput.value)) {
    addBtn.disabled = "true";
  } else {
    addBtn.removeAttribute("disabled");
  }
}

function validatePrice() {
  var priceRegex = /^([0-9])/;
  if (!priceRegex.test(productPriceInput.value)) {
    addBtn.disabled = "true";
  } else {
    addBtn.removeAttribute("disabled");
  }
}

function validateCategory() {
  var categoryRegex = /^([A-Za-z])/;
  if (!categoryRegex.test(productCategoryInput.value)) {
    addBtn.disabled = "true";
  } else {
    addBtn.removeAttribute("disabled");
  }
}

function validateDesc() {
  var descRegex = /^([A-Za-z])/;
  if (!descRegex.test(productDescInput.value)) {
    addBtn.disabled = "true";
  } else {
    addBtn.removeAttribute("disabled");
  }
}

productNameInput.onkeyup = function () {
  validateName();
};
productPriceInput.onkeyup = function () {
  validatePrice();
};
productCategoryInput.onkeyup = function () {
  validateCategory();
};
productDescInput.onkeyup = function () {
  validateDesc();
};
