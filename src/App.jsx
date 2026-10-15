import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Login from './pages/Login.jsx';
import Carrito from './pages/Carrito.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<Admin />} />
        
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;