import { Container, Row, Col } from "react-bootstrap";
import "../../../styles/publicComponents/detalleex.css"

export default function ExcursionHero({ excursion }) {
  return (
    <section className="excursion-hero mb-4">
      <Container fluid className="p-0">
        {/* Imagen principal */}
        <div className="hero-image-container">
          <img
            src={excursion.imagen_url || "/placeholder.jpg"}
            alt={excursion.titulo}
            className="hero-image"
          />

          {/* Overlay con título y ubicación */}
          <div className="hero-overlay text-white">
            <Container>
              <Row className="align-items-end">
                <Col md={8}>
                  <h1 className="fw-bold hero-title">{excursion.titulo}</h1>
                  <p className="mb-2 small text-light">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {excursion.ubicacion}
                  </p>
                  <p className="hero-description mb-3">
                    {excursion.descripcion?.slice(0, 150)}...
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Container>
    </section>
  );
}
