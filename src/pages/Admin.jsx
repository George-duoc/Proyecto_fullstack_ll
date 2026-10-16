import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Admin() {
    const navigate = useNavigate();

    // 1. ESTADOS DE LA APLICACIÓN
    const [vehiculos, setVehiculos] = useState([]);
    
    // Estados para controlar los Modales (Visibilidad)
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    
    // Estados para guardar los datos temporales
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
    const [formData, setFormData] = useState({ id: null, nombre: '', flavortext: '', precio: '', imagen: '' });

    // 2. PROTECCIÓN DE RUTA Y CARGA DE DATOS (Se ejecuta al abrir la página)
    useEffect(() => {
        const stockGuardado = JSON.parse(localStorage.getItem("StockVeh")) || [];
        setVehiculos(stockGuardado);
    }, [navigate]);

    // 3. LÓGICA DE FORMULARIO (Crear y Editar)
    const abrirModalFormulario = (producto = null) => {
        if (producto) {
            // Modo Editar: Llenamos el formulario con los datos del auto
            setFormData(producto);
        } else {
            // Modo Crear: Limpiamos el formulario
            setFormData({ id: null, nombre: '', flavortext: '', precio: '', imagen: '' });
        }
        setShowModalForm(true);
    };

    const guardarProducto = (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!formData.nombre || !formData.flavortext || !formData.precio || !formData.imagen) {
            alert("No pueden haber campos vacíos.");
            return;
        }

        let nuevoStock;
        if (formData.id) {
            // EDITAR: Buscamos el auto y lo reemplazamos
            nuevoStock = vehiculos.map(v => v.id === formData.id ? formData : v);
            alert("Producto actualizado.");
        } else {
            // CREAR: Generamos un ID nuevo y lo agregamos a la lista
            const nuevoId = vehiculos.length ? Math.max(...vehiculos.map(v => v.id)) + 1 : 1;
            const nuevoAuto = { ...formData, id: nuevoId, precio: Number(formData.precio) };
            nuevoStock = [...vehiculos, nuevoAuto];
            alert("Producto agregado.");
        }

        // Actualizamos memoria y disco duro
        setVehiculos(nuevoStock);
        localStorage.setItem("StockVeh", JSON.stringify(nuevoStock));
        setShowModalForm(false);
    };

    // 4. LÓGICA DE ELIMINACIÓN
    const abrirModalEliminar = (producto) => {
        setVehiculoSeleccionado(producto);
        setShowModalDelete(true);
    };

    const confirmarEliminacion = () => {
        // Filtramos la lista para dejar todos MENOS el que queremos borrar
        const nuevoStock = vehiculos.filter(v => v.id !== vehiculoSeleccionado.id);
        
        // Actualizamos memoria y disco duro
        setVehiculos(nuevoStock);
        localStorage.setItem("StockVeh", JSON.stringify(nuevoStock));
        
        // También lo borramos del carrito si estaba ahí
        let carrito = JSON.parse(localStorage.getItem("miCarrito")) || [];
        carrito = carrito.filter(item => item.id !== vehiculoSeleccionado.id);
        localStorage.setItem("miCarrito", JSON.stringify(carrito));

        setShowModalDelete(false);
        setVehiculoSeleccionado(null);
        alert("Vehículo eliminado.");
    };

    // 5. CERRAR SESIÓN
    const cerrarSesion = () => {
        alert("Cerrando sesión.");
        localStorage.removeItem("sesion");
        navigate("/");
    };

    return (
        <Container as="main" className="mt-5 min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h1 className="fw-bold mb-1">Panel de Administración</h1>
                <div className="d-flex gap-2">
                    <Button variant="success" onClick={() => abrirModalFormulario()}>+ Agregar Vehículo</Button>
                    <Button variant="outline-danger" onClick={cerrarSesion}>Cerrar sesión</Button>
                </div>
            </div>

            {/* RENDERIZADO DE LA GRILLA DE AUTOS */}
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
                                <small className="text-muted fw-bold">${Number(producto.precio).toLocaleString("es-CL")}</small>
                                <div>
                                    <Button variant="dark" size="sm" className="me-2" onClick={() => abrirModalFormulario(producto)}>Editar</Button>
                                    <Button variant="danger" size="sm" onClick={() => abrirModalEliminar(producto)}>Eliminar</Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* MODAL DE FORMULARIO (Crear/Editar) */}
            <Modal show={showModalForm} onHide={() => setShowModalForm(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? 'Editar producto' : 'Nuevo producto'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={guardarProducto}>
                    <Modal.Body>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" required value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Texto descriptivo</Form.Label>
                                    <Form.Control type="text" required value={formData.flavortext} onChange={(e) => setFormData({...formData, flavortext: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" min="1" required value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label>URL de imagen</Form.Label>
                                    <Form.Control type="url" required value={formData.imagen} onChange={(e) => setFormData({...formData, imagen: e.target.value})} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModalForm(false)}>Cancelar</Button>
                        <Button variant="success" type="submit">Guardar producto</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* MODAL DE ELIMINACIÓN */}
            <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de eliminar <strong>{vehiculoSeleccionado?.nombre}</strong>? También se quitará del carrito si estaba agregado.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalDelete(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmarEliminacion}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}