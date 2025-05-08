// Contador de visitas
let visits = localStorage.getItem("visits") || 0;
visits++;
localStorage.setItem("visits", visits);
console.log(`Esta página ha sido visitada ${visits} veces.`);

// Formulario de reserva
document.getElementById("reservationForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("¡Gracias por tu reserva! Pronto nos pondremos en contacto.");
});

// Mostrar un mensaje dinámico al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById("intro");
  const mensaje = document.createElement("p");
  mensaje.textContent = "¡Explora nuestras nuevas funciones interactivas!";
  intro.appendChild(mensaje);
});

// Array para almacenar los productos en el carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para agregar productos al carrito
function addToCart(event) {
  const name = event.target.dataset.name;
  const price = parseFloat(event.target.dataset.price);
  const id = event.target.dataset.id;

  // Verificar si el producto ya está en el carrito
  const existingProductIndex = cart.findIndex(item => item.id === id);

  if (existingProductIndex !== -1) {
    // Si el producto ya existe, aumentar la cantidad
    cart[existingProductIndex].quantity += 1;
  } else {
    // Si no existe, agregarlo al carrito
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1
    });
  }

  // Guardar el carrito en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Mostrar el mensaje de producto agregado
  showAddToCartMessage();

  // Actualizar el contador del carrito en la página
  updateCartCount();
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Seleccionar todos los botones de agregar al carrito y añadir el evento
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', addToCart);
});

// Función para renderizar los productos en el carrito
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = ""; // Limpiar tabla
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = (item.price * item.quantity).toFixed(2);
    total += parseFloat(subtotal);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${subtotal}</td>
      <td>
        <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
      </td>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1); // Eliminar el producto del array
  localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar localStorage
  renderCart(); // Volver a renderizar el carrito
}

// Función para mostrar el mensaje emergente
function showAddToCartMessage() {
  const message = document.getElementById('add-to-cart-message');
  message.classList.add('show');  // Mostrar el mensaje
  setTimeout(() => {
    message.classList.remove('show');  // Ocultar el mensaje después de 3 segundos
  }, 3000);  // 3 segundos
}

// Renderizar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  renderCart();
  updateCartCount(); // Asegurarse de que el contador se actualiza al cargar la página
});
