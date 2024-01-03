import Cart from '../models/schema.cart.js';

let putProduct = async (req, res) => {
    const { productId } = req.params;
    const { query } = req.query;
    let body = req.body;

    let productBuscando = await Cart.findById(productId);

    if (!query) {
        res.status(400).json({ mensaje: "Debes enviar una query" });

    } else if (productBuscando && query == "add") {
        body.amount = body.amount + 1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) => {
            res.json({
                    mensaje: `El producto: ${product.name} fue actualizado`,
                    product,
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                mensaje: "Ocurrió un error" });
            });

    } else {
        res.status(400).json({ mensaje: "Ocurrió un error" });
    }
};

export default putProduct;
