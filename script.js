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
    "image" : ".media/img/perfumes.jpg",
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
        image : imagen,
        name : nombre,
        price : precio,
        description : descripcion
      }

      let cadena = JSON.stringify(objToPass);

    contenedorProducto.innerHTML += `
      <div class="card">
        <div>
          <div id="imagen" name="imagen">
            <img class="imagen" src="${imagen}"></img>
          </div>
          <div class="nombre" id="nombre" name="nombre">${nombre}</div>
          <br>
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
