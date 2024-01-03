import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
    },
    inCart: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: true,
    },
});

let Product = model("Product", productSchema);

export default Product;