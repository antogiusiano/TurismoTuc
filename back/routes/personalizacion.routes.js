
// routes/personalizacionRoutes.js
import express from "express";
import {
  getCategorias,
  createCategoria,
  getPreguntas,
  createPregunta,
  getPreguntasPorExcursion,
  addPreguntaAExcursion,
  getRespuestasPorReserva,
  addRespuestaPersonalizacion,
} from "../controllers/personalizacion.controller.js";

const router = express.Router();

// Categorías
router.get("/categorias", getCategorias);
router.post("/categorias", createCategoria);

// Preguntas
router.get("/preguntas", getPreguntas);
router.post("/preguntas", createPregunta);

// Asociación excursión ↔ preguntas
router.get("/excursion/:id_excursion", getPreguntasPorExcursion);
router.post("/excursion", addPreguntaAExcursion);

// Respuestas
router.get("/reserva/:id_reserva", getRespuestasPorReserva);
router.post("/reserva", addRespuestaPersonalizacion);

export default router;
