import { useState } from "react";
import ExcursionModal from "./ExcursionModal";

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
            className="col-md-4 col-lg-3 col-sm-6"
            onClick={() => handleOpenModal(exc)}
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow-sm h-100">
              <img
                src={exc.imagen_url || "/placeholder.jpg"}
                alt={exc.titulo}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{exc.titulo}</h5>
                <p className="text-muted small">
                  {exc.descripcion?.slice(0, 60)}...
                </p>
                <p className="fw-bold text-success">
                  ${exc.precio_base?.toLocaleString("es-AR")} ARS
                </p>
                <button className="btn btn-success w-100">Ver detalles</button>
              </div>
            </div>
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
