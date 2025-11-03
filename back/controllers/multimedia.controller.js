import { pool } from "../config/DB.js";

// Subir imagen y guardar en la tabla Multimedia
export const createMultimedia = (req, res) => {
  const { id_excursion, tipo } = req.body;
  const file = req.file;

  if (!file || !id_excursion || !tipo)
    return res.status(400).json({ message: "Faltan datos o archivo" });

  const url = `http://localhost:8000/uploads/${file.filename}`;

  const sql = `INSERT INTO Multimedia (tipo, url, id_excursion) VALUES (?, ?, ?)`;
  const values = [tipo, url, id_excursion];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al guardar multimedia:", err);
      return res.status(500).json({ message: "Error al guardar imagen" });
    }
    res.status(201).json({ message: "Imagen guardada", url });
  });
};

// Obtener todas las imágenes de una excursión
export const getMultimediaByExcursion = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM Multimedia WHERE id_excursion = ? AND tipo = 'foto'`;
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener imágenes:", err);
      return res.status(500).json({ message: "Error al obtener imágenes" });
    }
    res.json(results);
  });
};