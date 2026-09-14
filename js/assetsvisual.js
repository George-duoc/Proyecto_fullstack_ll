function NavBarGeneric(){
   const navbar = document.querySelector("#navbar");
    if(!navbar) return;
   navbar.innerHTML=`
   <nav class="navbar hatecss navbar-expand-lg bg-black" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="home.html">Automotora X</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="login.html">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="nosotros.html">Nosotros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="autos.html">Catálogo</a>
                        </li>
                    </ul>

                    <div class="d-flex">
                        <a href="carrito.html" class="btn btn-outline-light d-flex align-items-center">
                            <i class="bi bi-cart3 me-2"></i> Carrito
                        </a>
                    </div>

                </div>
            </div>
        </nav>`}

function FooterSitio(){
    const footer = document.querySelector("#footer");
    if (!footer) return;

    footer.innerHTML = `
      <footer class="hatecss bg-dark text-white py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <img src="Logo-removebg-preview.png" class="img-fluid" alt="Logo">
             <p class="mt-2">
              
             </p>
          </div>

          <div class="col-md-3">
            <h5 class="border-bottom border-secondary pb-2 mb-3">Síguenos!</h5>
            <ul class="list-unstyled">
              <li>
                <p>Instagram: @AutomotoraX</p>
              </li>
              <li>
                <p>Facebook: Automotora X</p>
              </li>
            </ul>
          </div>

          <div class="col-md-6">
            <h5 class="border-bottom border-secondary pb-2 mb-3">Contacto</h5>
            <p class="text-white-50 mb-1"><i class="bi bi-envelope me-2"></i>ventas@automotorax.cl</p>
            <p class="text-white-50"><i class="bi bi-telephone me-2"></i>+56 9 1234 5678</p>
          </div>

        </div>

      </div>
    


    </footer>
    `;}
    NavBarGeneric();
    FooterSitio();



