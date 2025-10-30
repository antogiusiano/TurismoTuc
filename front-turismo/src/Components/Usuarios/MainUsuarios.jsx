import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Cargar usuarios al montar
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/usuarios");
        setUsuarios(res.data);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        setError("No se pudieron cargar los usuarios.");
      }
    };
    fetchUsuarios();
  }, []);

  // Eliminar usuario (baja lógica)
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/usuarios/${id}`);
      setUsuarios(usuarios.filter((u) => u.id_usuario !== id));
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      setError("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div className="card shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-success mb-0">Gestión de Usuarios</h5>
        <button
          className="btn btn-success btn-sm"
          onClick={() => navigate("create")}
        >
          ➕ Agregar Usuario
        </button>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <tr key={u.id_usuario}>
                <td>{u.id_usuario}</td>
                <td>{u.nombre} {u.apellido}</td>
                <td>{u.email}</td>
                <td>{u.telefono || "—"}</td>
                <td>{u.nombre_rol}</td>
                <td>
                  <span
                    className={`badge ${
                      u.estado === "activo" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {u.estado || "pendiente"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-info btn-sm me-2"
                    onClick={() => navigate(`view/${u.id_usuario}`)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => navigate(`edit/${u.id_usuario}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(u.id_usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted py-3">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
