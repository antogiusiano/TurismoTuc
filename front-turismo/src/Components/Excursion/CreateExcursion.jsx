import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateExcursion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    precio_base: "",
    duracion: "",
    ubicacion: "",
    incluye: "",
    politicas: "",
    estado: "activa",
  });

  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Crear excursión
      const res = await axios.post("http://localhost:8000/api/excursiones", form);
      const id_excursion = res.data.id;

      // 2. Subir imagen si hay
      if (imagen) {
        const formData = new FormData();
        formData.append("imagen", imagen);
        formData.append("id_excursion", id_excursion);
        formData.append("tipo", "foto");

        await axios.post("http://localhost:8000/api/multimedia", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/dashboard-admin/excursiones");
    } catch (err) {
      console.error("Error al crear excursión:", err);
    }
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Nueva Excursión</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input type="text" name="titulo" className="form-control" value={form.titulo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input type="text" name="ubicacion" className="form-control" value={form.ubicacion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio Base</label>
          <input type="number" name="precio_base" className="form-control" value={form.precio_base} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Duración</label>
          <input type="text" name="duracion" className="form-control" value={form.duracion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Incluye</label>
          <textarea name="incluye" className="form-control" rows={2} value={form.incluye} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Políticas</label>
          <textarea name="politicas" className="form-control" rows={2} value={form.politicas} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" className="form-control" rows={4} value={form.descripcion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select name="estado" className="form-select" value={form.estado} onChange={handleChange}>
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen principal</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-success">Crear excursión</button>
      </form>
    </div>
  );
}