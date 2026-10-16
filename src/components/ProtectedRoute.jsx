import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    // Leemos el disco duro del navegador para ver si existe la sesión
    const sesion = JSON.parse(localStorage.getItem("sesion"));

    // Si la sesión no existe, o si el rol no es "admin", lo expulsamos al instante
    if (!sesion || sesion.rol !== "admin") {
        // Navigate funciona igual que useNavigate, pero se usa para redirecciones directas al renderizar
        return <Navigate to="/login" replace />;
    }

    // Si pasa la validación de arriba, "children" dibuja la página de Admin que está protegiendo
    return children;
}