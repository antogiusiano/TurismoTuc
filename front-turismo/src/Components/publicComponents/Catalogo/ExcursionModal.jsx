import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ExcursionModal({ show, onHide, excursion }) {
  const navigate = useNavigate();

  if (!excursion) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{excursion.titulo}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={excursion.imagen_url || "/placeholder.jpg"}
              alt={excursion.titulo}
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h5 className="text-success fw-bold mb-2">
              ${excursion.precio_base?.toLocaleString("es-AR")} ARS
            </h5>
            <p className="text-muted mb-1">📍 {excursion.ubicacion}</p>
            <p>{excursion.descripcion?.slice(0, 200)}...</p>
            <Button
              variant="success"
              className="w-100 mt-2"
              onClick={() => {
                onHide();
                navigate(`/excursion/${excursion.id_excursion}`);
              }}
            >
              Ver ficha completa
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
