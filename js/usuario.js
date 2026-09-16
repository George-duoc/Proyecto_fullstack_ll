 const usuario = {
        sesion: "sesion"
    }

        function obtenerSesion(sesion) {
       try {
            const dato = localStorage.getItem(usuario);
            return dato ? JSON.parse(dato) : "null";
        } catch (error) {
            console.error(`No se pudo leer ${clave}:`, error);
            return "null";
        }
    }

    function guardarSesion(seso) {
         localStorage.setItem(sesion, JSON.stringify(seso));
    }