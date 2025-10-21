import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../../styles/components/common/footer.css";

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4 bg-teal text-white">
      <div className="container-fluid px-5">
        <div className="row gy-4">
          {/* Columna 1 - Branding */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className="fw-bold mb-2">Turismo Tucumán</h5>
            <p className="small mb-0">
              Excursiones auténticas, cultura, historia y naturaleza.  
              Descubrí Tucumán de una forma diferente.
            </p>
          </div>

          {/* Columna 2 - Enlaces útiles */}
          <div className="col-md-4 text-center">
            <h6 className="fw-bold mb-2">Enlaces útiles</h6>
            <ul className="list-unstyled small">
              <li><a href="/catalogo">Catálogo</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/politicas">Políticas de privacidad</a></li>
            </ul>
          </div>

          {/* Columna 3 - Contacto */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="fw-bold mb-2">Contacto</h6>
            <p className="small mb-1"><FaMapMarkerAlt className="me-2" />San Miguel de Tucumán, Argentina</p>
            <p className="small mb-1"><FaEnvelope className="me-2" />contacto@maavyt.com</p>
            <p className="small mb-0"><FaPhoneAlt className="me-2" />+54 381 000 0000</p>
          </div>
        </div>

        <hr className="my-3 border-light opacity-50" />

        {/* Copyright + WhatsApp */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small">
          <p className="mb-2 mb-md-0 text-center text-md-start">
            © 2025 MAAVYT — Todos los derechos reservados.
          </p>
          <a
            href="https://wa.me/5493810000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
          >
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
