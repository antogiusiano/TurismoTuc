// controllers/turistasController.js
import { pool } from "../config/DB.js";

// =============================
// TURISTAS
// =============================

// Listar todos los turistas activos
export const getTuristas = (req, res) => {
  const sql = `
    SELECT id_turista, nombre, apellido, email, telefono, direccion, nacionalidad
    FROM Turistas
    WHERE eliminado = 0
    ORDER BY nombre ASC
  `;

  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener turistas:", err);
      return res.status(500).json({ message: "Error al obtener turistas" });
    }
    res.json(results);
  });
};

// Obtener un turista por ID
export const getTuristaById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT id_turista, nombre, apellido, email, telefono, direccion, nacionalidad
    FROM Turistas
    WHERE id_turista = ? AND eliminado = 0
  `;
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener turista:", err);
      return res.status(500).json({ message: "Error al obtener turista" });
    }
    if (results.length === 0)
      return res.status(404).json({ message: "Turista no encontrado" });
    res.json(results[0]);
  });
};

// Crear un nuevo turista
export const createTurista = (req, res) => {
  const { nombre, apellido, email, telefono, direccion, nacionalidad } = req.body;

  if (!nombre || !apellido)
    return res.status(400).json({ message: "Faltan datos obligatorios" });

  const sql = `
    INSERT INTO Turistas (nombre, apellido, email, telefono, direccion, nacionalidad)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [nombre, apellido, email, telefono, direccion, nacionalidad];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al crear turista:", err);
      return res.status(500).json({ message: "Error al crear turista" });
    }
    res.status(201).json({ message: "Turista agregado correctamente", id: result.insertId });
  });
};

// Modificar un turista existente
export const updateTurista = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, direccion, nacionalidad } = req.body;

  const sql = `
    UPDATE Turistas
    SET nombre=?, apellido=?, email=?, telefono=?, direccion=?, nacionalidad=?
    WHERE id_turista=? AND eliminado=0
  `;
  const values = [nombre, apellido, email, telefono, direccion, nacionalidad, id];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar turista:", err);
      return res.status(500).json({ message: "Error al actualizar turista" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Turista no encontrado" });
    res.json({ message: "Turista actualizado correctamente" });
  });
};

// Baja lógica
export const deleteTurista = (req, res) => {
  const { id } = req.params;
  const sql = `
    UPDATE Turistas
    SET eliminado=1, fecha_eliminacion=NOW()
    WHERE id_turista=?
  `;
  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar turista:", err);
      return res.status(500).json({ message: "Error al eliminar turista" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Turista no encontrado" });
    res.json({ message: "Turista eliminado (baja lógica) correctamente" });
  });
};
