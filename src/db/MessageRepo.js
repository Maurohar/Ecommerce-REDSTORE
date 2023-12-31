import pkg from 'mongoose';
const { MongoClient } = pkg;

class MessageRepo {
  constructor() {

  }
  async SaveMessage(user, message) {
    let url = 'mongodb+srv://mauroharmitton:Password1@cluster0.453yel4.mongodb.net/Chat?retryWrites=true&w=majority';
    pkg.connect(url);

    let db = pkg.connection;

    db.on("error", console.error.bind(console, "connection error:"));

    db.once("open", function () {
      console.log("Connection Successful!");
    });

    let dbName = 'Chat';
    let dbCollection = 'messages';

    let schema = new pkg.Schema({
      user: String,
      message: String
    })

    let MessageSchema = pkg.model(message, schema, dbCollection)

    const mongoMessage = new MessageSchema({
      user: user,
      message: message
    });

    mongoMessage.save();
  }

};

export default MessageRepo;

















//que es crud, crud es acronimo que hace referencia a las
//operaciones fundamentales de una base de datos. por ejemplo
//CRUD SIGNIFICA- CREATE - READ - UPDATE - DELETE
//PERSISTENCIA USO DE ARCHIVOS COMO LA FUENTE DE NUESTROS DATOS
// 'GUARDAMOS' 'ACTUALIZAMOS' 'OBTENEMOS' 'BORRAMOS'.
//   'CREATE'     'UPDATE'      'READ'      'DELETE'


//cuando creamos un esquema (SCHEMA) en moongose, debemos crear un archivo, luego crear la conexion
//y luego podmeos incorporar esperando (await) nuestro archivo order.model.js dependiendo que tipo de proyecto realizemos.