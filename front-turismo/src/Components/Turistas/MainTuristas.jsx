import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainTuristas() {
  const [turistas, setTuristas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Cargar turistas
  const fetchTuristas = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/turistas");
      setTuristas(res.data);
    } catch (err) {
      console.error("Error al obtener turistas:", err);
    }
  };

  useEffect(() => {
    fetchTuristas();
  }, []);

  // Eliminar turista
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que querés eliminar este turista?");
    if (!confirmDelete) return;

    setError("");
    setMensaje("");

    try {
      const res = await axios.delete(`http://localhost:8000/api/turistas/${id}`);
      setMensaje(res.data.message || "Turista eliminado correctamente");
      // Actualizar lista
      setTuristas(turistas.filter((t) => t.id_turista !== id));
    } catch (err) {
      console.error("Error al eliminar turista:", err);
      setError("Error al eliminar turista.");
    }
  };

  return (
    <div className="card shadow-sm p-3">
      <br />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-success mb-0">Gestión de Turistas</h5>
        <button className="btn btn-success btn-sm" onClick={() => navigate("/dashboard-admin/turistas/create")}>
          ➕ Agregar Turista
        </button>
      </div>

      {/* Mensajes */}
      {mensaje && <div className="alert alert-success py-2">{mensaje}</div>}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turistas.length > 0 ? (
            turistas.map((t) => (
              <tr key={t.id_turista}>
                <td>{t.id_turista}</td>
                <td>{t.nombre}</td>
                <td>{t.email}</td>
                <td>{t.telefono}</td>
                <td>
                  <button
                    className="btn btn-outline-info btn-sm me-2"
                    onClick={() => navigate(`/dashboard-admin/turistas/view/${t.id_turista}`)}
                  >
                    Ver
                  </button>

                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => navigate(`/dashboard-admin/turistas/edit/${t.id_turista}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(t.id_turista)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted py-3">
                No hay turistas registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
