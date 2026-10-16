import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

export default function Carrito({ carrito, eliminarDelCarrito, vaciarCarrito }) {
    // Matemática automática: suma todos los precios del arreglo en tiempo real
    const totalPagar = carrito.reduce((acumulador, auto) => acumulador + Number(auto.precio), 0);

    return (
        <Container as="main" className="mt-5 min-vh-100">
            <h2 className="mb-4 text-uppercase fw-bold">Tu Carrito</h2>

            {/* Condición: Si el carrito está vacío, mostramos la alerta. Si no, mostramos la lista. */}
            {carrito.length === 0 ? (
                <Alert variant="secondary" className="text-center">
                    Tu carrito está vacío ): ¡Ve al catálogo a seleccionar una reliquia!
                    <br />
                    <Link to="/catalogo" className="btn btn-primary mt-3">Ir al Catálogo</Link>
                </Alert>
            ) : (
                <Row>
                    {/* Columna Izquierda: Lista de Autos */}
                    <Col md={8}>
                        <ListGroup>
                            {/* Dibujamos la lista usando .map() */}
                            {carrito.map((auto, index) => (
                                <ListGroup.Item 
                                    key={index} 
                                    className="d-flex justify-content-between align-items-center shadow-sm mb-2 rounded border-0"
                                >
                                    <div>
                                        <h6 className="mb-0 fw-bold">{auto.nombre}</h6>
                                        <small className="text-success fw-bold">
                                            ${auto.precio.toLocaleString('es-CL')}
                                        </small>
                                    </div>
                                    <Button 
                                            variant="outline-danger" 
                                            size="sm" 
                                            onClick={() => eliminarDelCarrito(index)} // <-- ¡Cambio clave aquí!
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    {/* Columna Derecha: Tarjeta de Pago */}
                    <Col md={4}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="fw-bold">Resumen</Card.Title>
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Total:</span>
                                    <span className="fs-4 fw-bold text-success">
                                        ${totalPagar.toLocaleString('es-CL')}
                                    </span>
                                </div>
                                <Button 
                                    variant="dark" 
                                    className="w-100 fw-bold" 
                                    // Ejecutamos la compra inyectada desde App.jsx
                                    onClick={vaciarCarrito}
                                >
                                    Proceder a pagar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}