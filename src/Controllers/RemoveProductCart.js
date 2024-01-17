import Cart from '../models/schema.products.js';
import Product from '../models/schema.cart.js';
import CartRepo from '../db/CartRepo.js';

let RemoveProductCart = async (username, prodId) => {
    let cart = CartRepo.getCartByUsername(username);

    if (cart === null) {
        cart = CartRepo.createEmptyCart();
    }

    const existingProduct = cart.products.find(product => product.prodId === prodId);

    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity = existingProduct.quantity - 1;
        } else {
            cart.products = cart.products.filter(product => product.prodId !== prodId);
        }

        CartRepo.save(cart);
    }
};

export default RemoveProductCart;