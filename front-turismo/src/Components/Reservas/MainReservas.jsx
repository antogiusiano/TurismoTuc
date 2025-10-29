import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function ReservasMain() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarReservas = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/reservas");
      setReservas(res.data.filter(r => r.eliminado !== 1)); // solo activas
    } catch (err) {
      console.error(err);
      setError("Error al cargar reservas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar reserva?',
      text: 'Esta acción marcará la reserva como eliminada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      // Optimistic update
      setReservas(prev => prev.filter(r => r.id_reserva !== id));

      // Baja lógica backend
      await axios.delete(`http://localhost:8000/api/reservas/${id}`);

      // Refrescar lista
      await cargarReservas();

      Swal.fire({
        title: 'Eliminada',
        text: 'La reserva fue dada de baja correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      await cargarReservas();
      Swal.fire('Error', 'No se pudo eliminar la reserva', 'error');
    }
  };

  if (loading) return <div className="text-center mt-4">Cargando reservas...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

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
            <th className="text-center">Acciones</th>
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
                    r.estado_reserva === "confirmada" ? "bg-success" :
                    r.estado_reserva === "pendiente" ? "bg-warning" :
                    "bg-secondary"
                  }`}>
                    {r.estado_reserva}
                  </span>
                </td>
                <td>{new Date(r.fecha_reserva).toLocaleDateString()}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <Link
                      to={`/reservas/edit/${r.id_reserva}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Editar
                    </Link>
                    <Link
                      to={`/reservas/view/${r.id_reserva}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Ver
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(r.id_reserva)}
                    >
                      Eliminar
                    </button>
                  </div>
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
