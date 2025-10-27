import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MainExcursiones() {
  const [excursiones, setExcursiones] = useState([]);

  useEffect(() => {
    const fetchExcursiones = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/excursiones");
        setExcursiones(res.data);
      } catch (err) {
        console.error("Error al obtener excursiones:", err);
      }
    };
    fetchExcursiones();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">5
        
        <h4 className="fw-bold text-success">Excursiones</h4>
        <Link to="create" className="btn btn-success btn-sm">+ Nueva Excursión</Link>
      </div>
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Ubicación</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {excursiones.map((e) => (
            <tr key={e.id_excursion}>
              <td>{e.id_excursion}</td>
              <td>{e.titulo}</td>
              <td>{e.ubicacion}</td>
              <td>${e.precio_base}</td>
              <td>{e.estado}</td>
              <td>
                <Link to={`view/${e.id_excursion}`} className="btn btn-outline-secondary btn-sm me-2">Ver</Link>
                <Link to={`edit/${e.id_excursion}`} className="btn btn-outline-primary btn-sm">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}