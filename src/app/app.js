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

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { init } from './socket.servidor.js';

// Utiliza `import.meta.url` para obtener la URL del módulo actual
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

import homeRouter from '../Router/home.router.js';
import chatRouter from '../Router/chat.router.js';
import cartRouter from '../Router/cart.router.js';
import cookieRouter from '../Router/cookie.router.js';
import UserRegisterRouter from '../Router/login.router.js';
import RegisterRouter from '../Router/register.router.js';
import productRouter from '../Router/products.router.js';
import LoginRepo from '../db/UserRepo.js';
import User from '../models/schema.users.js';

const app = express();

const COOKIE_SECRET = "+{bOJv[++Dh38b)t)?AwD.W£62>C~`";

app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, '..', 'public', 'css')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/home', homeRouter);
app.use('/chat', chatRouter);
app.use('/login', UserRegisterRouter);
app.use('/register', RegisterRouter);
app.use('/products', productRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(session({ secret: COOKIE_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.post('/register', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash: true,
}));

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
}));

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            console.log('Llegué hasta la estrategia local');
            const user = await User.findOne({ email });

            if (!user) {
                console.log('Email no encontrado');
                return done(null, false, { message: 'Email no encontrado' });
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                console.log('Contraseña incorrecta');
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            console.log('Usuario autenticado exitosamente');
            return done(null, user);
        } catch (error) {
            console.error(`Error en la consulta a la base de datos: ${error}`);
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    console.log('Serializando usuario');
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializando usuario');
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

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
