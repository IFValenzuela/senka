// Función para agregar productos al carrito
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener carrito del localStorage
    let cartCount = document.querySelector('.cart-count');
    let cartTotal = 0;
  
    // Actualizar el carrito en la cabecera
    cart.forEach(item => {
      cartTotal += item.price * item.quantity;
    });
  
    // Actualizar contador de productos
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
  
  // Función para agregar un producto al carrito
  function addToCart(event) {
    let name = event.target.dataset.name;
    let price = parseFloat(event.target.dataset.price);
    let id = event.target.dataset.id;
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    let productIndex = cart.findIndex(item => item.id === id);
  
    if (productIndex >= 0) {
      // Si el producto ya existe, aumentar la cantidad
      cart[productIndex].quantity += 1;
    } else {
      // Si no existe, agregarlo al carrito
      cart.push({
        id: id,
        name: name,
        price: price,
        quantity: 1
      });
    }
  
    // Guardar el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Actualizar el carrito
    updateCart();
  }
  
  // Asignar el evento de "Añadir al carrito" a cada botón
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  // Inicializar el carrito al cargar la página
  document.addEventListener('DOMContentLoaded', updateCart);
  