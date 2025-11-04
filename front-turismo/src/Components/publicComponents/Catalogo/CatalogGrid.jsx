import { useState } from "react";
import ExcursionModal from "./ExcursionModal";
import { Card, Button } from "react-bootstrap";
import "../../../styles/publicComponents/catalogo.css"; // 👈 archivo CSS para estilos personalizados

export default function CatalogGrid({ excursiones }) {
  const [selectedExcursion, setSelectedExcursion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (excursion) => {
    setSelectedExcursion(excursion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedExcursion(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="row g-4">
        {excursiones.map((exc) => (
          <div
            key={exc.id_excursion}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <Card
              className="catalog-card shadow-sm h-100"
              onClick={() => handleOpenModal(exc)}
            >
              <div className="catalog-card__img-wrapper">
                <Card.Img
                  variant="top"
                  src={
                    exc.imagen_url && exc.imagen_url !== ""
                      ? exc.imagen_url
                      : "/img/placeholder-excursion.jpg" // poné tu placeholder real
                  }
                  alt={exc.titulo}
                  className="catalog-card__img"
                />
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-1 text-dark fw-semibold text-truncate">
                  {exc.titulo}
                </Card.Title>

                <Card.Text className="text-muted small mb-2 catalog-card__desc">
                  {exc.descripcion ? exc.descripcion.slice(0, 60) + "..." : ""}
                </Card.Text>

                <p className="fw-bold text-success mb-3">
                  ${exc.precio_base?.toLocaleString("es-AR")} ARS
                </p>

                {/* Categorías */}
                {exc.categorias && exc.categorias.length > 0 && (
                  <div className="mb-2 d-flex flex-wrap gap-1">
                    {exc.categorias.map((cat) => (
                      <span
                        key={cat.id_categoria_excursion}
                        className="badge bg-light text-dark border"
                      >
                        {cat.nombre_categoria}
                      </span>
                    ))}
                  </div>
                )}

                <Button
                  variant="success"
                  className="w-100 mt-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(exc);
                  }}
                >
                  Ver detalles
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ExcursionModal
        show={showModal}
        onHide={handleCloseModal}
        excursion={selectedExcursion}
      />
    </>
  );
}
