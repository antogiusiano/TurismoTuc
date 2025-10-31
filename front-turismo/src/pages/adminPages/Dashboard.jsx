import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../adminPages/Sidebar";
import TuristasCRUD from "../adminPages/CRUDS/TuristasCRUD";
import ExcursionesCRUD from "../adminPages/CRUDS/ExcursionesCRUD";
import ReservasCRUD from "../adminPages/CRUDS/ReservasCRUD";
import UsuariosCRUD from "../adminPages/CRUDS/UsuariosCRUD";
import ReseñasCRUD from "../adminPages/CRUDS/ReseniasCRUD";
import DashboardHome from "../adminPages/DashboardHome";
import "../../styles/components/dashboardhome.css";

const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* === SIDEBAR FIJO === */}
      <Sidebar />

        {/* Contenido principal */}
        <main className="flex-grow-1 p-4 bg-light" style={{ minHeight: "calc(100vh - 160px)" }}>
          <Routes>
            <Route path="/" element={<h5 className="text-success">Bienvenido al Panel Admin 👋</h5>} />
            <Route path="turistas/*" element={<TuristasCRUD />} />
            <Route path="excursiones/*" element={<ExcursionesCRUD />} />
            <Route path="reservas/*" element={<ReservasCRUD />} />
            <Route path="reseñas/*" element={<ReseñasCRUD />} />
            <Route path="usuarios/*" element={<UsuariosCRUD />} />
            <Route index element={<DashboardHome />} />
          </Routes>
        </main>
      </div>
      {/* === CONTENIDO PRINCIPAL === */}
      <main className="dashboard-container flex-grow-1">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="turistas/*" element={<TuristasCRUD />} />
          <Route path="excursiones/*" element={<ExcursionesCRUD />} />
          <Route path="reservas/*" element={<ReservasCRUD />} />
          <Route path="reseñas/*" element={<ReseñasCRUD />} />
          <Route path="usuarios/*" element={<UsuariosCRUD />} />
          <Route
            path="*"
            element={
              <h5 className="text-center text-muted mt-5">
                Página no encontrada dentro del panel.
              </h5>
            }
          />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
