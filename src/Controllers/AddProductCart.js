import Cart from '../models/schema.products.js';
import Product from '../models/schema.cart.js';
import CartRepo from '../db/CartRepo.js';


let AddProductCart = async (username, prodId) => {
let cart = CartRepo.getCartByUsername(username);
if(cart == null)
{
    cart = CartRepo.createEmptyCart();
}
if(cart.products.find(prodId) > 0)
    cart.products[prodId].quantity = cart.products[prodId].quantity + 1;
else
    cart.products.add({prodId: prodId, quantity:1});

CartRepo.save(cart);

};

export default AddProductCart;