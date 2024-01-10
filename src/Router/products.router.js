import path from 'path';
import { Router } from 'express';
import { __dirname } from '../utils.js';
import Product from '../models/schema.products.js';

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'products.html'));
});


// Obtener todos los productos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un producto por ID
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;