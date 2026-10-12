import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [alertData, setAlertData] = useState({ show: false, variant: '', message: '' });
    const [toastData, setToastData] = useState({ show: false, variant: '', message: '' });

    const navigate = useNavigate();

    const manejarSubmit = (evento) => {
        evento.preventDefault(); 

        setAlertData({ show: false, variant: '', message: '' });

        if (username !== 'admin' || password !== '1234') {
            setAlertData({ show: true, variant: 'danger', message: 'Credenciales incorrectas. Usa admin / 1234 para probar la demo.' });
            setToastData({ show: true, variant: 'danger', message: 'Inicio de sesión no aprobado' });
            return;
        }

        setAlertData({ show: true, variant: 'success', message: 'Inicio de sesión aprobado.' });
        setToastData({ show: true, variant: 'success', message: 'Inicio de sesión aprobado' });
        
        const usuario = { sesion: "admin", rol: "admin" };
        localStorage.setItem("sesion", JSON.stringify(usuario));

        setTimeout(() => {
            navigate('/admin');
        }, 500);
    };

    return (
        <main className="login-container d-flex align-items-center justify-content-center min-vh-100">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow border-0 rounded-4">
                            <Card.Body className="p-4 p-md-5">
                                <h2 className="text-center mb-2">Iniciar sesión</h2>
                                
                                <Alert variant="info" className="text-center mb-4">
                                    Demo disponible con usuario <strong>admin</strong> y contraseña <strong>1234</strong>.
                                </Alert>

                                <Form onSubmit={manejarSubmit}>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label className="fw-semibold">Usuario</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            size="lg"
                                            placeholder="admin" 
                                            required 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label className="fw-semibold">Contraseña</Form.Label>
                                        <InputGroup>
                                            <Form.Control 
                                                type={showPassword ? "text" : "password"} 
                                                size="lg"
                                                placeholder="Ingresa tu contraseña" 
                                                required 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <Button 
                                                variant="outline-secondary" 
                                                onClick={() => setShowPassword(!showPassword)}
                                                title="Mostrar/Ocultar contraseña"
                                            >
                                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>

                                    <div className="d-grid">
                                        <Button variant="primary" size="lg" className="rounded-3" type="submit">
                                            Ingresar a mi cuenta
                                        </Button>
                                    </div>

                                    {alertData.show && (
                                        <Alert variant={alertData.variant} className="mt-3 mb-0">
                                            {alertData.message}
                                        </Alert>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <ToastContainer position="top-end" className="p-3 position-fixed">
                <Toast 
                    show={toastData.show} 
                    onClose={() => setToastData({ ...toastData, show: false })} 
                    delay={3000} 
                    autohide
                    bg={toastData.variant}
                >
                    <div className="d-flex">
                        <Toast.Body className="text-white fw-bold">
                            {toastData.message}
                        </Toast.Body>
                        <Button variant="close" className="me-2 m-auto" onClick={() => setToastData({ ...toastData, show: false })} />
                    </div>
                </Toast>
            </ToastContainer>
        </main>
    );
}