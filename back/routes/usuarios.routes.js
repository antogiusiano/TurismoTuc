import express from "express";
import {
  getRoles,
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario, // importamos
} from "../controllers/usuarios.controller.js";

const router = express.Router();

router.get("/roles", getRoles);
router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", createUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

// 🔹 Nuevo endpoint de login
router.post("/login", loginUsuario);

export default router;
