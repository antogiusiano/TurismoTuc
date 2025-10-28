import { NavLink } from "react-router-dom";
import { FaUsers, FaMapMarkedAlt, FaClipboardList, FaComments, FaUserTie } from "react-icons/fa";
import "../../styles/components/sidebar.css";

export default function Sidebar() {
  const links = [
    { to: "/dashboard-admin/turistas", label: "Turistas", icon: <FaUsers /> },
    { to: "/dashboard-admin/excursiones", label: "Excursiones", icon: <FaMapMarkedAlt /> },
    { to: "/dashboard-admin/reservas", label: "Reservas", icon: <FaClipboardList /> },
    { to: "/dashboard-admin/reseñas", label: "Reseñas", icon: <FaComments /> },
    { to: "/dashboard-admin/usuarios", label: "Usuarios", icon: <FaUserTie /> },
  ];

  return (
    <div className="sidebar bg-white shadow-sm">
    <hr />
    <br />
      <h5 className="fw-bold text-success text-center my-3">Panel Admin</h5>
      <ul className="nav flex-column">
        {links.map((link) => (
          <li key={link.to} className="nav-item">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 ${
                  isActive ? "active-link" : ""
                }`
              }
            >
              {link.icon} {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
