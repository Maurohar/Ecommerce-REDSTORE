import Cart from '../models/schema.products.js';
import Product from '../models/schema.cart.js';

let AddProductCart = async (req, res) => {
    let { name, img, price } = req.body;

    let estaEnProducts = await Product.findOne({ name });

    let noEstaVacio = name !== "" && img !== "" && price !== "";

    let estaEnElCarrito = await Cart.findOne({ name });

    if (!estaEnProducts) {
        res.status(400).json({
            mensaje: "Este producto no está en nuestra base de datos"
        });
    } else if (noEstaVacio && !estaEnElCarrito) {
        let newProductInCart = new Cart({ name, img, price, ammount: 1 });

        await Product.findByIdAndUpdate(
            estaEnProducts?._id,
            { inCart: true, name, img, price },
            { new: true }
        )
        .then((product) => {
            newProductInCart.save();
            res.json({
                mensaje: "El producto fue agregado al carrito",
                product,
            });
        })
        .catch((error) => console.error(error));
    } else if (estaEnElCarrito) {
        res.json({
            mensaje: "El producto ya está en el carrito",
        });
    }
};

export default AddProductCart;