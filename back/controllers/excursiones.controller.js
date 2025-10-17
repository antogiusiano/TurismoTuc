// controllers/excursionesController.js
import { pool } from "../config/DB.js";

// =============================
// EXCURSIONES
// =============================
export const getExcursiones = (req, res) => {
  const sql = `SELECT id_excursion, titulo, descripcion, precio_base, duracion, 
                      ubicacion, incluye, politicas, estado, fecha_creacion
               FROM Excursiones
               WHERE eliminado = 0
               ORDER BY fecha_creacion DESC`;

  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener excursiones:", err);
      return res.status(500).json({ message: "Error al obtener excursiones" });
    }
    res.json(results);
  });
};

export const getExcursionById = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT id_excursion, titulo, descripcion, precio_base, duracion, 
                      ubicacion, incluye, politicas, estado, fecha_creacion
               FROM Excursiones
               WHERE id_excursion = ? AND eliminado = 0`;

  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener excursión:", err);
      return res.status(500).json({ message: "Error al obtener excursión" });
    }
    if (results.length === 0)
      return res.status(404).json({ message: "Excursión no encontrada" });
    res.json(results[0]);
  });
};

export const createExcursion = (req, res) => {
  const { titulo, descripcion, precio_base, duracion, ubicacion, incluye, politicas } = req.body;

  if (!titulo || !precio_base)
    return res.status(400).json({ message: "Faltan datos obligatorios" });

  const sql = `INSERT INTO Excursiones 
              (titulo, descripcion, precio_base, duracion, ubicacion, incluye, politicas)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [titulo, descripcion, precio_base, duracion, ubicacion, incluye, politicas];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al crear excursión:", err);
      return res.status(500).json({ message: "Error al crear excursión" });
    }
    res.status(201).json({ message: "Excursión creada correctamente", id: result.insertId });
  });
};

export const updateExcursion = (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, precio_base, duracion, ubicacion, incluye, politicas, estado } = req.body;

  const sql = `UPDATE Excursiones
               SET titulo=?, descripcion=?, precio_base=?, duracion=?, ubicacion=?, 
                   incluye=?, politicas=?, estado=?
               WHERE id_excursion=? AND eliminado=0`;

  const values = [titulo, descripcion, precio_base, duracion, ubicacion, incluye, politicas, estado, id];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar excursión:", err);
      return res.status(500).json({ message: "Error al actualizar excursión" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Excursión no encontrada" });
    res.json({ message: "Excursión actualizada correctamente" });
  });
};

export const deleteExcursion = (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE Excursiones
               SET eliminado=1, fecha_eliminacion=NOW()
               WHERE id_excursion=?`;

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar excursión:", err);
      return res.status(500).json({ message: "Error al eliminar excursión" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Excursión no encontrada" });
    res.json({ message: "Excursión eliminada (baja lógica) correctamente" });
  });
};

// =============================
// FECHAS DE EXCURSIÓN
// =============================
export const getFechasByExcursion = (req, res) => {
  const { id_excursion } = req.params;

  const sql = `SELECT id_fecha, fecha, hora_salida, cupo_maximo, cupo_disponible, estado
               FROM FechasExcursion
               WHERE id_excursion = ? AND eliminado = 0
               ORDER BY fecha ASC`;

  pool.query(sql, [id_excursion], (err, results) => {
    if (err) {
      console.error("Error al obtener fechas de excursión:", err);
      return res.status(500).json({ message: "Error al obtener fechas" });
    }
    res.json(results);
  });
};

export const createFechaExcursion = (req, res) => {
  const { id_excursion, fecha, hora_salida, cupo_maximo } = req.body;

  if (!id_excursion || !fecha || !cupo_maximo)
    return res.status(400).json({ message: "Faltan datos obligatorios" });

  const sql = `INSERT INTO FechasExcursion 
               (id_excursion, fecha, hora_salida, cupo_maximo, cupo_disponible)
               VALUES (?, ?, ?, ?, ?)`;
  const values = [id_excursion, fecha, hora_salida, cupo_maximo, cupo_maximo];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al crear fecha:", err);
      return res.status(500).json({ message: "Error al crear fecha" });
    }
    res.status(201).json({ message: "Fecha agregada correctamente", id: result.insertId });
  });
};

export const deleteFechaExcursion = (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE FechasExcursion
               SET eliminado=1, fecha_eliminacion=NOW()
               WHERE id_fecha=?`;

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar fecha:", err);
      return res.status(500).json({ message: "Error al eliminar fecha" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Fecha no encontrada" });
    res.json({ message: "Fecha eliminada (baja lógica) correctamente" });
  });
};
