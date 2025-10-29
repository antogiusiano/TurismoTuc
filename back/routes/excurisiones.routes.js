// routes/excursionesRoutes.js
import express from "express";
import {
  getExcursiones,
  getExcursionById,
  createExcursion,
  updateExcursion,
  deleteExcursion,
  getFechasByExcursion,
  createFechaExcursion,
  deleteFechaExcursion,
} from "../controllers/excursiones.controller.js";

const router = express.Router();

// Rutas de excursiones
router.get("/", getExcursiones);
router.get("/:id", getExcursionById);
router.post("/", createExcursion);
router.put("/:id", updateExcursion);
router.delete("/:id", deleteExcursion);

// Rutas de fechas de excursión
router.get("/:id_excursion/fechas", getFechasByExcursion);
router.post("/fechas-excursion", createFechaExcursion);
router.delete("/fechas/:id", deleteFechaExcursion);

export default router;