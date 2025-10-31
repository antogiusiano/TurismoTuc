import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ReservasMain() {
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState("activas"); // 'activas', 'eliminadas' o 'todas' como filtros
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const getReservas = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/reservas?filtro=${filtro}`
      );
      console.log("Actual:", filtro);
      console.log("reponse:", res.data);
      setReservas(res.data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
      setError("No se pudieron cargar las reservas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservas();
  }, [filtro]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar reserva?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8000/api/reservas/${id}`);
      Swal.fire("Eliminada", "La reserva ha sido eliminada", "success");
      getReservas();
    } catch (err) {
      console.error("Error al eliminar reserva:", err);
      Swal.fire("Error", "No se pudo eliminar la reserva", "error");
    }
  };

  const handleRestore = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Restaurar reserva?",
      text: "La reserva volverá a estar activa",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.put(`http://localhost:8000/api/reservas/restore/${id}`);
      Swal.fire("Restaurada", "La reserva ha sido restaurada", "success");
      getReservas();
    } catch (err) {
      console.error("Error al restaurar reserva:", err);
      Swal.fire("Error", "No se pudo restaurar la reserva", "error");
    }
  };

  if (loading)
    return <div className="text-center mt-3">Cargando reservas...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="card shadow-sm p-3 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-success mb-0">Gestión de Reservas</h5>

        <div className="d-flex gap-2">
          {/* 🔹 Botón Crear Reserva */}
          <Link
            to="/dashboard-admin/reservas/create"
            className="btn btn-success"
          >
            <i className="bi bi-plus-circle me-1"></i> Crear Reserva
          </Link>

          {/* 🔽 Dropdown de filtros */}
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-funnel"></i> Filtrar reservas
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFiltro("activas")}
                >
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Activas
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFiltro("eliminadas")}
                >
                  <i className="bi bi-x-circle text-danger me-2"></i>Eliminadas
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFiltro("todas")}
                >
                  <i className="bi bi-list-ul text-secondary me-2"></i>Todas
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
                  <span
                    className={`badge ${
                      r.estado_reserva === "confirmada"
                        ? "bg-success"
                        : r.estado_reserva === "pendiente"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {r.estado_reserva}
                  </span>
                </td>
                <td>{new Date(r.fecha_reserva).toLocaleDateString()}</td>
                <td>
                  <div className="btn-group" role="group">
                    {/* 👁️ Ver */}
                    <Link
                      to={`/dashboard-admin/reservas/view/${r.id_reserva}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="bi bi-eye"></i>
                    </Link>

                    {/* ✏️ Editar */}
                    <Link
                      to={`/dashboard-admin/reservas/edit/${r.id_reserva}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>

                    {/* ❌ Eliminar o 🔄 Restaurar */}
                    {r.eliminado ? (
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleRestore(r.id_reserva)}
                      >
                        <i className="bi bi-arrow-counterclockwise"></i>
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(r.id_reserva)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
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
