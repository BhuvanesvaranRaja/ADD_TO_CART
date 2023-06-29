// CARASOUEL
let items = document.querySelectorAll(".carousel .carousel-item");

items.forEach((el) => {
  const minPerSlide = 4;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

// CART
const card_items = [];
let total = 0;
const addToCartButtons = document.querySelectorAll(".add-to-cart");
let totalPriceElement = document.getElementById("total_price");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// adding items to cart
function addToCart(event) {
  const product = event.target.parentNode;
  const productName = product.querySelector("h5").innerText;
  const Price = product.querySelector("h4").innerText;
  const productPrice = Price.replace(/[\,₹\.]/g, "");
  console.log(productPrice);
  const Image = event.target.closest(".card").querySelector("img");
  let productImage = Image.getAttribute("src");
  console.log(productImage);

  // item container
  const item = {
    name: productName,
    price: productPrice,
    image: productImage,
  };
  card_items.push(item);
  console.log(card_items);
  updatedCart();

  // total evaluation
  total += parseFloat(productPrice);
  console.log(total);
  totalPriceElement.textContent = "TOTAL : ₹ " + total;
}

// updating the cart display
function updatedCart() {
  let CartDisplay = document.getElementById("items");
  CartDisplay.innerHTML = "";

  card_items.forEach((cartData) => {
    let li = document.createElement("li");
    let template = `
      <div class="template mt-3 text-success d-flex justify-content-evenly">
        <div><img src="${cartData.image}" class="cart_image" alt="error"></div>
        <div>
          <span class="fw-bolder">${cartData.name}</span><br>
          <span class="text-danger fw-bold"> ₹ ${cartData.price}</span><br>
          <button class="remove-btn" onclick="removeItem(event)">remove</button>
          <hr>
        </div>
      </div>`;
    li.innerHTML = template;
    CartDisplay.appendChild(li);
  });
}

// removing item from cart
function removeItem(event) {
  const listItem = event.target.closest(".template.mt-3.text-success");
  const index = Array.from(listItem.parentNode.children).indexOf(listItem);
  const removedItem = card_items.splice(index, 1)[0];
  total -= parseFloat(removedItem.price);
  updatedCart();
  totalPriceElement.textContent = "TOTAL : ₹ " + total;
}
//END
