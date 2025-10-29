import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

export default function ReservasCRUD() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchReservas = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/reservas");
      setReservas(res.data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
      setError("No se pudieron cargar las reservas");
    } finally {
      setLoading(false);
    }
  };
  fetchReservas();
}, []);

  if (loading) return <div className="text-center">Cargando reservas...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;


  const handleEdit = (reserva) => {
    // por ahora solo mostrar alerta; se puede abrir modal aquí
    alert(`Editar reserva ID: ${reserva.id_reserva}`);
  };

  const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: '¿Eliminar reserva?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirm.isConfirmed) return;

  try {
    await axios.delete(`http://localhost:8000/api/reservas/${id}`);
    setReservas(prev => prev.filter(r => r.id_reserva !== id));
    Swal.fire('Eliminada', 'La reserva ha sido eliminada', 'success');
  } catch (err) {
    console.error('Error al eliminar reserva:', err);
    Swal.fire('Error', 'No se pudo eliminar la reserva', 'error');
  }
};

  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold text-success mb-3">Gestión de Reservas</h5>
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Turista</th>
            <th>Excursión</th>
            <th>Fecha Excursión</th>
            <th>Cantidad</th>
            <th>Monto Total</th>
            <th>Estado</th>
            <th>Fecha Reserva</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length > 0 ? (
            reservas.map((r) => (
              <tr key={r.id_reserva}>
                <td>{r.id_reserva}</td>
                <td>{r.turista}</td>
                <td>{r.excursion}</td>
                <td>{new Date(r.fecha_excursion).toLocaleDateString()}</td>
                <td>{r.cantidad_personas}</td>
                <td>${parseFloat(r.monto_total).toFixed(2)}</td>
                <td>
                  <span className={`badge ${
                    r.estado_reserva === 'confirmada' ? 'bg-success' :
                    r.estado_reserva === 'pendiente' ? 'bg-warning' :
                    'bg-danger'
                  }`}>
                    {r.estado_reserva}
                  </span>
                </td>
                <td>{new Date(r.fecha_reserva).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(r)}>Editar</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(r.id_reserva)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-muted py-3">
                No hay reservas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
