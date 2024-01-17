import path from 'path';
import { Router } from 'express';
import CartItem from '../models/schema.cart.js';
import { __dirname } from '../utils.js';
import AddProductCart from '../Controllers/AddProductCart.js';

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'cart.html'));
});

router.get('/cartItems', async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate('product');
        res.json(cartItems);
    } catch (error) {
        console.error('Error al obtener elementos del carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/addProd', async (req, res) => {
    const userId = req.session.userId;
    const prodId = req.body.prodId;

    try {
        await AddProductCart(userId, prodId);
        res.status(200).json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/cartItems', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

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
