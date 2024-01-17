import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [{ prodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  username: { type: String },
});

const CartItem = mongoose.model('Cart', cartSchema);

export default CartItem;
