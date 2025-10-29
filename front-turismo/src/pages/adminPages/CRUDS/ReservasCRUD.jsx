import { Routes, Route } from "react-router-dom";
import MainReservas from "../../../Components/reservas/MainReservas";
import EditReserva from "../../../components/reservas/EditReserva";
import ViewReserva from "../../../components/reservas/ViewReserva";

export default function ReservasCRUD() {
  return (
    <div className="container py-3">
      <Routes>
        <Route path="/" element={<MainReservas />} />

        <Route path="editar/:id" element={<EditReserva />} />

        <Route path="ver/:id" element={<ViewReserva />} />
      </Routes>
    </div>
  );
}
