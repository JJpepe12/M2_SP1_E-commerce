import { arrayVideos } from "../scripts/data.js";

// Actualizar el array de videos
const videos =
  JSON.parse(sessionStorage.getItem("videos")) || arrayVideos;

// función para pintar el video principal que se va a reproducir
const printVideo = (containerVideos, videoPrincipal) => {
  // Vaciar los contenedores
  containerVideos.innerHTML = "";
  // Recorrer el array y reescribir el HTML para el video principal
  containerVideos.innerHTML = `
  <iframe src=${videoPrincipal.linkVideo}></iframe>
  <section class="videoPrincipal__authorTitle">
    <figure class="videoPrincipal__author">
      <img src=${videoPrincipal.seeIn.imageAuthor} alt=${videoPrincipal.seeIn.author}>
    </figure>
    <h3 class="videoPrincipal__title">${videoPrincipal.seeIn.title}</h3>
  </section>
  <h4 class="infoVideos__viewsAndPublicationYear">${videoPrincipal.seeIn.views} - ${videoPrincipal.seeIn.publicationYear}</h4>`;
}

// Pintar el video principal
document.addEventListener("DOMContentLoaded", () => {
  // 1. Capturar la información que se tiene guardada en el Session Storage
  const idCVideoString =
    JSON.parse(sessionStorage.getItem("idVideo")) ||
    "No hay información en el Session Storage";
  const idVideoNumber = Number(idCVideoString);

  // 2. Hacer la búsqueda del video al cual le hemos dado click
  const videoClick = arrayVideosFinal.find(
    (video) => video.id === idVideoNumber
  );

  // 3. Cambiando el contenido de la etiqueta título con el nombre del video.
  const title = document.getElementById("title");
  title.innerText = videoClick.seeIn.title;

  printVideo(containerVideos, videoClick);
});

//Escuchar el evento click sobre el logo
document.addEventListener("click", (event) => {
  const dataCardAttribute = event.target.getAttribute("data-video");
  if (dataCardAttribute == "videoTube") {
    window.location.href = "../index.html";
  } else if (dataCardAttribute == "videos") {
    const idVideo = event.target.getAttribute("name");
    sessionStorage.setItem("idVideo", JSON.stringify(idVideo));
    window.location.href = "../pages/details.html";
  }
});