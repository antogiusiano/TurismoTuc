// routes/resenasRoutes.js
import express from "express";
import {
  getTokens,
  validarToken,
  getResenas,
  createResena,
  deleteResena,
  getMultimediaByExcursion,
  addMultimedia,
  deleteMultimedia,
} from "../controllers/resenia.controller.js";

const router = express.Router();

// Tokens
router.get("/tokens", getTokens);
router.get("/tokens/:token", validarToken);

// Reseñas
router.get("/", getResenas);
router.post("/", createResena);
router.delete("/:id", deleteResena);

// Multimedia
router.get("/multimedia/:id_excursion", getMultimediaByExcursion);
router.post("/multimedia", addMultimedia);
router.delete("/multimedia/:id", deleteMultimedia);

export default router;
