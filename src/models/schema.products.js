import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    inCart: {
        type: Boolean,
        default: false,
    },
});

productSchema.index({ name: 1 }, { unique: true });
const Product = model("Product", productSchema);

export default productSchema;

