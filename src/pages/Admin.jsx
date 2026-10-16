import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import useVehiculos from '../dependencies/useVehiculos.jsx';
import { stockInicial } from '../data/productinic.js';

const formularioVacio = { nombre: '', flavortext: '', precio: '', imagen: '' };

export default function Admin() {
  const { vehiculos, setVehiculos, setCarrito } = useVehiculos();
  const [show, setShow] = useState(false);
  const [vehiculoEditando, setVehiculoEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioVacio);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const abrirFormulario = (vehiculo = null) => {
    setVehiculoEditando(vehiculo);
    setFormulario(
      vehiculo
        ? {
            nombre: vehiculo.nombre,
            flavortext: vehiculo.flavortext,
            precio: String(vehiculo.precio),
            imagen: vehiculo.imagen,
          }
        : formularioVacio,
    );
    setShow(true);
  };

  const guardarVehiculo = (evento) => {
    evento.preventDefault();
    const precio = Number(formulario.precio);
    const imagenValida = (() => {
      try {
        const url = new URL(formulario.imagen);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch {
        return false;
      }
    })();

    if (!Number.isFinite(precio) || precio <= 0 || !imagenValida) {
      setMensaje({
        variant: 'danger',
        texto: 'Ingresa un precio positivo y una URL de imagen http/https válida.',
      });
      return;
    }

    const nombreDuplicado = vehiculos.some(
      (vehiculo) =>
        vehiculo.nombre.trim().toLowerCase() ===
          formulario.nombre.trim().toLowerCase() &&
        vehiculo.id !== vehiculoEditando?.id,
    );
    if (nombreDuplicado) {
      setMensaje({
        variant: 'danger',
        texto: 'Ya existe un vehículo con ese nombre.',
      });
      return;
    }

    const datos = {
      nombre: formulario.nombre.trim(),
      flavortext: formulario.flavortext.trim(),
      precio,
      imagen: formulario.imagen.trim(),
    };

    if (vehiculoEditando) {
      setVehiculos((actuales) =>
        actuales.map((vehiculo) =>
          vehiculo.id === vehiculoEditando.id
            ? { ...vehiculo, ...datos }
            : vehiculo,
        ),
      );
      setMensaje({ variant: 'success', texto: 'Vehículo actualizado.' });
    } else {
      setVehiculos((actuales) => [
        ...actuales,
        {
          id: Math.max(0, ...actuales.map((vehiculo) => vehiculo.id)) + 1,
          ...datos,
        },
      ]);
      setMensaje({ variant: 'success', texto: 'Vehículo agregado.' });
    }

    setShow(false);
  };

  const eliminarVehiculo = (id) => {
    setVehiculos((actuales) =>
      actuales.filter((vehiculo) => vehiculo.id !== id),
    );
    setCarrito((actuales) =>
      actuales.filter((producto) => producto.id !== id),
    );
    setMensaje({ variant: 'success', texto: 'Vehículo eliminado.' });
  };

  const cerrarSesion = () => {
    localStorage.removeItem('sesion');
    window.dispatchEvent(new Event('session-change'));
    navigate('/login');
  };

  return (
    <>
      <Container as="section" className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h1 className="fw-bold mb-0">Panel de administración</h1>
          <div className="d-flex gap-2 flex-wrap">
            <Button variant="success" onClick={() => abrirFormulario()}>
              + Agregar vehículo
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => setVehiculos(stockInicial)}
            >
              Reiniciar catálogo
            </Button>
            <Button variant="danger" onClick={cerrarSesion}>
              Cerrar sesión
            </Button>
          </div>
        </div>

        {mensaje && (
          <Alert
            variant={mensaje.variant}
            dismissible
            onClose={() => setMensaje(null)}
          >
            {mensaje.texto}
          </Alert>
        )}

        <Row className="g-4">
          {vehiculos.map((vehiculo) => (
            <Col sm={6} lg={4} key={vehiculo.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={vehiculo.imagen}
                  alt={vehiculo.nombre}
                  className="imagen-catalogo"
                />
                <Card.Body>
                  <Card.Title>{vehiculo.nombre}</Card.Title>
                  <Card.Text>{vehiculo.flavortext}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                  <strong>
                    ${vehiculo.precio.toLocaleString('es-CL')}
                  </strong>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => abrirFormulario(vehiculo)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminarVehiculo(vehiculo.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Form onSubmit={guardarVehiculo}>
          <Modal.Header closeButton>
            <Modal.Title>
              {vehiculoEditando ? 'Editar vehículo' : 'Agregar vehículo'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="vehiculoNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                minLength={3}
                value={formulario.nombre}
                onChange={(evento) =>
                  setFormulario({ ...formulario, nombre: evento.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="vehiculoDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                value={formulario.flavortext}
                onChange={(evento) =>
                  setFormulario({
                    ...formulario,
                    flavortext: evento.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="vehiculoPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                required
                type="number"
                min="1"
                value={formulario.precio}
                onChange={(evento) =>
                  setFormulario({ ...formulario, precio: evento.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="vehiculoImagen">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                required
                type="url"
                placeholder="https://..."
                value={formulario.imagen}
                onChange={(evento) =>
                  setFormulario({ ...formulario, imagen: evento.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
