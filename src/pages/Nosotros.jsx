import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Nosotros() {
  return (
    <main>
      <Container as="section" className="mt-5 text-center">
        <h1 className="display-5 fw-bold text-uppercase">Conoce y visita nuestras Sedes!</h1>
        <p className="lead text-muted">Nos comprometemos con entregar un excelente servicio y producto a nuestros clientes.</p>
      </Container>

      <Container as="section" className="my-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="img/taller1.jpg" alt="Sede-1" />
              <Card.Body>
                <Card.Text>
                  Encuentranos en nuestra sede ubicada en <a href="https://www.google.com/maps/search/?api=1&query=Tnte+Hernan+Merino+21%2C+Vina+del+Mar%2C+Chile" target="_blank" rel="noopener noreferrer">Tnte. Hernán Merino 21, Viña del Mar</a>.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="img/automoraarauco-san-miguel-2.jpg" alt="Sede-2" />
              <Card.Body>
                <Card.Text>
                  Encuentranos en nuestra sede ubicada en <a href="https://www.google.com/maps/search/?api=1&query=Arturo+Prat+951%2C+Quilpue%2C+Chile" target="_blank" rel="noopener noreferrer">Arturo Prat 951, Quilpué</a>.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="img/calugas-autos-nuevos-1 (1).jpg" alt="Sede-3" />
              <Card.Body>
                <Card.Text>
                  Encuentranos en nuestra sede en <a href="https://www.google.com/maps/search/?api=1&query=Santa+Maria+248%2C+Valparaiso%2C+Chile" target="_blank" rel="noopener noreferrer">Sta. María 248, Valparaíso</a>.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}