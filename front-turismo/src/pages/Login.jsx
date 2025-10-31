import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useUserStore();

  // ✅ Si el usuario ya está logueado, redirigimos al dashboard automáticamente
  useEffect(() => {
    if (user) {
      if (user.rol === "Administrador") navigate("/dashboard-admin");
      else if (user.rol === "Guía turístico" || user.rol === "Personal de ventas")
        navigate("/dashboard-empleados");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/usuarios/login", {
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.user;

        // ✅ Guardamos el usuario en Zustand (se persiste en localStorage)
        setUser(userData);

        if (userData.rol === "Administrador") navigate("/dashboard-admin");
        else if (userData.rol === "Guía turístico" || userData.rol === "Personal de ventas")
          navigate("/dashboard-empleados");
        else setError("No tiene permisos para acceder al panel.");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error en el login:", err);
      setError("Email o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    } 
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h4 className="text-center text-success fw-bold mb-4">Inicio de sesión</h4>

              {error && <Alert variant="danger" className="py-2">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="success" className="w-100" disabled=
                {isLoading}>{isLoading ? (<> <Spinner size="sm" className="me-2" /> Ingresando... </>  ) : ("Ingresar")}
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}