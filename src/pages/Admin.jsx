import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
export default function admin() {
    return(<>
        <Modal className="fade" id="modalProducto" tabindex="-1" aria-hidden="true">
        <Modal.Dialog className="modal-lg"><Modal.Body className="modal-content">
            <Modal.Header className="modal-header"><h2 className="modal-title h5" id="tituloModalProducto">Nuevo producto</h2><Button className="btn-close" data-bs-dismiss="modal"></Button></Modal.Header>
            
            
        </Modal.Body></Modal.Dialog>
    </Modal>
    <Modal className="fade" id="modalEliminar" tabindex="-1" aria-hidden="false">
        <Modal.Dialog className="modal-dialog"><div className="modal-content">
            <Modal.Header className="modal-header"><h2 className="modal-title h5">Confirmar eliminación</h2><button type="button" className="btn-close" data-bs-dismiss="modal"></button></Modal.Header>
            <Modal.Body className="modal-body">¿Está seguro de eliminar <strong id="nombreProductoEliminar"></strong>? También se quitará del carrito si estaba agregado.</Modal.Body>
            <Modal.Footer className="modal-footer"><Button type="button" variant="secondary" data-bs-dismiss="modal">Cancelar</Button><Button id="confirmarEliminarProducto" type="button" variant="danger">Eliminar</Button></Modal.Footer>
        </div></Modal.Dialog>
    </Modal>

    <Container className="mt-5"> 
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div><h1 className="fw-bold mb-1">Panel de Administración</h1></div>
            <div className="d-flex gap-2"><Button id="btn-nuevocarro" variant="success">+ Agregar Vehículo</Button><Button id="btnCerrarSesion" variant="danger">Cerrar sesión</Button></div>
        </div>
         </Container>
        </>
    )
};