import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditReserva() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState({
    turista: "",
    excursion: "",
    fecha_excursion: "",
    cantidad_personas: 1,
    monto_total: 0,
    estado_reserva: "pendiente",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Cargar reserva
  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/reservas/${id}`);
        setReserva(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la reserva");
      } finally {
        setLoading(false);
      }
    };
    fetchReserva();
  }, [id]);

  // 🔹 Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/reservas/${id}`, reserva);
      Swal.fire({
        title: "Guardado",
        text: "La reserva fue actualizada correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/reservas"); // volver al listado
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar la reserva", "error");
    }
  };

  if (loading) return <div className="text-center mt-4">Cargando reserva...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold text-warning mb-3">Editar Reserva</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Turista</label>
          <input
            type="text"
            name="turista"
            value={reserva.turista}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Excursión</label>
          <input
            type="text"
            name="excursion"
            value={reserva.excursion}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha Excursión</label>
          <input
            type="date"
            name="fecha_excursion"
            value={reserva.fecha_excursion.split("T")[0]}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cantidad de Personas</label>
          <input
            type="number"
            name="cantidad_personas"
            value={reserva.cantidad_personas}
            onChange={handleChange}
            className="form-control"
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Monto Total</label>
          <input
            type="number"
            name="monto_total"
            value={reserva.monto_total}
            onChange={handleChange}
            className="form-control"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            name="estado_reserva"
            value={reserva.estado_reserva}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>

        <button type="submit" className="btn btn-warning">Guardar cambios</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/reservas")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
