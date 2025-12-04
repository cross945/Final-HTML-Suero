console.log("Test test");

let productos = [
  {
    "id" : 1111,
    "image" : "media/img/cestoropa.jpg",
    "name" : "Servicios de Valet",
    "price" : 3000,
    "description" : "Lavado y secado incluído, hasta 3 kilos por valet."
  },
  {
    "id" : 2222,
    "image" : "media/img/plancha.jpg",
    "name" : "Planchado por prenda.",
    "price" : 500,
    "description" : "Planchado de camisas y ropa, plancha a vapor."
  },
  {
    "id" : 3333,
    "image" : "media/img/tinto.jpg",
    "name" : "Lavado a seco / Tintoreria",
    "price" : 7000,
    "description" : "Servicios de tintorería y lavado a seco."
  },
  {
    "id" : 4444,
    "image" : "media/img/perfumes.jpg",
    "name" : "Perfumes",
    "price" : 2000,
    "description" : "Botella de medio litro. Include pulverizador."
  },
  {
    "id" : 5555,
    "image" : "media/img/vestido.jpg",
    "name" : "Vestidos de fiesta",
    "price" : 15000,
    "description" : "Limpieza de vestidos de fiesta y casamiento, al seco."
  },
  {
    "id" : 6666,
    "image" : "media/img/maquina.jpg",
    "name" : "Perfumes",
    "price" : 2500,
    "description" : "Arreglos, parches y otro tipo de reparaciones."
  }
];


let productosContainer = document.getElementById('productos');
let contenedorProducto = document.createElement('div');
contenedorProducto.classList.add('contenedor-producto');

function loadProducts() {
  try {
    productos.forEach(producto => {
      
      let prodId = producto.id;
      let imagen = producto.image.replace("'", "`");
      let nombre = producto.name.replace("'", "`");
      let precio = producto.price;
      let descripcion = producto.description.replace("'", "`");

      let objToPass = {
        id : prodId,
        image : imagen ,
        name : nombre,
        price : precio,
        description : descripcion
      }

      let cadena = JSON.stringify(objToPass);

    contenedorProducto.innerHTML += `
      <div class="card">
        <div>
          <div class="nombre" id="nombre" name="nombre">${nombre}</div>
          <br>
          <div id="imagen" name="imagen" >
            <img class="imagen" src="${imagen}"></img>
          </div>
          <div class="precio" id="precio" name="precio">$${precio}</div>
          <br>
          <div>
            <div id="description${prodId}" class="description">
              ${descripcion}
            </div>
          </div>
          <div class="botonera" id="botonera${prodId}">
            <button onclick='addWishList(${cadena})' class="btn-add" value="Comprar">Comprar</button>
          </div>
        </div>
      </div>
    `;
    productosContainer.append(contenedorProducto);
    });
    } catch (error) {
    console.log(error);
  }
}



function addWishList(data) {
  console.log("Dentro de addWish");
  const prodToAdd = {
    "id": data.id,
    "favId": Date.now(),
    "price": data.price,
    "name": data.name,
    "image": data.image
  }
  let cadena = JSON.stringify(prodToAdd);
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(prodToAdd.favId, cadena);
    location.reload();
  }
  return false;
}
document.addEventListener("DOMContentLoaded", loadProducts);

const contenedorFavoritos = document.createElement('div');
contenedorFavoritos.classList.add('contenedor-favoritos');

let seccionFavs = document.getElementById("seccion_favs");

let totalFavoritos = document.getElementById('item_cantidad');

let precioTotal = document.getElementById('precio_total');

function loadFavourites() {
  try {
    let totalPrice = 0;
    if(localStorage.length > 0) {
      seccionFavs.style.display = "block";
      totalFavoritos.innerText += localStorage.length;
    }
    Object.keys(localStorage).forEach(function(key) {
      let item = JSON.parse(localStorage.getItem(key));
      totalPrice += item.price;
      contenedorFavoritos.innerHTML += `
            <div class="card-fav">
              <img id="imagen" src="${item.image}"></img>
              <h5>${item.price} $</h5>
              <h5>${item.name}</h5>
              <div>
                <button onclick="eliminar(${item.favId})" class="btn-del" value="Eliminar">Eliminar ❌</button>
              </div>
            </div>
        `;
    });
    precioTotal.innerText = 'Total : '.concat(totalPrice).concat(' $');
    seccionFavs.appendChild(contenedorFavoritos);
    } catch (error) {
    console.error("Error al obtener los favoritos:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadFavourites);

function eliminar(id) {
  let idx = id.toString();
  console.log(idx);
  localStorage.removeItem(idx);
  actualizarPagina();
}

const btnDeleteAll = document.getElementById('delete_all');
btnDeleteAll.addEventListener('click', eliminarDeseados);

function eliminarDeseados() {
  try {
    localStorage.clear();
    actualizarPagina();
  } catch(error) {
    console.log(error);
  }
}

function actualizarPagina() {
  location.reload();
}
