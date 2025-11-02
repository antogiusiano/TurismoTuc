import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, Button, Table, Dropdown, Spinner, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservasMain() {
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState("activas"); // 'activas', 'eliminadas' o 'todas' como filtros
  const [estadoreserva, setEstadoreserva] = useState("todas"); // 'pendiente', 'confirmada', 'cancelada' o 'todas'
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [temporalDesde, setTemporalDesde] = useState(
    fechaDesde ? new Date(fechaDesde) : null
  );
  const [temporalHasta, setTemporalHasta] = useState(
    fechaHasta ? new Date(fechaHasta) : null
  );
  const [openCalendar, setOpenCalendar] = useState(false); // para mostrar/ocultar el calendario

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getReservas = async () => {
    setLoading(true);
    setError(null);
    const params = {
      filtro,
      estadoreserva,
      fechaDesde,
      fechaHasta,
    };
    try {
      const res = await axios.get("http://localhost:8000/api/reservas", {
        params,
      });

      console.log("Actual filtro:", filtro);
      console.log("Actual estado:", estadoreserva);
      //console.log("reponse:", res.data);
      setReservas(res.data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
      setError("No se pudieron cargar las reservas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservas();
  }, [filtro, estadoreserva]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar reserva?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8000/api/reservas/${id}`);
      Swal.fire("Eliminada", "La reserva ha sido eliminada", "success");
      getReservas();
    } catch (err) {
      console.error("Error al eliminar reserva:", err);
      Swal.fire("Error", "No se pudo eliminar la reserva", "error");
    }
  };

  const handleRestore = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Restaurar reserva?",
      text: "La reserva volverá a estar activa",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.put(`http://localhost:8000/api/reservas/restore/${id}`);
      Swal.fire("Restaurada", "La reserva ha sido restaurada", "success");
      getReservas();
    } catch (err) {
      console.error("Error al restaurar reserva:", err);
      Swal.fire("Error", "No se pudo restaurar la reserva", "error");
    }
  };

  if (loading)
    return <div className="text-center mt-3">Cargando reservas...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

return (
  <Card className="shadow-sm">
    <Card.Body className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-success mb-0">Gestión de Reservas</h5>

        <div className="d-flex align-items-center gap-2">
          <Button 
            as={Link} 
            to="/dashboard-admin/reservas/create"
            variant="success"
            size="sm"
          >
            <i className="bi bi-plus-circle me-1"></i> Crear Reserva
          </Button>

          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-primary" size="sm">
              <i className="bi bi-funnel"></i> Filtrar reservas
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFiltro("activas")}>
                <i className="bi bi-check-circle text-success me-2"></i>
                Activas
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFiltro("eliminadas")}>
                <i className="bi bi-x-circle text-danger me-2"></i>
                Eliminadas
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFiltro("todas")}>
                <i className="bi bi-list-ul text-secondary me-2"></i>
                Todas
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="success" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Turista</th>
              <th>Excursión</th>
              <th>Fecha Excursión</th>
              <th>Cantidad</th>
              <th>Monto Total</th>
              <th>Estado</th>
              <th>Fecha Reserva</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.length > 0 ? (
              reservas.map((r) => (
                <tr key={r.id_reserva}>
                  <td>{r.id_reserva}</td>
                  <td>{r.turista}</td>
                  <td>{r.excursion}</td>
                  <td>{new Date(r.fecha_excursion).toLocaleDateString()}</td>
                  <td>{r.cantidad_personas}</td>
                  <td>${parseFloat(r.monto_total).toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge ${
                        r.estado_reserva === "confirmada"
                          ? "bg-success"
                          : r.estado_reserva === "pendiente"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {r.estado_reserva}
                    </span>
                  </td>
                  <td>{new Date(r.fecha_reserva).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Button
                        as={Link}
                        to={`/dashboard-admin/reservas/view/${r.id_reserva}`}
                        variant="outline-secondary"
                        size="sm"
                      >
                        <i className="bi bi-eye"></i>
                      </Button>

                      <Button
                        as={Link}
                        to={`/dashboard-admin/reservas/edit/${r.id_reserva}`}
                        variant="outline-primary"
                        size="sm"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>

                      {r.eliminado ? (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleRestore(r.id_reserva)}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </Button>
                      ) : (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(r.id_reserva)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted py-3">
                  No hay reservas registradas
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Card.Body>
  </Card>
)}