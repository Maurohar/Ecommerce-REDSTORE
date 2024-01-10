import path from 'path';
import { Router } from 'express';
import { __dirname } from '../utils.js';
import CartSchema from '../models/schema.cart.js';


const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'cart.html'));
});


router.get('/cartItems', async (req, res) => {
  try {
    const CartItem = await CartSchema.find().populate('product');
    res.json(cartItems);
  } catch (error) {
    console.error('Error al obtener elementos del carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


router.post('/cartItems', async (req, res) => {
  const { productId, quantity } = req.body;

  try {

    const userId = '123';

    const newCartItem = new CartItem({
      product: productId,
      quantity: quantity,
      user: userId,
    });

    const savedCartItem = await newCartItem.save();
    res.json(savedCartItem);
  } catch (error) {
    console.error('Error al agregar elemento al carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;

