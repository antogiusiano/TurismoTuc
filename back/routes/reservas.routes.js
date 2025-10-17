// routes/reservasRoutes.js
import express from "express";
import {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
  getPagos,
  createPago,
  deletePago,
} from "../controllers/reservas.controller.js";

const router = express.Router();

// Reservas
router.get("/", getReservas);
router.get("/:id", getReservaById);
router.post("/", createReserva);
router.put("/:id", updateReserva);
router.delete("/:id", deleteReserva);

// Pagos
router.get("/pagos/listar", getPagos);
router.post("/pagos", createPago);
router.delete("/pagos/:id", deletePago);

export default router;