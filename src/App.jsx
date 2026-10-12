import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;