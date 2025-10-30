import { Outlet, Routes, Route } from "react-router-dom";
import Sidebar from "../adminPages/Sidebar";
import TuristasCRUD from "../adminPages/CRUDS/TuristasCRUD";
import ExcursionesCRUD from "../adminPages/CRUDS/ExcursionesCRUD";
import ReservasCRUD from "../adminPages/CRUDS/ReservasCRUD";
import UsuariosCRUD from "../adminPages/CRUDS/UsuariosCRUD";
import ReseñasCRUD from "../adminPages/CRUDS/ReseniasCRUD"; 

export default function Dashboard() {
  return (
    <div className="dashboard-container d-flex flex-column">
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="flex-grow-1 p-4 bg-light" style={{ minHeight: "calc(100vh - 160px)" }}>
          <Routes>
            <Route path="/" element={<h5 className="text-success">Bienvenido al Panel Admin 👋</h5>} />
            <Route path="turistas/*" element={<TuristasCRUD />} />
            <Route path="excursiones/*" element={<ExcursionesCRUD />} />
            <Route path="reservas/" element={<ReservasCRUD />} />
            <Route path="reseñas/*" element={<ReseñasCRUD />} />
            <Route path="usuarios/*" element={<UsuariosCRUD />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
