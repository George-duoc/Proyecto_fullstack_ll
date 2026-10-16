import { useState, useEffect } from 'react';

function useUsuario() {
   const [usuario, setUsuario] = useState({
        sesion: '',
        rol: ''
    });

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('sesion');

        
            setUsuario(JSON.parse(usuarioGuardado));
        
    }, []);

    return {
        setUsuario,
        usuario
    };
};

export default useUsuario;

//Odio esto.