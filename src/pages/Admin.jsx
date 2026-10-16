import { useState, useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import useVehiculos from '../dependencies/stockmanager.jsx'
import { stockInicial } from '../data/productinic.js'
import useUsuario from '../dependencies/logmanager.jsx'

//Dejo este mensaje para dejar en claro que este port me hizo tenerle mala de forma inmediata a React.
export default function admin() {

    const navigate = useNavigate();
  const [show, setShow] = useState(false);
   const [validated, setValidated] = useState(false);
   const [productoEditandoId, setproductoEditandoId] = useState(null);
 const {
        setUsuario,usuario

    } = useUsuario();

const cerrarsesion= () =>{
   const usuarionv = { rol: ' ' ,
            sesion: ' '
        };
        setUsuario(usuarionv)
        localStorage.setItem("sesion", JSON.stringify(usuarionv));
    alert('Sesión finalizada')
            navigate('/catalogo');  
  
}
    const handleSubmit = (e) => {
        e.preventDefault();
//console.log('Matenme')
        const formulario = e.currentTarget;
        setValidated(true);
//console.log(formulario.currentTarget)
        if (!formulario.checkValidity()) {
             e.stopPropagation();
        return;
        }

        const datos = new FormData(formulario);
      
     //  console.log(datos)
  const nuevoVehiculo = {
             id: vehiculos.length+1,
            nombre: datos.get('nombre')?.trim() ?? novocarrinho.nombre,
            flavortext: datos.get('flavortext')?.trim()  ?? novocarrinho.flavortext,
            precio: Number(datos.get('precio')) ?? novocarrinho.precio,
            imagen: datos.get('imagen')?.trim() ?? novocarrinho.imagen //El valor fácilmente podría no inicializarse y referirse a estos valores, pero ya tengo sueño y ya no me importa.
        };
            const nombreDuplicado = vehiculos.some(p =>
        (p.nombre) === nuevoVehiculo.nombre && p.id !== productoEditandoId
    );



    if (nombreDuplicado) {
        
alert("Este vehículo ya existe.");
        return;
    }

    if (productoEditandoId) {
        const indice = vehiculos.findIndex(p => p.id === productoEditandoId);
        vehiculos[indice] = { ...vehiculos[indice], ...nuevoVehiculo };
     localStorage.setItem('StockVeh', JSON.stringify(vehiculos));
    
//window.location.reload();

    } else {
      
    const nuevostock = [...vehiculos, nuevoVehiculo];
     setVehiculos(nuevostock); 
     localStorage.setItem('StockVeh', JSON.stringify(nuevostock));
alert("Producto agregado.");
//window.location.reload();

    }
  vehiculos.forEach(producto => {console.log(producto.nombre+"ID:"+producto.id)})



        formulario.reset();
        setValidated(false);
    };


     const handleClose = () => {console.log("FALSE")
        setShow(false);
    setproductoEditandoId(null)
    }

useEffect(() => {
  

    if (!usuario.rol) {
        return;
    }

    if (usuario.rol !== 'admin') {
       // console.log('Usuario sin permisos:', { ...usuario });
         navigate('/denied');
    }
}, [usuario.rol, navigate]);


  const handleShow = () => {console.log("TRUE")
    setShow(true) };


    const {
        vehiculos,
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

//////////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////

       
       

    return(<>
        <Modal className="fade"  size="lg"  tabIndex="-1"  show={show} onHide={handleClose}>
        <Modal.Dialog><Modal.Body>
            <Modal.Header className="modal-header"><h2 className="modal-title h5" id="tituloModalProducto">Nuevo producto</h2><Button className="btn-close"  onClick={() => handleClose() }></Button></Modal.Header>
              
              
              
             
                
             
             <Modal.Body className="modal-body"><Row className="row g-3">
                     <Form validated={validated}  noValidate onSubmit={handleSubmit}>
                       <Form.Group className="mb-3">
                    <Col className="md-6">
                    
    
                    <Form.Label htmlFor="nombreCarro" className="form-label">Nombre</Form.Label>  <Form.Control
            type="text"
                min={3}
                required
                placeholder="..."
                autoFocus
                 name="nombre"
              />
              <Form.Control.Feedback type="invalid">
            Proporcione al menos 3 carácteres
          </Form.Control.Feedback>
          </Col>
                    <Col className="md-6"><Form.Label htmlFor="flavorText" className="form-label">Texto descriptivo</Form.Label>
                     <Form.Control
                type="text"
                required
                min={3}
                placeholder="..."
                
                 name="flavortext"
              />
           
              <Form.Control.Feedback type="invalid">
            Proporcione al menos 3 carácteres
          </Form.Control.Feedback>
           </Col>
                    <Col className="md-6"><Form.Label htmlFor="precioCarro" className="form-label">Precio</Form.Label>
                     <Form.Control
                     type="number"
                     required
                min={1}
                placeholder="..."
                 name="precio"
              />
              
              <Form.Control.Feedback type="invalid">
           El precio debe ser mayor a 0
          </Form.Control.Feedback>
          </Col>
                    <Col className="col-12"><Form.Label htmlFor="imagenCarro" className="form-label">URL de imagen</Form.Label> <Form.Control
               type="url"
               required
                placeholder="https/...."
                 name="imagen"
              />
              
              <Form.Control.Feedback type="invalid">
            Ingresa una URL http/https válida.
          </Form.Control.Feedback>
    
          </Col>  </Form.Group>
                <Modal.Footer><Button type="button" className=" btn-secondary" data-bs-dismiss="modal" onClick={() => handleClose()}>Cancelar</Button><Button type="submit" className="btn btn-success">Guardar producto</Button></Modal.Footer>
            </Form>
                </Row></Modal.Body>
          
                
            
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
            <Button id="btnCerrarSesion" variant="danger" onClick={()=>{cerrarsesion()}}>Cerrar sesión</Button></div>
        </div>
         </Container>


           <Container as="section" className="my-5">
            <Row className="g-4">
                {vehiculos.map((producto) => (
                    <Col sm={6} lg={4} key={producto.id}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={producto.imagen || 'https://preview.redd.it/ah-ah-ah-you-didnt-say-the-magic-word-v0-iytfytf88adc1.jpeg?auto=webp&s=2f133c0671dc0ff72f70ada9520d3567ae14a6bd'} alt={producto.nombre || 'Nombre no definido. Por favor reportar bug.'} className="imagen-catalogo" />
                            <Card.Body>
                                <Card.Title>{producto.nombre || 'NOMBRE NO DEFINIDO'}</Card.Title>
                                <Card.Text>{producto.flavortext || 'TEXTO DESCRIPTIVO NO DEFINIDO'}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                <small className="text-muted fw-bold">
                                    ${producto.precio?.toLocaleString("es-CL") ?? 0}
                                </small>
                                <Button variant="dark" size="sm" onClick={() => {handleShow(); setproductoEditandoId(producto.id)}}>
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