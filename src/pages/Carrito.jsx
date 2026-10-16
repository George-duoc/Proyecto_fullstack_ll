import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import useVehiculos from '../dependencies/stockmanager.jsx'
export default


function Carrito() {
    const {
        vehiculos,
        carrito,
        setCarrito
    } = useVehiculos();
    
const [alertData, setAlertData] = useState(null);

  const realizarCompra = () => {
    if (carrito.length === 0) {
      setAlertData({
        variant: 'danger',
        message: 'No se puede realizar la compra con el carrito vacío.',
      });
      return;
    }

   
    setAlertData({
      variant: 'success',
      message: 'Compra finalizada. ¡Gracias por elegirnos!',
    });

        const nuevoCarrito = [];
        setCarrito(nuevoCarrito); 
        localStorage.setItem('miCarrito', JSON.stringify(nuevoCarrito));
    
  };

  const removerDelCarrito = (producto) => {
       
        const nuevoCarrito = carrito.filter((produ) => produ.id !== producto.id);
        console.log(producto.id)
        setCarrito(nuevoCarrito); 
        localStorage.setItem('miCarrito', JSON.stringify(nuevoCarrito));}
    return (<>
  <Container as="section" className="my-5">
      <h1 className="mb-4 text-uppercase fw-bold">Tu carrito</h1>
      {alertData && (
        <Alert
          variant={alertData.variant}
          dismissible
          onClose={() => setAlertData(null)}
        >
          {alertData.message}
        </Alert>
      )}
      {carrito.length === 0 && <p>Tu carrito está vacío.</p>}
      <Row className="g-4">
        {carrito.map((producto) => (
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
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removerDelCarrito(producto)}
                >
                  Quitar
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
        <Col sm={12} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold">Resumen</Card.Title>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Total:</span>
                <span className="fs-4 fw-bold text-success">
                  ${carrito.reduce((suma, producto) => suma + producto.precio, 0).toLocaleString('es-CL')}
                </span>
              </div>
              <Button
                variant="dark"
                className="w-100 fw-bold"
                onClick={realizarCompra}
              >
                Proceder a pagar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </> 
    )
    }