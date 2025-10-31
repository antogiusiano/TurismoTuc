import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaUsers, FaMapMarkedAlt, FaClipboardList, FaComments, FaUserTie, FaHome, FaSignOutAlt } from "react-icons/fa";
import useUserStore from "../../store/useUserStore";
import "../../styles/components/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const { clearUser } = useUserStore();
  
  const links = [
    { to: "/dashboard-admin/excursiones", label: "Excursiones", icon: <FaMapMarkedAlt /> },
    { to: "/dashboard-admin/turistas", label: "Turistas", icon: <FaUsers /> },
    { to: "/dashboard-admin/reservas", label: "Reservas", icon: <FaClipboardList /> },
    { to: "/dashboard-admin/reseñas", label: "Reseñas", icon: <FaComments /> },
    { to: "/dashboard-admin/usuarios", label: "Usuarios", icon: <FaUserTie /> },
  ];

  const handleLogout = () => {
    // Limpiar el estado del usuario en Zustand
    clearUser();
    
    // Limpiar localStorage si tienes datos adicionales
    localStorage.removeItem('token');
    
    // Redirigir al home
    navigate('/');
  };

  return (
    <div className="sidebar bg-white shadow-sm d-flex flex-column">
      <hr />
      <br />
      <Link to="/dashboard-admin" className="sidebar-header fw-bold text-success mb-3 d-block text-decoration-none">
        <FaHome className="me-2" size={24} /> INICIO PANEL ADMIN
      </Link>
      
      <nav>
        <ul className="nav flex-column">
          {links.map((link) => (
            <li key={link.to} className="nav-item">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Button variant="danger"
        onClick={handleLogout}
        className="logout-button mt-auto"
      >
        <FaSignOutAlt className="me-2" />
        Cerrar Sesión
      </Button>
    </div>
  );
}