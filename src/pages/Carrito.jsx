import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import useVehiculos from '../dependencies/stockmanager.jsx'
export default


function Carrito() {
    const {
        vehiculos,
        carrito,
        setCarrito
    } = useVehiculos();
     const realizarcompra = () => {
       
        const nuevoCarrito = [];
        
        setCarrito(nuevoCarrito); 
        localStorage.setItem('miCarrito', JSON.stringify(nuevoCarrito));
        console.log("Cómo puede hacer tanto calor con 17 grados");
    };
     const removerdecarrito = (producto) => {
       
        const nuevoCarrito = carrito.splice(producto.id,1);
        
        setCarrito(nuevoCarrito); 
        localStorage.setItem('miCarrito', JSON.stringify(nuevoCarrito));
        console.log("Cómo puede hacer tanto calor con 17 grados");
    };
    return (<>
<Container className=" mt-5">
        <h2 className="mb-4 text-uppercase fw-bold">Tu Carrito</h2>

        <Row className='g-4'>
        
                     {carrito.map((producto) => (
                    <Col sm={6} lg={4} key={producto.id}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="imagen-catalogo" />
                            <Card.Body>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Card.Text>{producto.flavortext}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex j    ustify-content-between align-items-center">
                                <small className="text-muted fw-bold">
                                    ${producto.precio.toLocaleString("es-CL")}
                                </small>
                                <Button variant="dark" size="sm" onClick={() => removerdecarrito(producto)}>
                                    Remover
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
                
            

            <Col className="md-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className=" fw-bold">Resumen</Card.Title>
                        <hr></hr>
                        <div className="d-flex justify-content-between mb-3">
                            <span>Total:</span>
                            <span className="fs-4 fw-bold text-success">
                                $<span id="total-carrito">0</span></span>
                        </div>
                        <Button className="btn-dark w-100 fw-bold" onClick={() => realizarcompra()}>Proceder a pagar</Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    </> 
    )
    }