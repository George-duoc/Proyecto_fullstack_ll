
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useVehiculos from '../dependencies/stockmanager.jsx'


export default
 function Catalogo() {
 const {
        vehiculos,
        carrito,
        setCarrito
    } = useVehiculos();
    const agregarAlCarrito = (producto) => {
        let productonuevo={
        id: carrito.length+1,
        nombre: producto.nombre,
        flavortext: producto.flavortext,
        precio: producto.precio,
        imagen: producto.imagen};
        const nuevoCarrito = [...carrito, productonuevo];
        
        setCarrito(nuevoCarrito); 
        localStorage.setItem('miCarrito', JSON.stringify(nuevoCarrito));
        console.log("Agregado:", producto.nombre);
    };

    return (
        <Container as="section" className="my-5">
            <Row className="g-4">
                {vehiculos.map((producto) => (
                    <Col sm={6} lg={4} key={producto.id}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="imagen-catalogo" />
                            <Card.Body>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Card.Text>{producto.flavortext}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                <small className="text-muted fw-bold">
                                    ${producto.precio.toLocaleString("es-CL")}
                                </small>
                                <Button variant="dark" size="sm" onClick={() => agregarAlCarrito(producto)}>
                                    Comprar
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}