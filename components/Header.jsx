import { Link } from 'react-router-dom'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import useVehiculos from '../dependencies/stockmanager.jsx'

export default function Header() {
    const Lasesion = { rol: "cliente", sesion: "George" }; 
    const sesionadmin = Lasesion?.rol === "admin";
 const {
        vehiculos,
        carrito,
        setCarrito
    } = useVehiculos();//Dolor de cabeza
    const acabarSesion = () => {
        console.log("Cerrando sesión de prueba...");
    };

    return (
        <Navbar expand="lg" bg="black" data-bs-theme="dark" className="hatecss">
            <Container fluid>
                {/* 2. Componentes de Bootstrap usando as={Link} */}
                <Navbar.Brand as={Link} to="/">Automotora X</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="navbarNav" />
                
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        {sesionadmin ? (
                            <>
                                <Nav.Item>
                                    <span className="nav-link text-white d-flex align-items-center TEST2">
                                        {Lasesion.sesion}
                                    </span>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="btn btn-outline-warning d-flex align-items-center TEST2" to="/admin">
                                        Administración
                                    </Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant="danger" className="d-flex align-items-center" onClick={acabarSesion}>
                                        Cerrar sesión
                                    </Button>
                                </Nav.Item>
                            </>
                        ) : (
                            <Nav.Item>
                                <Link className="btn btn-outline-light d-flex align-items-center TEST2" to="/login">
                                    Administración
                                </Link>
                            </Nav.Item>
                        )}
                    </Nav>

                    <div className="d-flex">
                        <Link className="btn btn-outline-light d-flex align-items-center" to="/carrito">
                            <i className="bi bi-cart3 me-2"></i> Carrito
                            <Badge bg="danger" className="ms-2" id="contador-carrito">
                               {carrito.length}
                            </Badge>
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}