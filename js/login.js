document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const loginLink = document.querySelector("a[href='login.html']");
    const userProfile = document.getElementById("user-profile");
    const userNameElement = document.getElementById("user-name");
  
    // Mostrar nombre en el header o perfil si existe el elemento
    if (userData?.name) {
      if (userNameElement) {
        userNameElement.textContent = userData.name;
      }
  
      if (loginLink) loginLink.style.display = "none";
      if (userProfile) userProfile.classList.remove("hidden");
    } else {
      if (userProfile) userProfile.classList.add("hidden");
    }
  
    // Capturar envío del formulario de login
    const loginForm = document.querySelector("form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
  
        // Usuarios simulados
        const cuentas = [
          { name: "Admin", email: "admin@senka.com", password: "1234" },
          { name: "Juan Pérez", email: "juan@correo.com", password: "5678" },
          { name: "Ian Valenzuela", email: "a20490739@itmexicali.edu.mx", password: "abcd" }
        ];
  
        const usuario = cuentas.find(c => c.email === username && c.password === password);
  
        if (usuario) {
          localStorage.setItem("user", JSON.stringify({ name: usuario.name, email: usuario.email }));
          alert(`Bienvenido, ${usuario.name}`);
          window.location.href = "index.html";
        } else {
          alert("Credenciales incorrectas");
        }
      });
    }
  });
  
  // Función global para cerrar sesión
  function logout() {
    localStorage.removeItem("user");
    alert("Sesión cerrada.");
    window.location.href = "index.html";
  }
  