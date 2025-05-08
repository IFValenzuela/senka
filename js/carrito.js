let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const emptyMessage = document.getElementById("empty-cart-message");
  const finalizarBtn = document.querySelector(".checkout-btn");
  const vaciarBtn = document.querySelector(".clear-cart-btn");

  cartItems.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    emptyMessage.style.display = "block";
    finalizarBtn.style.display = "none";
    vaciarBtn.style.display = "none";
    cartTotal.textContent = "0.00";
    updateCartCount();
    return;
  } else {
    emptyMessage.style.display = "none";
    finalizarBtn.style.display = "inline-block";
    vaciarBtn.style.display = "inline-block";
  }

  carrito.forEach((item, index) => {
    const cantidad = item.cantidad || item.quantity;
    const precioUnitario = item.precio || item.price;
    const subtotal = precioUnitario * cantidad;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nombre || item.name}</td>
      <td>
        <div class="quantity-control">
          <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
          <span class="qty-value">${cantidad}</span>
          <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
        </div>
      </td>
      <td>$${precioUnitario.toFixed(2)}</td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button></td>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = total.toFixed(2);

  // Eventos de botones +/-
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      const action = btn.dataset.action;
      let cantidadActual = carrito[index].cantidad || carrito[index].quantity;

      if (action === "increase") {
        cantidadActual++;
      } else if (action === "decrease" && cantidadActual > 1) {
        cantidadActual--;
      }

      carrito[index].cantidad = cantidadActual;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCart();
      updateCartCount();
    });
  });
}

function removeFromCart(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCart();
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || item.quantity), 0);

  if (cartCount) {
    if (totalItems > 0) {
      cartCount.textContent = totalItems;
      cartCount.style.display = "inline-block";
    } else {
      cartCount.textContent = "";
      cartCount.style.display = "none";
    }
  }
}

document.querySelector(".checkout-btn")?.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Guardar en historial
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  const fecha = new Date().toLocaleString("es-MX");
  historial.push({
    fecha,
    productos: [...carrito]
  });
  localStorage.setItem("historial", JSON.stringify(historial));

  alert("¡Gracias por tu compra! Se ha guardado tu pedido en el historial.");
  carrito = [];
  localStorage.removeItem("carrito");
  renderCart();
  updateCartCount();
});

document.querySelector(".clear-cart-btn")?.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }

  if (confirm("¿Deseas vaciar todo el carrito?")) {
    carrito = [];
    localStorage.removeItem("carrito");
    renderCart();
    updateCartCount();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
