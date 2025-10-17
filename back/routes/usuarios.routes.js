// routes/usuariosRoutes.js
import express from "express";
import {
  getRoles,
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controller.js";

const router = express.Router();

// Rutas para roles
router.get("/roles", getRoles);

// Rutas para usuarios
router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", createUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

export default router;
