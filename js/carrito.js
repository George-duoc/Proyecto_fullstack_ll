const contenedorCarrito = document.getElementById('contenedor-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorCarrito = document.getElementById('contador-carrito'); 
const btnComprar = document.getElementById('btn-pagar'); 

let carrito = JSON.parse(localStorage.getItem('miCarrito')) || [];

function renderizarCarrito() {
    contenedorCarrito.innerHTML = '';
    let totalPrecio = 0;

    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<div class="alert alert-secondary text-center">Tu carrito está vacío ): ¡Ve al catálogo a seleccionar una reliquia!</div>';
        totalCarrito.textContent = '0';
        return;
    }

    carrito.forEach((auto, indice) => {
        totalPrecio += auto.precio;

        const itemHtml = `
            <div class="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded border-0">
                <div>
                    <h6 class="mb-0 fw-bold">${auto.nombre}</h6>
                    <small class="text-success fw-bold">$${auto.precio.toLocaleString('es-CL')}</small>
                </div>
                <button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito(${indice})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        
        contenedorCarrito.innerHTML += itemHtml;
    });

    totalCarrito.textContent = totalPrecio.toLocaleString('es-CL');
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    localStorage.setItem('miCarrito', JSON.stringify(carrito));
    renderizarCarrito();
}
btnComprar.addEventListener("click", () => {
    
    if (carrito.length === 0) {alert("No se puede realizar la compra sin productos.");return;}

localStorage.removeItem('miCarrito')
  alert("Compra finalizada.")
window.location.reload();
});

renderizarCarrito();