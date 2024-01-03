import Product from '../models/schema.products.js';

let getProducts = async (req, res) => {
    try {
        let products = await Product.find();

        if (products) {
            res.json({ products });
        } else {
            res.json({ mensaje: "No hay productos" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener productos" });
    }
};

export default getProducts;