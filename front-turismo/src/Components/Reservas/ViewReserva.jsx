import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReservaView() {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/reservas/${id}`);
        setReserva(res.data);
      } catch (err) {
        console.error("Error al obtener reserva:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReserva();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Cargando reserva...</div>;
  if (!reserva) return <div className="alert alert-warning mt-4">Reserva no encontrada</div>;

  return (
    <div className="card shadow-sm p-4">
      <h5 className="fw-bold text-info mb-3">Detalle de Reserva #{reserva.id_reserva}</h5>
      <ul className="list-group mb-3">
        <li className="list-group-item"><strong>Turista:</strong> {reserva.turista}</li>
        <li className="list-group-item"><strong>Excursión:</strong> {reserva.excursion}</li>
        <li className="list-group-item"><strong>Fecha Excursión:</strong> {new Date(reserva.fecha_excursion).toLocaleDateString()}</li>
        <li className="list-group-item"><strong>Cantidad Personas:</strong> {reserva.cantidad_personas}</li>
        <li className="list-group-item"><strong>Monto Total:</strong> ${reserva.monto_total}</li>
        <li className="list-group-item"><strong>Estado:</strong> {reserva.estado_reserva}</li>
        <li className="list-group-item"><strong>Fecha Reserva:</strong> {new Date(reserva.fecha_reserva).toLocaleDateString()}</li>
      </ul>
      <button className="btn btn-secondary" onClick={() => navigate("/admin/reservas")}>Volver</button>
    </div>
  );
}
