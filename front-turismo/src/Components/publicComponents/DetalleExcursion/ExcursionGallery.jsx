import { Carousel } from "react-bootstrap";
import "../../../styles/publicComponents/detalleex.css"

export default function ExcursionGallery({ excursion }) {
  // Por ahora simulamos un array de imágenes (en el futuro vendrá del backend)
  const imagenes = excursion.imagenes || [
    excursion.imagen_url,
    "/placeholder1.jpg",
    "/placeholder2.jpg",
  ];

  return (
    <section className="excursion-gallery mt-5 mb-4">
      <h5 className="fw-bold text-teal mb-3">Galería de imágenes</h5>

      {imagenes && imagenes.length > 0 ? (
        <Carousel
          variant="dark"
          interval={4000}
          className="shadow-sm rounded overflow-hidden"
        >
          {imagenes.map((img, index) => (
            <Carousel.Item key={index}>
              <img
                src={img || "/placeholder.jpg"}
                alt={`Imagen ${index + 1}`}
                className="d-block w-100 gallery-image"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div className="text-center bg-light p-4 rounded border">
          <p className="text-muted mb-0">
            📷 No hay imágenes disponibles para esta excursión.
          </p>
        </div>
      )}
    </section>
  );
}
