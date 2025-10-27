import { useEffect, useState } from "react";
import axios from "axios";

export default function ReseñasCRUD() {
  const [reseñas, setReseñas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReseñas = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/resenias");
        setReseñas(res.data);
      } catch (err) {
        console.error("Error al obtener reseñas:", err);
        setError("No se pudieron cargar las reseñas.");
      }
    };
    fetchReseñas();
  }, []);

  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold text-success mb-3">Gestión de Reseñas</h5>

      {error && <div className="alert alert-danger py-2">{error}</div>}

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
                  <button className="btn btn-outline-danger btn-sm">
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
