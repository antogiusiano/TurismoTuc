import { Link, NavLink } from "react-router-dom";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import "../../styles/components/common/header.css";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      {/* Cambié container → container-fluid para que ocupe todo el ancho */}
      <div className="container-fluid px-4">
        {/* Logo + nombre */}
        <Link
          className="navbar-brand fw-bold text-teal d-flex align-items-center gap-2"
          to="/"
        >
          <div className="logo-circle"></div>
          Turismo Tucumán
        </Link>

        {/* Botón hamburguesa móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces principales */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                INICIO
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/catalogo">
                CATALOGO
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Botones derecha */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary btn-sm">ES / EN</button>

          <Link
            to="/carrito"
            className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
          >
            <FaShoppingCart /> Carrito
          </Link>

          <a
            href="https://wa.me/5493810000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-teal btn-sm d-flex align-items-center gap-1"
          >
            <FaWhatsapp /> WhatsApp
          </a>

          <NavLink className="nav-link ms-2" to="/admin">
            Backoffice
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
