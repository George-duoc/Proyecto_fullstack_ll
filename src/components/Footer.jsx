import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
    return (
        <footer className="hatecss bg-dark text-white py-5">
            <Container>
                <Row>
                    <Col md={3}>
                        <img src="img/Logo-removebg-preview.png" className="img-fluid" alt="Logo Automotora X" />
                    </Col>

                    <Col md={3}>
                        <h5 className="border-bottom border-secondary pb-2 mb-3">¡Síguenos!</h5>
                        <ul className="list-unstyled">
                            <li>
                                <p>Instagram: @AutomotoraX</p>
                            </li>
                            <li>
                                <p>Facebook: Automotora X</p>
                            </li>
                        </ul>
                    </Col>

                    <Col md={6}>
                        <h5 className="border-bottom border-secondary pb-2 mb-3">Contacto</h5>
                        <p className="text-white-50 mb-1">
                            <i className="bi bi-envelope me-2"></i>ventas@automotorax.cl
                        </p>
                        <p className="text-white-50">
                            <i className="bi bi-telephone me-2"></i>+56 9 1234 5678
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}