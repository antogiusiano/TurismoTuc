import { pool } from "../config/DB.js";


// =============================
// CARRITO
// =============================

// Obtener carrito de un turista (solo el activo)
export const getCarritoByTurista = (req, res) => {
    const { id_turista } = req.params;
    const sql = `
      SELECT c.id_carrito, c.estado, c.fecha_creacion
      FROM Carrito c
      WHERE c.id_turista = ? AND c.eliminado = 0
      ORDER BY c.id_carrito DESC
    `;
    pool.query(sql, [id_turista], (err, results) => {
      if (err) {
        console.error("Error al obtener carrito:", err);
        return res.status(500).json({ message: "Error al obtener carrito" });
      }
      if (results.length === 0)
        return res.status(404).json({ message: "El turista no tiene carritos activos" });
      res.json(results[0]);
    });
  };
  
  // Crear nuevo carrito para un turista
  export const createCarrito = (req, res) => {
    const { id_turista } = req.body;
    if (!id_turista)
      return res.status(400).json({ message: "Falta id_turista" });
  
    const sql = `
      INSERT INTO Carrito (id_turista, estado)
      VALUES (?, 'abierto')
    `;
    pool.query(sql, [id_turista], (err, result) => {
      if (err) {
        console.error("Error al crear carrito:", err);
        return res.status(500).json({ message: "Error al crear carrito" });
      }
      res.status(201).json({ message: "Carrito creado correctamente", id: result.insertId });
    });
  };
  
  // Agregar item al carrito
  export const addItemCarrito = (req, res) => {
    const { id_carrito, id_fecha, cantidad_personas, precio_unitario } = req.body;
  
    if (!id_carrito || !id_fecha || !cantidad_personas || !precio_unitario)
      return res.status(400).json({ message: "Faltan datos obligatorios" });
  
    const subtotal = cantidad_personas * precio_unitario;
  
    const sql = `
      INSERT INTO CarritoItems (id_carrito, id_fecha, cantidad_personas, precio_unitario, subtotal)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [id_carrito, id_fecha, cantidad_personas, precio_unitario, subtotal];
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al agregar item al carrito:", err);
        return res.status(500).json({ message: "Error al agregar item" });
      }
      res.status(201).json({ message: "Item agregado correctamente", id: result.insertId });
    });
  };
  
  // Obtener items de un carrito
  export const getItemsCarrito = (req, res) => {
    const { id_carrito } = req.params;
  
    const sql = `
      SELECT ci.id_item, e.titulo AS excursion, f.fecha, ci.cantidad_personas, 
             ci.precio_unitario, ci.subtotal
      FROM CarritoItems ci
      JOIN FechasExcursion f ON ci.id_fecha = f.id_fecha
      JOIN Excursiones e ON f.id_excursion = e.id_excursion
      WHERE ci.id_carrito = ? AND ci.eliminado = 0
    `;
    pool.query(sql, [id_carrito], (err, results) => {
      if (err) {
        console.error("Error al obtener items del carrito:", err);
        return res.status(500).json({ message: "Error al obtener items" });
      }
      res.json(results);
    });
  };
  
  // Eliminar item del carrito (baja lógica)
  export const deleteItemCarrito = (req, res) => {
    const { id_item } = req.params;
    const sql = `
      UPDATE CarritoItems
      SET eliminado=1, fecha_eliminacion=NOW()
      WHERE id_item=?
    `;
    pool.query(sql, [id_item], (err, result) => {
      if (err) {
        console.error("Error al eliminar item:", err);
        return res.status(500).json({ message: "Error al eliminar item" });
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Item no encontrado" });
      res.json({ message: "Item eliminado (baja lógica) correctamente" });
    });
  };
  