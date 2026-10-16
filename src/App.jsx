import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Carrito from './pages/Carrito.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  // 1. Memoria global del carrito
  const [carrito, setCarrito] = useState([]);

  // 2. Cargar datos del disco duro al abrir la página
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('miCarrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  // 3. Función para agregar (Se la damos al Catálogo)
  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    localStorage.setItem('miCarrito', JSON.stringify(nuevoCarrito));
    alert("¡Vehículo agregado!");
  };

  const eliminarDelCarrito = (indiceABorrar) => {
    const nuevoCarrito = [...carrito]; 
    nuevoCarrito.splice(indiceABorrar, 1); 
    
    setCarrito(nuevoCarrito); // 3. Actualizamos la RAM
    localStorage.setItem('miCarrito', JSON.stringify(nuevoCarrito)); 
  };

  const vaciarCarrito = () => {
    if (carrito.length === 0) {
      alert("No se puede realizar la compra sin productos.");
      return;
    }
    setCarrito([]); 
    localStorage.removeItem('miCarrito'); 
    alert("Compra finalizada.");
  };

  return (
    <BrowserRouter>
      <Header carrito={carrito} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/catalogo" element={<Catalogo agregarAlCarrito={agregarAlCarrito} />} />
        
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        
        <Route 
          path="/carrito" 
          element={
            <Carrito 
              carrito={carrito} 
              eliminarDelCarrito={eliminarDelCarrito} 
              vaciarCarrito={vaciarCarrito} 
            />
          } 
        />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;