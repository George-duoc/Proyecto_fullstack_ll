
let carritostore = JSON.parse(localStorage.getItem('miCarrito')) || [];

const botonesComprar = document.querySelectorAll('.btn-comprar');
const contadorCarrito = document.getElementById('contador-carrito');


if (contadorCarrito) {
    contadorCarrito.textContent = carritostore.length;
}

botonesComprar.forEach(boton => {
    
    boton.addEventListener('click', (evento) => {
        
        const botonPresionado = evento.target;
        
        const auto = {
            id: botonPresionado.dataset.id,
            nombre: botonPresionado.dataset.nombre,
            precio: parseInt(botonPresionado.dataset.precio)
        };


        carritostore.push(auto);

        contadorCarrito.textContent = carritostore.length;
        
        console.log("Carrito actual:", carritostore);

        localStorage.setItem('miCarrito', JSON.stringify(carritostore));
    });
});