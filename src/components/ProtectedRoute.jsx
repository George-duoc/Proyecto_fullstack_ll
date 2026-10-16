import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const sesion = JSON.parse(localStorage.getItem("sesion"));

    if (!sesion || sesion.rol !== "admin") {
        return <Navigate to="/login" replace />;
    }

    return children;
}