import { useEffect, useState } from "react";
import axios from "axios";

export default function TuristasCRUD() {
  const [turistas, setTuristas] = useState([]);

  useEffect(() => {
    const fetchTuristas = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/turistas");
        setTuristas(res.data);
      } catch (err) {
        console.error("Error al obtener turistas:", err);
      }
    };
    fetchTuristas();
  }, []);

  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold text-success mb-3">Gestión de Turistas</h5>
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
                  <button className="btn btn-outline-primary btn-sm me-2">Editar</button>
                  <button className="btn btn-outline-danger btn-sm">Eliminar</button>
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