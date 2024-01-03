import path from 'path';
import { Router } from 'express';
import { __dirname, isValidPassword } from '../utils.js';
import userloginModel from '../models/schema.users.js';
import UserRepo from '../db/UserRepo.js';
import bcrypt from 'bcrypt';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';

const router = Router();
const userRepo = new UserRepo();

// Utilizamos cookie-parser
router.use(cookieParser());

router.get('/', (req, res) => {
  // Verificar si el usuario ya está autenticado mediante cookie
  if (req.cookies.userLoggedIn) {
    return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
  }

  res.sendFile(path.join(__dirname, '..', 'public', 'log-in.html'));
});

router.post('/', async (req, res) => {
  try {
    let userEmail = req.body.email;
    let inputPassword = req.body.password;

    // Obtener el usuario guardado en la base de datos
    let userM = await userRepo.getUserByEmail(userEmail);

    if (userM != null) {
      // Validar la contraseña
      if (isValidPassword(inputPassword, userM.password)) {
        // Enviar la página de inicio
        res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));

        // Establecer la cookie de inicio de sesión
        res.cookie('userLoggedIn', true, { maxAge: 900000, httpOnly: true });
      } else {
        console.log("Contraseña incorrecta");
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    } else {
      console.log("Usuario no encontrado");
      res.status(404).json({ error: 'Usuario no encontrado' });
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;


/* para el tema de los carritos:
1) Cambiar cartmanager para que guarde en mongo
2) Cada cart tiene que tener el nombre de usuario
3) primera ves que el usuario agrega algo a un carrito te fijas si ya existe un carrito para el. Sino lo creas
3.5) cuando creas carrito, guardas el cartId en la sesión (cartId)
4) Con cada click en agregar al carrito llamas a CartManager.router.post('/carts/:cId/product/:pId'
5) Cuando el usuario va a ver la pagina del carrito vas a mostrar todo lo guardado en router.get('/carts/:cId', async (req, res) => {

 */