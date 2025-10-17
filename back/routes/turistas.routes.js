// routes/turistasRoutes.js
import express from "express";
import {
  getTuristas,
  getTuristaById,
  createTurista,
  updateTurista,
  deleteTurista,
} from "../controllers/turistas.controller.js";

const router = express.Router();

// Turistas
router.get("/", getTuristas);
router.get("/:id", getTuristaById);
router.post("/", createTurista);
router.put("/:id", updateTurista);
router.delete("/:id", deleteTurista);


export default router;