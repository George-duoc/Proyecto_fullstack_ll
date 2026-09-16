let carrito = JSON.parse(localStorage.getItem('miCarrito')) || [];


let StockVeh = [
        {
            id: 1,
            nombre: "Nissan Skyline GT-R R34",
            flavortext:"Lo mejor de la ingeniería JDM, disfrutalo solo en Automotora X.",
            precio: 10000000,
            imagen: "https://preview.redd.it/nissan-skyline-gt-r-r34-one-of-the-most-iconic-japanese-v0-wdc7erjx1plf1.jpeg?width=1080&crop=smart&auto=webp&s=4526eac04a81103a98ab921dd571b940c41b4da8"
        }, {
            id: 2,
            nombre: "Ford Mustang GT",
            flavortext:"Si entiendes lo que significa motor Coyote V8 de 4ta generación, esta es tu opción.",
            precio: 10000000,
            imagen: "https://hips.hearstapps.com/hmg-prod/images/img-2033-jpg-64bec5598090f.jpg?crop=0.872xw:0.655xh;0.0833xw,0.186xh&resize=1400:*"
        }, {
            id: 3,
            nombre: "Lamborghini Huracán",
            flavortext:"El superdeportivo definitivo; furia pura de un v10 atmosférico de 640 caballos de fuerza, inigualable.",
            precio: 10000000,
            imagen: "https://www.lamborghinilongisland.com/imagetag/2343/9/l/New-2019-Lamborghini-Huracan-RWD-Coupe-1553631677.jpg"
        }, {
            id: 4,
            nombre: "Porsche 911 Carrera 2025",
            flavortext:"El Porsche 911 es un automóvil deportivo de lujo icónico, con motor trasero bóxer, diseño 2+2 plazas y una combinación única de deportividad y uso diario.",
            precio: 13999990,
            imagen: "https://www.motortrend.com/files/668d77e37dd43700087fa89b/006-2025-porsche-911-carrera.jpg"
        },{
            id: 5,
            nombre: "Bugatti Chiron 2023",
            flavortext:"El Bugatti Chiron es un hiperdeportivo de lujo con motor W16 de 8 litros y 1.500 CV, capaz de alcanzar hasta 420 km/h.",
            precio: 20000000,
            imagen: "https://cdn.motor1.com/images/mgl/VzMq0z/s1/bugatti-chiron-1500.jpg"
        },{
            id: 6,
            nombre: "Honda Civic Type R 2021",
            flavortext:"El Civic Type R usa un motor 2.0 turbo que supera los 300 hp, con una entrega de potencia lineal y rápida.",
            precio: 9999990,
            imagen: "https://tse1.mm.bing.net/th/id/OIP.gIa0FAn8o0JhYYXHqi9vQQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
        }
    ];



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
                        <button class="btn btn-dark btn-sm btn-comprar"
                        data-id="${producto.id}"
                        data-nombre="${producto.nombre}"
                        data-precio="${producto.precio}">
                        Comprar
                        </button>
                    </div>
                </div>
            </div>

`;
});
}

renderProductos(StockVeh);

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