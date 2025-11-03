import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FechasExcursion from "./FechaExcursion.jsx";

export default function EditExcursion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [excursion, setExcursion] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [guias, setGuias] = useState([]);
  const [nuevaUrl, setNuevaUrl] = useState(""); // 👈 nueva URL a agregar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resExc = await axios.get(`http://localhost:8000/api/excursiones/${id}`);
        const data = resExc.data;

        const id_categoria_excursion = data.categorias?.[0]?.id_categoria_excursion || "";
        setExcursion({ ...data, id_categoria_excursion, id_guia: data.id_guia || "" });

        // 🔄 Cargar imágenes asociadas
        const resImgs = await axios.get(`http://localhost:8000/api/excursiones/${id}/multimedia`);
        setImagenes(resImgs.data);

        // 🔄 Cargar categorías
        const resCats = await axios.get("http://localhost:8000/api/excursiones/categorias-excursion");
        setCategorias(resCats.data);

        // 🔄 Cargar guías
        const resGuias = await axios.get("http://localhost:8000/api/excursiones/guias");
        setGuias(resGuias.data);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setExcursion({ ...excursion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Actualizar la excursión
      await axios.put(`http://localhost:8000/api/excursiones/${id}`, excursion);

      // 2️⃣ Actualizar categoría
      if (excursion.id_categoria_excursion) {
        await axios.post("http://localhost:8000/api/excursiones/categoria", {
          id_excursion: id,
          id_categoria_excursion: excursion.id_categoria_excursion,
        });
      }

      // 3️⃣ Si hay una URL nueva, agregar multimedia
      if (nuevaUrl.trim() !== "") {
        await axios.post("http://localhost:8000/api/excursiones/multimedia", {
          id_excursion: id,
          url: nuevaUrl,
          descripcion: "Imagen agregada desde la edición",
          tipo: "foto",
        });

        // refrescar galería
        const resImgs = await axios.get(`http://localhost:8000/api/excursiones/${id}/multimedia`);
        setImagenes(resImgs.data);
        setNuevaUrl("");
      }

      alert("Excursión actualizada correctamente ✅");
      navigate("/dashboard-admin/excursiones");
    } catch (err) {
      console.error("Error al actualizar excursión:", err);
      alert("Error al actualizar excursión ❌");
    }
  };

  const handleEliminarImagen = async (id_multimedia) => {
    if (!window.confirm("¿Eliminar esta imagen?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/multimedia/${id_multimedia}`);
      setImagenes((prev) => prev.filter((img) => img.id_multimedia !== id_multimedia));
    } catch (err) {
      console.error("Error al eliminar imagen:", err);
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

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" className="form-control" rows={4} value={excursion.descripcion || ""} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select name="id_categoria_excursion" className="form-select" value={excursion.id_categoria_excursion} onChange={handleChange}>
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria_excursion} value={cat.id_categoria_excursion}>
                {cat.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Guía asignado</label>
          <select name="id_guia" className="form-select" value={excursion.id_guia} onChange={handleChange}>
            <option value="">Seleccionar guía</option>
            {guias.map((g) => (
              <option key={g.id_usuario} value={g.id_usuario}>
                {g.nombre} {g.apellido}
              </option>
            ))}
          </select>
        </div>

        {/* 👇 Campo para agregar una nueva imagen por URL */}
        <div className="mb-3">
          <label className="form-label">Agregar imagen por URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://tuservidor.com/imagenes/excursion.jpg"
            value={nuevaUrl}
            onChange={(e) => setNuevaUrl(e.target.value)}
          />
          <small className="text-muted">
            Pegá la URL de una nueva imagen (se agregará al guardar).
          </small>
        </div>

        <button type="submit" className="btn btn-success">Guardar cambios</button>
      </form>

      {imagenes.length > 0 && (
        <div className="mt-4">
          <h6 className="fw-bold">Imágenes actuales</h6>
          <div className="d-flex flex-wrap gap-3">
            {imagenes.map((img) => (
              <div key={img.id_multimedia} className="position-relative">
                <img
                  src={img.url}
                  alt="Imagen"
                  className="img-thumbnail"
                  style={{ maxHeight: "200px" }}
                />
                <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  onClick={() => handleEliminarImagen(img.id_multimedia)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr className="my-4" />
      <FechasExcursion id_excursion={id} />
    </div>
  );
}
