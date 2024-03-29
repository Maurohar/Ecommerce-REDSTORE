import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as PassportStrategy } from "passport-strategy";
import { __dirname, createHash, isValidPassword } from '../utils.js';
/* import configPassport from '../config/passport.config.js'; */

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { init } from './socket.servidor.js';

import homeRouter from '../Router/home.router.js';
import chatRouter from '../Router/chat.router.js';
import cartRouter from '../Router/cart.router.js';
import cookieRouter from '../Router/cookie.router.js';
import UserRegisterRouter from '../Router/login.router.js';
import RegisterRouter from '../Router/register.router.js';
import productRouter from '../Router/products.router.js';
import routes from '../Router/products.router.js';

import LoginRepo from '../db/UserRepo.js';
import CartRepo from '../db/CartRepo.js';
import connectDB from '../db/ProductRepo.js';
connectDB();



import User from '../models/schema.users.js';
import CartModel from '../models/schema.cart.js'

const app = express();

const COOKIE_SECRET = "+{bOJv[++Dh38b)t)?AwD.W£62>C~`";

app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, '..', 'public', 'css', 'styles.css')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');

app.use('/home', homeRouter);
app.use('/chat', chatRouter);
app.use('/login', UserRegisterRouter);
app.use('/register', RegisterRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

app.use(session({ secret: COOKIE_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


const startServer = async () => {
    try {
        // Establece la conexión a la base de datos
        await LoginRepo();
        // Inicia el servidor después de establecer la conexión
        const httpServer = app.listen(8080, () => {
            console.log('Server ON PORT 8080');
        });
        // Inicia otros servicios (si es necesario)
        init(httpServer);
    } catch (error) {
        console.error(`Error al iniciar el servidor: ${error}`);
    }
};

const httpServer = app.listen(8080, () => {
    console.log('Server ON PORT 8080');
});

init(httpServer);
