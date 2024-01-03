// Deberías exportar el modelo, no el esquema directamente

import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

// Exporta el modelo, no el esquema directamente
let Cart = mongoose.model('Cart', CartSchema);

export default Cart;
