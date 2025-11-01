// routes/excursiones.routes.js
import express from "express";
import {
  getExcursiones,
  getExcursionById,
  createExcursion,
  updateExcursion,
  deleteExcursion,
  getFechasByExcursion,
  createFechaExcursion,
  updateFechaExcursion,
  deleteFechaExcursion,
} from "../controllers/excursiones.controller.js";

const router = express.Router();

// ====== EXCURSIONES ======
router.get("/", getExcursiones);
router.get("/:id", getExcursionById);
router.post("/", createExcursion);
router.put("/:id", updateExcursion);
router.delete("/:id", deleteExcursion);

// ====== FECHAS DE EXCURSIÓN ======
router.get("/:id_excursion/fechas", getFechasByExcursion);
router.post("/fechas-excursion", createFechaExcursion);
router.put("/fechas/:id", updateFechaExcursion); // ← faltaba esta
router.delete("/fechas/:id", deleteFechaExcursion);

export default router;
