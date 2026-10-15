import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import useVehiculos from '../dependencies/stockmanager.jsx'
import { stockInicial } from '../data/productinic.js'
export default function admin() {

      const DummyFunc = (producto) => {
       
        console.log("TODO");
    };
  const [show, setShow] = useState(false);

     const handleClose = () => {console.log("FALSE")
        setShow(false);}
  const handleShow = () => {console.log("TRUE")
    setShow(true) };
    const {
        vehiculos,
        carrito,
        setCarrito,
        setVehiculos
    } = useVehiculos();

     const removerdelaexistencia = (producto) => {
       
        const nuevostock = vehiculos.filter((produ) => produ.id !== producto.id);
        console.log(producto.id)
        setVehiculos(nuevostock); 
        localStorage.setItem('StockVeh', JSON.stringify(nuevostock));
        console.log("Cómo puede hacer tanto calor con 17 grados");
    };
    const reiniciarstock = () => {
       
        setVehiculos(stockInicial); 
        localStorage.setItem('StockVeh', JSON.stringify(stockInicial));
        console.log("Se ha reiniciado el universo");
    };
  const manejodeproducto = (producto) => {  
 const datos = {
        nombre: producto.nombre,
        flavortext: producto.flavortext,
        precio: producto.precio,
        imagen: producto.imagen
    };

    const productos = vehiculos //RECORDAR CAMBIAR MENCIONES DE PRODUCTOS A QUE REFERENCIEN DIRECTAMENTE VARIABLE VEHÍCULOS
    const nombreDuplicado = productos.some(p =>
        (p.nombre) === datos.nombre && p.id !== productoEditandoId
    );

    if(!producto.nombre || !producto.flavortext || !producto.precio || !producto.imagen){

alert("No pueden haber campos vacíos.");
        return;
    }
    if (nombreDuplicado) {
        
alert("Este vehículo ya existe.");
        return;
    }

    if (productoEditandoId) {
        const indice = productos.findIndex(p => p.id === productoEditandoId);
        productos[indice] = { ...productos[indice], ...datos };
    
alert("Producto actualizado.");
//window.location.reload();

    } else {
      
const nuevoId = vehiculos.length ? Math.max(...vehiculos.map(p => p.id)) + 1 : 1;
    vehiculos.push({id:nuevoId,...datos});
     
alert("Producto agregado.");
//window.location.reload();

    }
    localStorage.setItem("StockVeh", JSON.stringify(vehiculos));
  vehiculos.forEach(producto => {console.log(producto.nombre+"ID:"+producto.id)})
    modalProducto.hide();
   // limpiarFormulario();
};

//////////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////



    return(<>
        <Modal className="fade"  size="lg" aria-hidden="true" tabIndex="-1" show={show} onHide={handleClose}>
        <Modal.Dialog><Modal.Body>
            <Modal.Header className="modal-header"><h2 className="modal-title h5" id="tituloModalProducto">Nuevo producto</h2><Button className="btn-close"  onClick={() => handleShow }></Button></Modal.Header>
              <Form id="formProducto" novalidate>
                <div class="modal-body"><div class="row g-3">
                    <Col className="md-6"><Form.Label for="nombreCarro" class="form-label">Nombre</Form.Label>  <Form.Control
                type="email"
                placeholder="..."
                autoFocus
                required
              />
             <div id="errorNombreProducto" class="invalid-feedback">Ingresa al menos 3 caracteres.</div></Col>
                    <Col className="md-6"><Form.Label for="flavorText" class="form-label">Texto descriptivo</Form.Label>
                     <Form.Control
                type="email"
                placeholder="..."
                
                required
              />
              <div class="invalid-feedback">Ingresa al menos 3 caracteres.</div></Col>
                    <Col className="md-6"><Form.Label for="precioCarro" class="form-label">Precio</Form.Label>
                     <Form.Control
                type="email"
                placeholder="..."
                
                required
              />
              <div class="invalid-feedback">El precio debe ser mayor que 0.</div></Col>
                    <Col className="col-12"><Form.Label for="imagenCarro" class="form-label">URL de imagen</Form.Label> <Form.Control
                type="email"
                placeholder="..."
                
                required
              />
                    <div class="invalid-feedback">Ingresa una URL http/https válida.</div></Col>
                </div></div>
                <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-success">Guardar producto</button></div>
            </Form>
            
        </Modal.Body></Modal.Dialog>
    </Modal>
    <Modal className="fade" tabIndex="-1" aria-hidden="false">
        <Modal.Dialog className="modal-dialog"><div className="modal-content">
            <Modal.Header className="modal-header"><h2 className="modal-title h5">Confirmar eliminación</h2><button type="button" className="btn-close" data-bs-dismiss="modal"></button></Modal.Header>
            <Modal.Body className="modal-body">¿Está seguro de eliminar <strong id="nombreProductoEliminar"></strong>? También se quitará del carrito si estaba agregado.</Modal.Body>
            <Modal.Footer className="modal-footer"><Button type="button" variant="secondary" data-bs-dismiss="modal">Cancelar</Button><Button id="confirmarEliminarProducto" type="button" variant="danger">Eliminar</Button></Modal.Footer>
        </div></Modal.Dialog>
    </Modal>

    <Container className="mt-5"> 
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div><h1 className="fw-bold mb-1">Panel de Administración</h1></div>
            <div className="d-flex gap-2">
                <Button id="btn-nuevocarro" variant="success" onClick={() => handleShow()}>+ Agregar Vehículo</Button>
            <Button variant="dark" onClick={ reiniciarstock}>
                Reiniciar stock</Button>
            <Button id="btnCerrarSesion" variant="danger">Cerrar sesión</Button></div>
        </div>
         </Container>


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
                                <Button variant="dark" size="sm" onClick={() => DummyFunc(producto)}>
                                    Editar
                                </Button>
                                <Button variant="dark" size="sm" onClick={() => removerdelaexistencia(producto)}>
                                    Eliminar
                                </Button>
                                
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    )
};