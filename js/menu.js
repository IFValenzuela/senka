const productos = {
    "Entradas": [
      {
        nombre: "Sashimi de Atún",
        descripcion: "Atún fresco en láminas con salsa de soya.",
        precio: 28.00,
        img: "../img/Sashimi.jpg"
      },
      {
        nombre: "Tartar de Salmón",
        descripcion: "Salmón marinado, aguacate y aceite de trufa.",
        precio: 32.00,
        img: "../img/Tartar.jpg"
      },
      {
        nombre: "Gyozas de Pollo",
        descripcion: "Empanadillas japonesas de pollo con cebollín.",
        precio: 22.00,
        img: "../img/gyozas.jpg"
      },
      {
        nombre: "Edamame Trufado",
        descripcion: "Edamames con aceite de trufa y sal marina.",
        precio: 18.00,
        img: "../img/edamame.jpg"
      },
      {
        nombre: "Ceviche de Corvina",
        descripcion: "Corvina fresca curada en cítricos con ají.",
        precio: 24.00,
        img: "../img/ceviche.jpg"
      }
    ],
    "Platos Principales": [
      {
        nombre: "Salmón a la Parrilla",
        descripcion: "Salmón con verduras y arroz jazmín.",
        precio: 48.00,
        img: "../img/salmon.jpg"
      },
      {
        nombre: "Filete de Res Wagyu",
        descripcion: "Wagyu con puré de batata y espárragos.",
        precio: 85.00,
        img: "../img/wagyu.jpg"
      },
      {
        nombre: "Pargo al Horno",
        descripcion: "Pargo al horno con jengibre y arroz de coco.",
        precio: 55.00,
        img: "../img/pargo.jpg"
      },
      {
        nombre: "Ramen de Cerdo",
        descripcion: "Caldo de cerdo con fideos y huevo.",
        precio: 42.00,
        img: "../img/ramen.jpg"
      },
      {
        nombre: "Tonkatsu con Arroz",
        descripcion: "Costillas empanizadas con arroz blanco.",
        precio: 38.00,
        img: "../img/tonkatsu.jpg"
      }
    ],
    "Postres": [
      {
        nombre: "Mochi de Té Verde",
        descripcion: "Helado de té verde con salsa de frambuesa.",
        precio: 18.00,
        img: "../img/mochi.jpg"
      },
      {
        nombre: "Cheesecake Japonés",
        descripcion: "Cheesecake suave con fresas y crema.",
        precio: 22.00,
        img: "../img/cheescake.jpg"
      },
      {
        nombre: "Helado de Sésamo Negro",
        descripcion: "Helado artesanal con salsa dulce.",
        precio: 20.00,
        img: "../img/sesamo.jpg"
      },
      {
        nombre: "Tarta de Frambuesa",
        descripcion: "Tarta de frambuesa con crema de limón.",
        precio: 24.00,
        img: "../img/tarta.jpg"
      },
      {
        nombre: "Flan de Matcha",
        descripcion: "Flan de matcha con caramelo y crema.",
        precio: 18.00,
        img: "../img/flan.jpg"
      }
    ]
  };
  
  const contenedor = document.getElementById("catalogo");
  
  function generarCatalogo() {
    Object.entries(productos).forEach(([categoria, platillos]) => {
      const categoriaDiv = document.createElement("div");
      categoriaDiv.className = "menu-category";
  
      const titulo = document.createElement("h3");
      titulo.textContent = categoria;
      categoriaDiv.appendChild(titulo);
  
      const itemsDiv = document.createElement("div");
      itemsDiv.className = "menu-items";
  
      platillos.forEach((p, index) => {
        const item = document.createElement("div");
        item.className = "menu-item";
        item.innerHTML = `
          <img src="${p.img}" alt="${p.nombre}">
          <div class="menu-description">
            <h4>${p.nombre}</h4>
            <p>${p.descripcion}</p>
            <p class="price">$${p.precio.toFixed(2)}</p>
            <button class="add-to-cart" onclick="agregarAlCarrito('${categoria}', ${index})">Agregar al carrito</button>
          </div>
        `;
        itemsDiv.appendChild(item);
      });
  
      categoriaDiv.appendChild(itemsDiv);
      contenedor.appendChild(categoriaDiv);
    });
  }
  
  function toggleCatalogo() {
    contenedor.style.display = contenedor.style.display === "none" ? "block" : "none";
  }
  
  function agregarAlCarrito(categoria, index) {
    const producto = productos[categoria][index];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    const existe = carrito.findIndex(p => p.nombre === producto.nombre);
    if (existe >= 0) {
      carrito[existe].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`Agregado al carrito: ${producto.nombre}`);
  }
  
  generarCatalogo();
  