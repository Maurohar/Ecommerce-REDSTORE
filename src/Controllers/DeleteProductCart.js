import mongoose from 'mongoose';
import Cart from '../models/schema.cart.js';
import Product from '../models/schema.products.js';

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Verificar si productId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ mensaje: 'El productId no es válido.' });
        }

        // Buscamos el producto en el carrito
        const productInCart = await Cart.findById(productId);

        // Si el producto no está en el carrito, responder con un mensaje
        if (!productInCart) {
            return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito.' });
        }

        // Buscamos el producto en la colección Product por el nombre
        const product = await Product.findOne({ name: productInCart.name });

        // Si el producto no está en la colección Product, responder con un mensaje
        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado en la base de datos.' });
        }

        // Buscamos y eliminamos el producto del carrito
        await Cart.findByIdAndDelete(productId);

        // Actualizamos el producto en la colección Product
        const updatedProduct = await Product.findByIdAndUpdate(
            product._id,
            { inCart: false },
            { new: true }
        );

        res.json({
            mensaje: `El producto ${updatedProduct.name} fue eliminado del carrito.`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Hubo un error",
            error: error.message,
        });
    }
};

export default deleteProduct;