// UserRepo.js
import mongoose from 'mongoose';
import UserModel from '../models/schema.users.js';

class UserRepo {
  constructor() {
    this.databaseName = 'Users';
    this.collectionName = 'user';
  }

  async connect() {
    const url = `mongodb+srv://mauroharmitton:Password1@cluster0.453yel4.mongodb.net/${this.databaseName}?retryWrites=true&w=majority`;

    console.log("Conectando a la base de datos MongoDB");
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

  async saveUser(user) {
    try {
      // Conectar solo si aún no estamos conectados
      if (!mongoose.connection.readyState) {
        await this.connect();
      }

      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
      console.log('Usuario guardado correctamente:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  }

  async getUserByEmail(username) {
    try {
      // Conectar solo si aún no estamos conectados
      if (!mongoose.connection.readyState) {
        await this.connect();
      }

      return await UserModel.findOne({ email: username });
    } catch (error) {
      console.error('Error al obtener usuario por correo electrónico:', error);
      throw error;
    }
  }
}

export default UserRepo;
