const router = express.Router();

import {
    getCarritoByTurista,
    createCarrito,
    addItemCarrito,
    getItemsCarrito,
    deleteItemCarrito,
  } from "../controllers/carrito.controller.js";


// Carrito
router.get("/:id_turista/carrito", getCarritoByTurista);
router.post("/carrito", createCarrito);
router.post("/carrito/item", addItemCarrito);
router.get("/carrito/:id_carrito/items", getItemsCarrito);
router.delete("/carrito/item/:id_item", deleteItemCarrito);

export default router;