import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

import ExcursionHero from "../../Components/publicComponents/DetalleExcursion/ExcursionHero";
import ExcursionTabs from "../../Components/publicComponents/DetalleExcursion/ExcursionTabs";
import ExcursionMap from "../../Components/publicComponents/DetalleExcursion/ExcursionMap";
import ExcursionGallery from "../../Components/publicComponents/DetalleExcursion/ExcursionGallery";
import ExcursionSidebar from "../../Components/publicComponents/DetalleExcursion/ExcursionSidebar";

import "../../styles/publicComponents/detalleex.css"
export default function DetalleExcursion() {
  const { id } = useParams();
  const [excursion, setExcursion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExcursion = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/excursiones/${id}`);
        setExcursion(res.data);
      } catch (err) {
        console.error("Error al obtener excursión:", err);
        setError("No se pudo cargar la información de la excursión.");
      } finally {
        setLoading(false);
      }
    };

    fetchExcursion();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!excursion) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">Excursión no encontrada.</Alert>
      </Container>
    );
  }

  return (
    <div className="detalle-excursion-page bg-light py-4">
      <Container>
        {/* Hero principal */}
        <ExcursionHero excursion={excursion} />

        <Row className="mt-4">
          {/* Columna izquierda: Tabs, Mapa, Galería */}
          <Col xs={12} md={8} lg={9} className="mb-4">
            <ExcursionTabs excursion={excursion} />
            <ExcursionMap excursion={excursion} />
            <ExcursionGallery excursion={excursion} />
          </Col>

          {/* Columna derecha: Sidebar */}
          <Col xs={12} md={4} lg={3}>
            <ExcursionSidebar excursion={excursion} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
