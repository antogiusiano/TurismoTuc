import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateReserva() {
  const navigate = useNavigate();

  // Listas para selects
  const [turistas, setTuristas] = useState([]);
  const [fechasExcursion, setFechasExcursion] = useState([]);

  const [reserva, setReserva] = useState({
    id_turista: "",
    id_fecha: "",
    cantidad_personas: 1,
    monto_total: 0,
    estado_reserva: "pendiente",
  });

  const [saving, setSaving] = useState(false);

  // Obtener datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [turistasRes, fechasRes] = await Promise.all([
          axios.get("http://localhost:8000/api/turistas"),
          axios.get("http://localhost:8000/api/excursiones"),
        ]);
        setTuristas(turistasRes.data);
        setFechasExcursion(fechasRes.data);
      } catch (err) {
        console.error("Error cargando listas:", err);
        Swal.fire("Error", "No se pudieron cargar turistas o excursiones", "error");
      }
    };
    fetchData();
  }, []);

  // Manejar cambios de formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prev) => ({
      ...prev,
      [name]:
         name === "cantidad_personas" || name === "monto_total"
          ? Number(value)
          : value,
    }));
  };

  // Enviar al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post("http://localhost:8000/api/reservas", reserva);
      Swal.fire({
        title: "Creada",
        text: "La reserva fue registrada correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard-admin/reservas");
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
        {/* Turista */}
        <div className="mb-3">
          <label className="form-label">Turista</label>
          <select
            name="id_turista"
            value={reserva.id_turista}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccionar turista</option>
            {turistas.map((t) => (
              <option key={t.id_turista} value={t.id_turista}>
                {t.nombre} {t.apellido}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha Excursión */}
        <div className="mb-3">
          <label className="form-label">Fecha de Excursión</label>
          <select
            name="id_fecha"
            value={reserva.id_fecha || ""}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccionar fecha</option>
            {fechasExcursion.map((f) => (
              <option key={f.id_fecha} value={f.id_fecha}>
                {f.titulo} — {f.fecha ? new Date(f.fecha).toLocaleDateString() : "Fecha inválida"}
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad de personas */}
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

        {/* Monto total */}
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

        {/* Estado */}
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
