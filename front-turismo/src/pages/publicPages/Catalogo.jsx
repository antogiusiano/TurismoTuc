import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import CatalogGrid from "../../Components/publicComponents/Catalogo/CatalogGrid";
import FilterSidebar from "../../Components/publicComponents/Catalogo/FilterSidebar";
import SortBar from "../../Components/publicComponents/Catalogo/SortBar";
import "../../styles/publicComponents/catalogo.css";

export default function Catalogo() {
  const [excursiones, setExcursiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener excursiones
  const fetchExcursiones = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/excursiones");
      setExcursiones(res.data);
    } catch (err) {
      console.error("Error al obtener excursiones:", err);
      setError("No se pudieron cargar las excursiones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExcursiones();
  }, []);

  // Filtrado
  const handleFilterChange = (data) => {
    if (data) setExcursiones(data);
    else fetchExcursiones();
  };

  // Ordenamiento
  const handleSortChange = (order) => {
    const sorted = [...excursiones];
    switch (order) {
      case "precio_asc":
        sorted.sort((a, b) => a.precio_base - b.precio_base);
        break;
      case "precio_desc":
        sorted.sort((a, b) => b.precio_base - a.precio_base);
        break;
      case "fecha_nueva":
        sorted.sort(
          (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
        );
        break;
      case "fecha_vieja":
        sorted.sort(
          (a, b) => new Date(a.fecha_creacion) - new Date(b.fecha_creacion)
        );
        break;
      default:
        return;
    }
    setExcursiones(sorted);
  };

  return (
    <Container fluid className="catalogo-page py-4">
      <Row>
        {/* 🔹 Sidebar con ordenar + filtros */}
        <Col md={3} lg={2}>
          <div className="sidebar-container">
            <h5 className="fw-bold mb-2 text-secondary">Filtros</h5>
            <SortBar onSortChange={handleSortChange} />
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        </Col>

        {/* 🔹 Grilla principal */}
        <Col xs={12} md={9} lg={10}>
          {loading ? (
            <p>Cargando excursiones...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <CatalogGrid excursiones={excursiones} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
