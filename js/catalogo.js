let carrito = JSON.parse(localStorage.getItem('miCarrito')) || [];

const botonesComprar = document.querySelectorAll('.btn-comprar');
const contadorCarrito = document.getElementById('contador-carrito');


if (contadorCarrito) {
    contadorCarrito.textContent = carrito.length;
}

botonesComprar.forEach(boton => {
    
    boton.addEventListener('click', (evento) => {
        
        const botonPresionado = evento.target;
        
        const auto = {
            id: botonPresionado.dataset.id,
            nombre: botonPresionado.dataset.nombre,
            precio: parseInt(botonPresionado.dataset.precio)
        };


        carrito.push(auto);

        contadorCarrito.textContent = carrito.length;
        
        console.log("Carrito actual:", carrito);

        localStorage.setItem('miCarrito', JSON.stringify(carrito));
    });
});