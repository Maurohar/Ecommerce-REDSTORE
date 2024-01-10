import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
});

const CartItem = mongoose.model('Cart', cartSchema);

export default CartItem;