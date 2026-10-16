import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
  return (
    <footer className="site-footer bg-dark text-white py-4">
      <Container>
        <Row className="align-items-center g-4">
          <Col xs={12} md={3}>
            <img
              src="/img/Logo-removebg-preview.png"
              className="footer-logo img-fluid"
              alt="Logo Automotora X"
            />
          </Col>

          <Col xs={12} md={4}>
            <h5 className="border-bottom border-secondary pb-2 mb-3">
              ¡Síguenos!
            </h5>
            <ul className="list-unstyled">
              <li>Instagram: @AutomotoraX</li>
              <li>Facebook: Automotora X</li>
            </ul>
          </Col>

          <Col xs={12} md={5}>
            <h5 className="border-bottom border-secondary pb-2 mb-3">
              Contacto
            </h5>
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