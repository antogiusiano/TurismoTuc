import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainResenias() {
  const [reseñas, setReseñas] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // =============================
  // CARGAR RESEÑAS
  // =============================
  const fetchReseñas = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/resenias");
      setReseñas(res.data);
    } catch (err) {
      console.error("Error al obtener reseñas:", err);
      setError("No se pudieron cargar las reseñas.");
    }
  };

  useEffect(() => {
    fetchReseñas();
  }, []);

  // =============================
  // PUBLICAR RESEÑA
  // =============================
  const handlePublicar = async (id) => {
    try {
      const confirmacion = window.confirm("¿Deseas publicar esta reseña?");
      if (!confirmacion) return;

      await axios.put(`http://localhost:8000/api/resenias/${id}`, {
        estado: "publicada",
      });

      setMensaje("✅ Reseña publicada correctamente.");
      fetchReseñas();
      setTimeout(() => setMensaje(""), 2500);
    } catch (err) {
      console.error("Error al publicar reseña:", err);
      setError("No se pudo publicar la reseña.");
    }
  };

  // =============================
  // ELIMINAR RESEÑA
  // =============================
  const handleEliminar = async (id) => {
    try {
      const confirmar = window.confirm("¿Seguro que deseas eliminar esta reseña?");
      if (!confirmar) return;

      await axios.delete(`http://localhost:8000/api/resenias/${id}`);
      setMensaje("🗑️ Reseña eliminada correctamente.");
      fetchReseñas();
      setTimeout(() => setMensaje(""), 2500);
    } catch (err) {
      console.error("Error al eliminar reseña:", err);
      setError("No se pudo eliminar la reseña.");
    }
  };

  // =============================
  // RENDER
  // =============================
  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold text-success mb-3">Gestión de Reseñas</h5>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {mensaje && <div className="alert alert-success py-2">{mensaje}</div>}

      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Excursión</th>
            <th>Turista</th>
            <th>Calificación</th>
            <th>Comentario</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reseñas.length > 0 ? (
            reseñas.map((r) => (
              <tr key={r.id_resena}>
                <td>{r.id_resena}</td>
                <td>{r.excursion}</td>
                <td>{r.turista || "Sin asignar"}</td>
                <td>
                  <span className="badge bg-warning text-dark">
                    ⭐ {r.calificacion}
                  </span>
                </td>
                <td>{r.comentario || "—"}</td>
                <td>{new Date(r.fecha_resena).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      r.estado === "publicada" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {r.estado}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => navigate(`/dashboard-admin/reseñas/edit/${r.id_resena}`)}
                  >
                    Editar
                  </button>
                  {r.estado === "pendiente" && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handlePublicar(r.id_resena)}
                    >
                      Publicar
                    </button>
                  )}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleEliminar(r.id_resena)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted py-3">
                No hay reseñas disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
