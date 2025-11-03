// routes/turistasRoutes.js
import express from "express";
import {
  getTuristas,
  getTuristaById,
  createTurista,
  updateTurista,
  deleteTurista,
} from "../controllers/turistas.controller.js";
// Importar la función para obtener reservas de turistas
import { getReservasByTurista } from "../controllers/turistas.controller.js";

const router = express.Router();

// Turistas
router.get("/", getTuristas);
router.get("/:id/reservas", getReservasByTurista); // 👈 debe ir antes de /:id
router.get("/:id", getTuristaById);
router.post("/", createTurista);
router.put("/:id", updateTurista);
router.delete("/:id", deleteTurista);


// Obtener reservas de un turista por ID


export default router;

// ⚠️ el orden importa: la más específica debe ir después
router.get("/:id/reservas", getReservasByTurista);
router.get("/:id", getTuristaById);
