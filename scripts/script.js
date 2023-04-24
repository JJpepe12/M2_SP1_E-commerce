// 1. Pintar los productos en el main y filtrar por categoría

const getProducts = async (filter) => {
  // Método GET 
  const printProducts = document.getElementById('products')
  const response = await fetch(`http://localhost:3000/products?${filter}`)
  const data = await response.json();
    console.log("data products", data)
  printProducts.innerHTML='';
  data.forEach(item=>{
      printProducts.innerHTML+=`
          <div class="card col-md-4">
            <img src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="title">${item.name}</p>
              <p class="price">
                <span class="green">${item.desc}</span>
                <span><del>${item.price}</del></span>
              </p>
              <button type="button" class="btn mb-3" onClick="addFavorites(${item.id})">   
                  <span></span>
                  <div>
                      <img class="circle" src="./images/icons/favorito.svg" alt="plus">
                  </div>
              </button>
              <button type="button" class="button-add" onclick="addCart(${item.id})">
                <span>
                  Add
                </span>
                <div>
                  <img class="circle" src="./images/icons/add.svg" alt="plus">
                </div>
                
              </button>
            </div>
          </div>
      `
  })
}   
getProducts('')
const filterProducts=(category)=>{
  getProducts('category='+category)
}


const addFavorites= async (id)=>{
  try{
      const data={
          productsId: id
      }
      const response = await fetch(`http://localhost:3000/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });
      alert("producto guardado en favoritos")  
  }catch (error) {
      alert("No se pudo guardar")
  }
}


const addCart = async(productId)=>{
  const response = await fetch(`http://localhost:3000/products/${productId}`)
  const product = await response.json();
  const prevProducts= JSON.parse(localStorage.getItem('shopping')) || []
  const indexProduct = prevProducts.findIndex(el=> el.id===productId)
  if(indexProduct>-1){
      product.cant=prevProducts[indexProduct].cant+1;
      prevProducts.splice(indexProduct,1,product)
  } else{
      product.cant=1
      prevProducts.push(product)
  }

  localStorage.setItem('shopping',JSON.stringify(prevProducts))
  alert("Agregado a carrito")
  fillCart()
}   



//4. Escuchar el evento click que lleva a la página de detalles y reproduce el video. 

document.addEventListener("click", (event) => {
  console.log("Hice click en ", event.target);
  if (event.target.classList.contains('videos__thumbnail')) {
      console.log("Hice click aquí");
      console.log(event.target);
      const dataCardAttribute = event.target.getAttribute('data-video');
      console.log(dataCardAttribute);
  
    const id = event.target.getAttribute("name");
    sessionStorage.setItem("idvideo", JSON.stringify(id));
    window.location.href = "./pages/details.html";
  }
});

// 5. Escuchar evento click para filtrar 

let category = {};
document.addEventListener("click", (event) => {
  switch (event.target.id) {
    case "category__Todos":
      category = arrayVideos;
      printVideos(containerVideos, category);
      break;
    case "category__Música":
      category = arrayVideos.filter(
        (video) => video.seeIn.category === "Música"
      );
      printVideos(containerVideos, category);

      break;
    case "category__Programación":
      category = arrayVideos.filter(
        (video) => video.seeIn.category === "Programación"
      );
      printVideos(containerVideos, category);
      break;
    case "category__Antropología":
      category = arrayVideos.filter(
        (video) => video.seeIn.category === "Antropología"
      );
      printVideos(containerVideos, category);
      break;

  }
});


// 6. Búsqueda de videos por título.

const filterByTitle = (termSearch = "", videosList) => {
  const videosFiltered = videosList.filter((video) =>
    video.seeIn.title.toLowerCase().includes(termSearch.toLowerCase())
  );
  const result = videosFiltered.length ? videosFiltered : videosList;

  const messageResult = videosFiltered.length ? false : "Este video no existe.";

  return {
    resultSearch: result,
    messageSearch: messageResult,
  };
};

// 7. Capturamos el form y luego escuchamos el evento submit 
const formSearch = document.querySelector(".header__containerSearch");

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputSearch = formSearch.children[0];
  const searchTerm = inputSearch.value;

  if (searchTerm) {
    const searchResult = filterByTitle(searchTerm, arrayVideos);
    printVideos(containerVideos, searchResult.resultSearch);

    if (searchResult.messageSearch) {
      Swal.fire("Oops!", searchResult.messageSearch, "error");
    }
  } else {
    Swal.fire("Oops!", "No has ingresado un video para buscar.", "error");
  }
});