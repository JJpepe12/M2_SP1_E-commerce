// 1. Escuchar el click del logo principal para que devuelva al home

const logo = document.querySelector(".header__figure");

logo.addEventListener("click", () => {
  window.location.href = "../index.html";
});

//2. Pintar los productos favoritos