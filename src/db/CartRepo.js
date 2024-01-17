import mongoose from 'mongoose';
import CartModel from '../models/schema.cart.js';

class CartRepo {
    constructor() {
        this.databaseName = 'Cart';
        this.collectionName = 'cart';
    }

    async connect() {
        const url = `mongodb+srv://mauroharmitton:Password1@cluster0.453yel4.mongodb.net/${this.databaseName}?retryWrites=true&w=majority`;

        try {
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 5000,
            });

            console.log(`Conexión a MongoDB (${this.databaseName}) establecida`);
        } catch (error) {
            console.error(`Error en la conexión a MongoDB: ${error}`);
            throw error;
        }

        mongoose.connection.on('disconnected', () => {
            console.log(`Conexión a MongoDB (${this.databaseName}) desconectada`);
        });
    }

    async createEmptyCart(){
        try{
            await this.connect();
            let newCartItem = await CartRepo.save();
            return newCartItem;
        }
        catch (error) {
            console.error('Error al crear carrito:', error);
            throw error;
        }
    }

    async getCartByUsername(username){
        try{
            await this.connect();
            let existingCart = await CartRepo.find(username);
            return existingCart;
        }
        catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

    async addToCart(cartData) {
        try {
            await this.connect();

            const savedCartItem = await newCartItem.save();

            console.log('Producto agregado al carrito correctamente:', savedCartItem);
            return savedCartItem;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

    async save(cart){
        await this.connect();
        await CartRepo.save(cart);
    }
    
}

export default CartRepo;