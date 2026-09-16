 let usuario = {
        sesion: "Lorem Ipsum", 
        rol:null
    }

        function obtenerSesion(sesion) {
       try {
            const dato = localStorage.getItem("usuario");
            return dato ? JSON.parse(dato) : "null";
        } catch (error) {
            return "null";
        }
    }

    function guardarSesion(seso) {
         localStorage.setItem("usuario", JSON.stringify(seso));
    }