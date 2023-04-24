// 1. Escuchar el click del logo principal para que devuelva al home

const logo = document.querySelector(".header__image");

logo.addEventListener("click", () => {
  window.location.href = "../index.html";
});