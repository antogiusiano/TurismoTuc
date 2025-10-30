import { Outlet, Routes, Route } from "react-router-dom";
import Sidebar from "../adminPages/Sidebar";
import TuristasCRUD from "../adminPages/CRUDS/TuristasCRUD";
import ExcursionesCRUD from "../adminPages/CRUDS/ExcursionesCRUD";
import ReservasCRUD from "../adminPages/CRUDS/ReservasCRUD";
import UsuariosCRUD from "../adminPages/CRUDS/UsuariosCRUD";
import ReseñasCRUD from "../adminPages/CRUDS/ReseniasCRUD"; 
import DashboardHome from "../adminPages/DashboardHome";


const Dashboard = () => {
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
<<<<<<< HEAD
            <Route path="reservas/*" element={<ReservasCRUD />} />
            <Route path="reseñas/*" element={<ReseñasCRUD />} />
            {/* <Route path="usuarios" element={<UsuariosCRUD />} /> */}
=======
            <Route path="reservas/" element={<ReservasCRUD />} />
            <Route path="reseñas/*" element={<ReseñasCRUD />} />
            <Route path="usuarios/*" element={<UsuariosCRUD />} />
            
            <Route index element={<DashboardHome />} />
>>>>>>> 11f1cfe29d65e7ce572ef569c753270c6a496b07
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;