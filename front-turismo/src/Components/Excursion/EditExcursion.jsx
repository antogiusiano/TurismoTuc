import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditExcursion() {
  const { id } = useParams();
  console.log("ID recibido:", id);
  const navigate = useNavigate();
  const [excursion, setExcursion] = useState(null);

  useEffect(() => {
    const fetchExcursion = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/excursiones/${id}`);
        setExcursion(res.data);
        console.log("Datos recibidos:", res.data);
      } catch (err) {
        console.error("Error al cargar excursión:", err);
      }
    };
    fetchExcursion();
  }, [id]);

  const handleChange = (e) => {
    setExcursion({ ...excursion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/excursiones/${id}`, excursion);
      navigate("/dashboard-admin/excursiones");
    } catch (err) {
      console.error("Error al actualizar excursión:", err);
    }
  };

  if (!excursion) return <p className="text-center mt-4">Cargando...</p>;

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Editar Excursión</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input type="text" name="titulo" className="form-control" value={excursion.titulo} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input type="text" name="ubicacion" className="form-control" value={excursion.ubicacion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio Base</label>
          <input type="number" name="precio_base" className="form-control" value={excursion.precio_base} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select name="estado" className="form-select" value={excursion.estado} onChange={handleChange}>
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Guardar cambios</button>
      </form>

      <hr className="my-4" />
      <FechasExcursion id_excursion={id} />
    </div>
  );
}

function FechasExcursion({ id_excursion }) {
  const [fechas, setFechas] = useState([]);
  const [nueva, setNueva] = useState({ fecha: "", hora_salida: "", cupo_maximo: "" });

  useEffect(() => {
    const fetchFechas = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/excursiones/${id_excursion}/fechas`);
        setFechas(res.data);
      } catch (err) {
        console.error("Error al obtener fechas:", err);
      }
    };
    fetchFechas();
  }, [id_excursion]);

  const handleAddFecha = async () => {
    try {
      await axios.post("http://localhost:8000/api/fechas-excursion", {
        id_excursion,
        ...nueva,
      });
      setNueva({ fecha: "", hora_salida: "", cupo_maximo: "" });
      const res = await axios.get(`http://localhost:8000/api/excursiones/${id_excursion}/fechas`);
      setFechas(res.data);
    } catch (err) {
      console.error("Error al agregar fecha:", err);
    }
  };

  return (
    <>
      <h5 className="fw-bold">Fechas de la excursión</h5>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Cupo</th>
            <th>Disponible</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {fechas.map((f) => (
            <tr key={f.id_fecha}>
              <td>{new Date(f.fecha).toLocaleDateString()}</td>
              <td>{f.hora_salida?.slice(0, 5)}</td>
              <td>{f.cupo_maximo}</td>
              <td>{f.cupo_disponible}</td>
              <td>{f.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row g-2 mt-3">
        <div className="col-md-4">
          <input type="date" className="form-control" value={nueva.fecha} onChange={(e) => setNueva({ ...nueva, fecha: e.target.value })} />
        </div>
        <div className="col-md-3">
          <input type="time" className="form-control" value={nueva.hora_salida} onChange={(e) => setNueva({ ...nueva, hora_salida: e.target.value })} />
        </div>
        <div className="col-md-3">
          <input type="number" className="form-control" placeholder="Cupo" value={nueva.cupo_maximo} onChange={(e) => setNueva({ ...nueva, cupo_maximo: e.target.value })} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-outline-success w-100" onClick={handleAddFecha}>Agregar</button>
        </div>
      </div>
    </>
  );
}