import express, { Router } from 'express';
import path from 'path'; // Agrega la importación de path
import { __dirname, isValidPassword } from '../utils.js';
import userloginModel from '../models/schema.users.js';
import UserRepo from '../db/UserRepo.js';
import bcrypt from 'bcrypt';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const router = Router();
const userRepo = new UserRepo();

const COOKIE_SECRET = "+{bOJv[++Dh38b)t)?AwD.W£62>C~`";

router.use(cookieParser(COOKIE_SECRET));
router.use(
  session({
    secret: 'COOKIE_SECRET',
    resave: true,
    saveUninitialized: true
  })
);

router.get('/', (req, res) => {
  if (req.session.userLoggedIn) {
    return res.sendFile(path.join(__dirname, '..', 'public', 'log-in.html'));
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'log-in.html'));
});

router.post('/', async (req, res) => {
  try {
    let userEmail = req.body.email;
    let inputPassword = req.body.password;

    let userM = await userRepo.getUserByEmail(userEmail);

    if (userM != null) {
      if (isValidPassword(inputPassword, userM.password)) {
        req.session.userLoggedIn = true;

        res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));

        res.cookie('Inicio de Sesion Cookie valido', true, {
          maxAge: 900000,
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });
      } else {
        console.log('Contraseña incorrecta');
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    } else {
      console.log('Usuario no encontrado');
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
