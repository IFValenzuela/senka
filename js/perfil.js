
document.addEventListener("DOMContentLoaded", () => {
    const imgElement = document.querySelector(".profile-image img");
    const uploadInput = document.getElementById("upload-image");
  
    // Mostrar imagen guardada
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      imgElement.src = savedImage;
    }
  
    // Subir y guardar nueva imagen
    uploadInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        localStorage.setItem("profileImage", imageData); // reemplaza la anterior
        imgElement.src = imageData; // actualiza la vista inmediatamente
      };
      reader.readAsDataURL(file);
    });
  });
  