import express from "express";
import {
  getExcursiones,
  getExcursionById,
  createExcursion,
  updateExcursion,
  deleteExcursion,
  updateCategoriaExcursion,
  getMultimediaByExcursion,
  createMultimedia, 
  deleteMultimedia,
  getCategoriasExcursion,
  getFechasByExcursion,
  createFechaExcursion,
  updateFechaExcursion,
  deleteFechaExcursion,
  getGuias,
} from "../controllers/excursiones.controller.js";

const router = express.Router();

// =============================
// Rutas de Excursiones
// =============================

// 🔹 Primero las rutas específicas
router.get("/categorias-excursion", getCategoriasExcursion);
router.post("/categoria", updateCategoriaExcursion);
router.get("/guias", getGuias);

// 🔹 Luego las rutas dinámicas
router.get("/", getExcursiones);
router.post("/", createExcursion);
router.put("/:id", updateExcursion);
router.delete("/:id", deleteExcursion);
router.get("/:id", getExcursionById);


// =============================
// MULTIMEDIA
// =============================


router.get("/:id_excursion/multimedia", getMultimediaByExcursion);
router.post("/multimedia", createMultimedia);
router.delete("/multimedia/:id", deleteMultimedia);


// =============================
// Rutas de Fechas de Excursión
// =============================
router.get("/:id_excursion/fechas", getFechasByExcursion);
router.post("/fechas-excursion", createFechaExcursion);
router.put("/fechas/:id", updateFechaExcursion);
router.delete("/fechas/:id", deleteFechaExcursion);

export default router;