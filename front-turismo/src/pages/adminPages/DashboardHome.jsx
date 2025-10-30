import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Spinner } from "react-bootstrap";

export default function DashboardHome() {
  const [metricas, setMetricas] = useState(null);
  const [reservasHoy, setReservasHoy] = useState([]);
  const [reservasFuturas, setReservasFuturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [metricasRes, hoyRes, futurasRes] = await Promise.all([
          axios.get("http://localhost:8000/api/dashboard/metricas"),
          axios.get("http://localhost:8000/api/dashboard/reservas/hoy"),
          axios.get("http://localhost:8000/api/dashboard/reservas/proximas"),
        ]);

        setMetricas(metricasRes.data);
        setReservasHoy(hoyRes.data);
        setReservasFuturas(futurasRes.data);
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err);
        setError("No se pudieron cargar los datos del panel.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" />
        <p className="text-muted mt-2">Cargando panel...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <br />
      <h3 className="fw-bold text-success mb-4 mt-4 pt-3">  👋 Bienvenido al Panel de Administración </h3>

      {/* MÉTRICAS */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <Card className="shadow-sm text-center border-success">
            <Card.Body>
              <Card.Title>Reservas Hoy</Card.Title>
              <h2 className="fw-bold text-success">{metricas?.reservas_hoy || 0}</h2>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="shadow-sm text-center border-primary">
            <Card.Body>
              <Card.Title>Próximas Reservas</Card.Title>
              <h2 className="fw-bold text-primary">{metricas?.reservas_proximas || 0}</h2>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="shadow-sm text-center border-warning">
            <Card.Body>
              <Card.Title>Ocupación Total</Card.Title>
              <h2 className="fw-bold text-warning">{metricas?.ocupacion || 0}%</h2>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="shadow-sm text-center border-info">
            <Card.Body>
              <Card.Title>Rating Promedio</Card.Title>
              <h2 className="fw-bold text-info">{metricas?.rating_promedio || 0}</h2>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* TABLA DE RESERVAS DEL DÍA */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-success text-white fw-bold">Reservas de Hoy</Card.Header>
        <Card.Body>
          {reservasHoy.length > 0 ? (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Turista</th>
                  <th>Excursión</th>
                  <th>Personas</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {reservasHoy.map((r, i) => (
                  <tr key={i}>
                    <td>{r.id_reserva}</td>
                    <td>{r.turista}</td>
                    <td>{r.excursion}</td>
                    <td>{r.cantidad_personas}</td>
                    <td>
                      <span
                        className={`badge ${
                          r.estado_reserva === "confirmada"
                            ? "bg-success"
                            : r.estado_reserva === "pendiente"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {r.estado_reserva}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted text-center m-0">No hay reservas para hoy.</p>
          )}
        </Card.Body>
      </Card>

      {/* CALENDARIO DE RESERVAS FUTURAS */}
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white fw-bold">
          Próximas Reservas
        </Card.Header>
        <Card.Body>
          {reservasFuturas.length > 0 ? (
            <ul className="list-group">
              {reservasFuturas.map((r, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>{r.fecha_excursion}</strong> — {r.excursion}
                    <br />
                    <small className="text-muted">{r.turista}</small>
                  </span>
                  <span className="badge bg-success">🚌 {r.cantidad_personas} pers.</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center m-0">
              No hay reservas próximas registradas.
            </p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}