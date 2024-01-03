import mongoose from 'mongoose';

const MONGO_URL = 'mongodb+srv://mauroharmitton:Password1@cluster0.453yel4.mongodb.net/Product?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
};

export default connectDB;