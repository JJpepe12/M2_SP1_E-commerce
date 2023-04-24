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
          <div class="col-3">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
              <p class="title">${item.name}</p>
              <p class="price">
                <span>${item.discount}</span>
                <span><del>${item.price}</del></span>
              </p>
              <button type="button" class="btn mb-3" onClick="addFavorites(${item.id})">   
                  <span></span>
                  <div>
                    <span class="material-icons-outlined">favorite_border</span>
                  </div>
              </button>
              <button type="button" class="button-add" onclick="addCart(${item.id})">
                <span class="material-icons-outlined">add</span>Add
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

//2. Añadir productos a favoritos

//3. Escuchar el evento click que lleva a la página de favoritos

document.addEventListener("click", (event) => {
  console.log("Hice click en favoritos", event.target);
  if (event.target.classList.contains('image')) {
      console.log("Hice click aquí");
      console.log(event.target);
      const dataCardAttribute = event.target.getAttribute('name');
      console.log(dataCardAttribute);
  
    const id = event.target.getAttribute("name");
    sessionStorage.setItem("idproduct", JSON.stringify(id));
    window.location.href = "./pages/favorites.html";
  }
});

// 4. Añadir productos al carrito

// 5. Búsqueda de producto por nombre

const filterByName = (termSearch = "", productList) => {
  const productsFiltered = productList.filter((product) =>
    product.name.toLowerCase().includes(termSearch.toLowerCase())
  );
  const result = productsFiltered.length ? productFiltered : productList;

  const messageResult = productFiltered.length ? false : "Este producto no existe.";

  return {
    resultSearch: result,
    messageSearch: messageResult,
  };
};

// 6. Capturamos el input de búsqueda y escuchamos el evento submit 
const formSearch = document.querySelector(".search-bar");

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputSearch = formSearch.children[0];
  const searchTerm = inputSearch.value;

  if (searchTerm) {
    const searchResult = filterByTitle(searchTerm);
    printVideos(containerProducts, searchResult.resultSearch);

    if (searchResult.messageSearch) {
      Swal.fire("Oops!", searchResult.messageSearch, "error");
    }
  } else {
    Swal.fire("Oops!", "No has ingresado un producto para buscar.", "error");
  }
});