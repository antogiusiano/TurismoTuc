// controllers/excursionesController.js
import { pool } from "../config/DB.js";

// =============================
// EXCURSIONES
// =============================
// Obtener todas las excursiones
export const getExcursiones = (req, res) => {
  const { ubicacion, precio_min, precio_max, duracion, estado } = req.query;

  let sql = `
    SELECT id_excursion, titulo, descripcion, precio_base, duracion, 
           ubicacion, incluye, politicas, estado, fecha_creacion
    FROM Excursiones
    WHERE eliminado = 0
  `;
  const values = [];

  if (ubicacion) {
    sql += " AND ubicacion LIKE ?";
    values.push(`%${ubicacion}%`);
  }

  if (duracion) {
    sql += " AND duracion LIKE ?";
    values.push(`%${duracion}%`);
  }

  if (precio_min) {
    sql += " AND precio_base >= ?";
    values.push(precio_min);
  }

  if (precio_max) {
    sql += " AND precio_base <= ?";
    values.push(precio_max);
  }

  if (estado) {
    sql += " AND estado = ?";
    values.push(estado);
  }

  sql += " ORDER BY fecha_creacion DESC";

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error al obtener excursiones:", err);
      return res.status(500).json({ message: "Error al obtener excursiones" });
    }
    res.json(results);
  });
};

// Obtener una excursión por ID
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
// Crear una nueva excursión
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
// Actualizar una excursión existente
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
// Eliminar (baja lógica) una excursión
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


// obtener todas las fechas de todas la excursiones
export const getTodasLasFechasExcursion = (req, res) => {
  const sql = `
    SELECT 
      f.id_fecha,
      f.fecha,
      f.hora_salida,
      f.cupo_disponible,
      e.titulo,
      e.precio_base
    FROM FechasExcursion f
    JOIN Excursiones e ON f.id_excursion = e.id_excursion
    WHERE f.eliminado = 0 AND e.eliminado = 0
    ORDER BY f.fecha ASC
  `;

  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener todas las fechas:", err);
      return res.status(500).json({ message: "Error al obtener fechas de excursión" });
    }
    res.json(results);
  });
};
// Obtener todas las fechas para una excursión específica
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
// Crear una nueva fecha para una excursión
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
// Eliminar (baja lógica) una fecha de excursión
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


// Actualizar fecha y hora de salida de una excursión
export const updateFechaExcursion = (req, res) => {
  const { id } = req.params;
  const { fecha, hora_salida, cupo_maximo, cupo_disponible, estado } = req.body;

  // Validación mínima
  if (!fecha && !hora_salida && !cupo_maximo && !cupo_disponible && !estado)
    return res.status(400).json({ message: "No se enviaron datos para actualizar" });

  const fields = [];
  const values = [];

  if (fecha) {
    fields.push("fecha = ?");
    values.push(fecha);
  }
  if (hora_salida) {
    fields.push("hora_salida = ?");
    values.push(hora_salida);
  }
  if (cupo_maximo) {
    fields.push("cupo_maximo = ?");
    values.push(cupo_maximo);
  }
  if (cupo_disponible) {
    fields.push("cupo_disponible = ?");
    values.push(cupo_disponible);
  }
  if (estado) {
    fields.push("estado = ?");
    values.push(estado);
  }

  const sql = `
    UPDATE FechasExcursion
    SET ${fields.join(", ")}
    WHERE id_fecha = ? AND eliminado = 0
  `;
  values.push(id);

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar fecha de excursión:", err);
      return res.status(500).json({ message: "Error al actualizar fecha" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Fecha no encontrada" });

    res.json({ message: "Fecha de excursión actualizada correctamente" });
  });
};