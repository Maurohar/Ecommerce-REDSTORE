import addProductCartController from '../Controllers/AddProductCart.js';
import deleteProductCartController from '../Controllers/DeleteProductCart.js';
import getProductController from '../Controllers/GetProduct.js';
import getProductCartController from '../Controllers/GetProductCart.js';
import putProductController from '../Controllers/PutProduct.js';


import express from 'express';
const router = express.Router();

router.get("/products", getProductController); //obtiene productos 
router.get("/products-cart", getProductCartController); //obtiene productos del carrito si el cliente lo solicito.
router.post("/products-cart", addProductCartController); //crea un nuevo post de los productos seleccionados.
router.put("/products-cart/:productId", putProductController); //valida en la base de datos si existen productos y los actualiza.
router.delete("/products-cart/:productId", deleteProductCartController);

export default router;