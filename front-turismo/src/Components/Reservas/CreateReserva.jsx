import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateReserva() {
  const navigate = useNavigate();

  const [reserva, setReserva] = useState({
    turista: "",
    excursion: "",
    fecha_excursion: "",
    cantidad_personas: 1,
    monto_total: 0,
    estado_reserva: "pendiente",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prev) => ({
      ...prev,
      // Aseguramos que números se guarden como Number
      [name]: name === "cantidad_personas" || name === "monto_total" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(`http://localhost:8000/api/reservas`, reserva);
      Swal.fire({
        title: "Creada",
        text: "La reserva fue registrada correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard-admin/reservas"); // Redirige al listado
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo crear la reserva", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold text-success mb-3">Crear Nueva Reserva</h5>
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
            value={reserva.fecha_excursion}
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

        <button type="submit" className="btn btn-success" disabled={saving}>
          {saving ? "Guardando..." : "Crear Reserva"}
        </button>
        <Link to="/dashboard-admin/reservas" className="btn btn-secondary ms-2">
          Volver
        </Link>
      </form>
    </div>
  );
}
