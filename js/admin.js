
const sesion = obtenerSesion();
if (!sesion.rol ||!sesion|| sesion.rol !== "admin") window.location.href = "failsafe.html";
function renderProductos(lista) {
contenedor.innerHTML = "";
lista.forEach(producto => {
contenedor.innerHTML += `

  <div class="col-sm-6 col-lg-4">
 
                <div class="card h-100">
                    <img src=${producto.imagen} class="card-img-top imagen-catalogo" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.flavortext}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <small class="text-muted fw-bold">$${producto.precio.toLocaleString("es-CL")}</small>
                        <button class="btn btn-dark btn-sm btn-editar"
                        data-id="${producto.id}"
                        data-nombre="${producto.nombre}"
                        data-precio="${producto.precio}">
                        Editar
                        </button>
                          <button class="btn btn-dark btn-sm btn-eliminar"
                        data-id="${producto.id}"
                        data-nombre="${producto.nombre}"
                        data-precio="${producto.precio}">
                        Eliminar
                        </button>
                    </div>
                </div>
            </div>

`;
});
}



formProducto.addEventListener("submit", event => {
    event.preventDefault();

    const datos = {
        nombre: document.querySelector("#nombreCarro").value.trim(),
        flavortext: document.querySelector("#flavorText").value.trim(),
        precio: Number(document.querySelector("#precioCarro").value),
        imagen: document.querySelector("#imagenCarro").value.trim()
    };

    const productos = JSON.parse(localStorage.getItem("StockVeh"));
    const nombreDuplicado = productos.some(p =>
        (p.nombre) === datos.nombre && p.id !== productoEditandoId
    );

    if(!datos.nombre || !datos.flavortext || !datos.precio || !datos.imagen){

alert("No pueden haber campos vacíos.");
        return;
    }
    if (nombreDuplicado) {
        
alert("Este vehículo ya existe.");
        return;
    }

    if (productoEditandoId) {
        const indice = productos.findIndex(p => p.id === productoEditandoId);
        productos[indice] = { ...productos[indice], ...datos };
    
alert("Producto actualizado.");
window.location.reload();

    } else {
      
const nuevoId = StockVeh.length ? Math.max(...StockVeh.map(p => p.id)) + 1 : 1;
    productos.push({id:nuevoId,...datos});
     
alert("Producto agregado.");
window.location.reload();

    }
    localStorage.setItem("StockVeh", JSON.stringify(productos));
  productos.forEach(producto => {console.log(producto.nombre+"ID:"+producto.id)})
    modalProducto.hide();
    limpiarFormulario();
});

const modalEliminar = new bootstrap.Modal(document.querySelector("#modalEliminar"));
const tituloModal = document.querySelector("#tituloModalProducto");
const tablaProductos = document.querySelector("#contenedor"); //Este JSS es mayormente una adaptación, pero el código lo entiendo de mi parte.
const modalProducto = new bootstrap.Modal(document.querySelector("#modalProducto"));
let productoEliminarId;

function abrirNuevoProducto() {
    limpiarFormulario();
    tituloModal.textContent = "Nuevo producto";
    modalProducto.show();
}
function limpiarFormulario() {
    formProducto.reset();
    document.querySelector("#errorNombreProducto").textContent = "Ingresa al menos 3 caracteres.";
    formProducto.querySelectorAll(".is-invalid, .is-valid").forEach(el => el.classList.remove("is-invalid", "is-valid"));
    productoEditandoId = null;
}



function acabarSesion() {
    alert("Cerrando sesión.")
    guardarSesion();
window.location.href = "home.html";
}

function abrirEditarProducto(id) {
    const producto = JSON.parse(localStorage.getItem("StockVeh")).find(producto => producto.id === Number(id));
   
    if (!producto) 
        { console.log("Se intentó editar un producto en NULL"); return;}
    productoEditandoId = id;
    tituloModal.textContent = "Editar producto";
    document.querySelector("#nombreCarro").value = producto.nombre;
    document.querySelector("#flavorText").value = producto.flavortext;
    document.querySelector("#precioCarro").value = producto.precio;
    document.querySelector("#imagenCarro").value = producto.imagen;
    modalProducto.show();
}




document.querySelector("#confirmarEliminarProducto").addEventListener("click", () => {
    if (!productoEliminarId) return;
    
    StockVeh = StockVeh.filter(p => p.id !== productoEliminarId);
    carrito = carrito.filter(item => item.id !== productoEliminarId);
    localStorage.setItem("StockVeh", JSON.stringify(StockVeh));
     localStorage.setItem("miCarrito", JSON.stringify(carrito));
    modalEliminar.hide();
    productoEliminarId = null;
    
alert("Vehículo eliminado.");
window.location.reload();

});


tablaProductos.addEventListener("click", event => {
    const boton = event.target.closest("button");
    if (!boton) return;
    const id = Number(boton.dataset.id);
    if (boton.classList.contains("btn-editar")) abrirEditarProducto(id);
    if (boton.classList.contains("btn-eliminar")) {
        productoEliminarId = id;StockVeh
        const producto = JSON.parse(localStorage.getItem("StockVeh")).find(producto => producto.id === Number(id));
        document.querySelector("#nombreProductoEliminar").textContent = producto?.nombre || "este producto";
        modalEliminar.show();
    }
});

document.querySelector("#btn-nuevocarro").addEventListener("click", abrirNuevoProducto);
document.querySelector("#btnCerrarSesion").addEventListener("click", acabarSesion); //Acaben con mi sesión.
renderProductos(StockVeh);
