import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import useVehiculos from '../dependencies/stockmanager.jsx'
import useUsuario from '../dependencies/logmanager.jsx'

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem('sesion')) ?? null;
  } catch (error) {
    console.error('No se pudo leer la sesión guardada.', error);
    return null;
  }
}

export default function Header() {
  const { carrito } = useVehiculos();
    const {
        setUsuario,usuario
    } = useUsuario();
  useEffect(() => {
    const actualizarSesion = () => setUsuario(leerSesion());
    window.addEventListener('session-change', actualizarSesion());
    

    return () => window.removeEventListener('session-change', actualizarSesion());
  }, []);

  return (
    <Navbar expand="lg" bg="black" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Automotora X
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogo">
              Catálogo
            </Nav.Link>
          </Nav>
          <Nav className="align-items-lg-center gap-2">
            {usuario?.rol === 'admin' ? (
              <>
                <Nav.Item className="text-white px-2">{usuario.sesion}</Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/admin"
                  className="btn btn-outline-warning"
                >
                  Administración
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login   
              </Nav.Link>
            )}
            <Nav.Link
              as={Link}
              to="/carrito"
              className="btn btn-outline-light d-flex align-items-center"
            >
              <i className="bi bi-cart3 me-2" aria-hidden="true" />
              Carrito
              <Badge bg="danger" className="ms-2">
                {carrito.length}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}