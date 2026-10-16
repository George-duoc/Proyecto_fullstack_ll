import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import useVehiculos from '../dependencies/useVehiculos.jsx';

export default function Catalogo() {
  const { vehiculos, setCarrito } = useVehiculos();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [
      ...carritoActual,
      { ...producto, cartId: crypto.randomUUID() },
    ]);
    setToastMessage(`${producto.nombre} se agregó al carrito.`);
    setToastVisible(true);
  };

  return (
    <>
      <Container as="section" className="my-5">
        <h1 className="mb-4 text-uppercase fw-bold">Catálogo</h1>
        <Row className="g-4">
          {vehiculos.map((producto) => (
            <Col sm={6} lg={4} key={producto.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="imagen-catalogo"
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>{producto.flavortext}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <small className="text-muted fw-bold">
                    ${producto.precio.toLocaleString('es-CL')}
                  </small>
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Agregar al carrito
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          show={toastVisible}
          onClose={() => setToastVisible(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
