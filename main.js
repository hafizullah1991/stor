const cart = [];

// Function to add a product to the cart
function addToCart(product) {
  const productBox = product.closest('.product-box');
  const productImage = productBox.querySelector('.product-img').src;
  const productTitle = productBox.querySelector('.product-title').textContent;
  const productPrice = parseFloat(productBox.querySelector('.price').textContent.replace('$', ''));

  const productObj = {
    image: productImage,
    title: productTitle,
    price: productPrice,
    quantity: 1,
  };

  const existingProductIndex = cart.findIndex((item) => item.title === productTitle);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push(productObj);
  }

  updateCartDisplay();
  toggleCart(true);
}

// Function to update the cart display and total
function updateCartDisplay() {
  const cartContent = document.querySelector('.cart-content');
  cartContent.innerHTML = '';

  let totalPrice = 0;

  cart.forEach((product, index) => {
    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');

    cartBox.innerHTML = `
      <img src="${product.image}" alt="" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${product.title}</div>
        <div class="cart-price">$ ${product.price.toFixed(2)}</div>
        <input
          type="number"
          value="${product.quantity}"
          class="cart-quantity"
          data-index="${index}"
        >
      </div>
      <i
        class="bx bxs-trash-alt cart-remove"
        onclick="removeFromCart(${index})"
      ></i>
    `;

    cartContent.appendChild(cartBox);

    totalPrice += product.price * product.quantity;
  });

  const totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;

  const cartQuantityInputs = document.querySelectorAll('.cart-quantity');
  cartQuantityInputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const quantity = parseInt(event.target.value, 10);
      const index = parseInt(event.target.getAttribute('data-index'), 10);
      cart[index].quantity = quantity;
      updateCartDisplay();
    });
  });
  
  // Check if the cart is empty and hide it if so
  if (cart.length === 0) {
    toggleCart(false);
  }
}

// Function to remove a product from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

// Add click event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-cart');
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(button);
  });
});

// Function to toggle the cart visibility
function toggleCart(show) {
  const cart = document.querySelector('.cart');
  if (show) {
    cart.style.display = 'block';
  } else {
    cart.style.display = 'none';
  }
}

// Add a click event listener to the cart icon to toggle the cart
const cartIcon = document.querySelector('#cart-icon');
cartIcon.addEventListener('click', () => {
  toggleCart(true);
});

// Add a click event listener to the "X" button to close the cart
const closeCartButton = document.querySelector('#close-cart');
closeCartButton.addEventListener('click', () => {
  toggleCart(false);
});

// Initialize the cart display
updateCartDisplay();

// slide

let slideIndex = 1;

showSlides(slideIndex);

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.querySelectorAll(".image");
  const dots = document.querySelectorAll(".dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  
  slides.forEach(slide => {
    slide.style.display = "none";
  });

  dots.forEach(dot => {
    dot.className = dot.className.replace(" active", "");
  });

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Automatic slide change every 2 seconds
setInterval(function() {
  changeSlide(1);
}, 5000);

// appreciation

const boxTitles = [
  "If I were AGM I woud be like Megan Joseph",
  "If I were Manager I woud be like Angelina",
  "If I were supervisor I woud be like Rovic",
];

let currentTitleIndex = 0;
let textIndex = 0;
let direction = "forward";
const elements = document.querySelectorAll('.thanks');

function typeText(element, text) {
  if (textIndex >= 0 && textIndex <= text.length) {
    element.textContent = text.slice(0, textIndex);
    if (direction === "forward") {
      textIndex++;
    } else {
      textIndex--;
    }
    setTimeout(() => typeText(element, text), 100);
  } else {
    if (direction === "forward") {
      direction = "backward";
      setTimeout(() => typeText(element, text), 1000);
    } else {
      direction = "forward";
      currentTitleIndex = (currentTitleIndex + 1) % boxTitles.length;
      textIndex = 0;
      elements.forEach(el => el.textContent = '');
      setTimeout(() => typeText(elements[currentTitleIndex], boxTitles[currentTitleIndex]), 1000);
    }
  }
}

typeText(elements[currentTitleIndex], boxTitles[currentTitleIndex]);