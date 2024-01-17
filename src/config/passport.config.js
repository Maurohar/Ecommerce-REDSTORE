import passport from 'passport';
import LocalStrategy from 'passport-local';
import GithubStrategy from 'passport-github2';
import UserModel from '../models/schema.users.js'; // Ajusta la ruta según tu estructura


passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            console.log('Llegué hasta la estrategia local');
            const user = await UserModel.findOne({ email });

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

// Define la estrategia de GitHub
const githubOpts = {
    clientID: 'Iv1.5f49310cecaee54e',
    clientSecret: "3ac875b04055a5d005f87d4087ef7d75f421ee4b",
    callbackURL: 'http://localhost:8080/api/sessions/github/callback',
};

passport.use('github', new GithubStrategy(githubOpts, async (accesstoken, refreshToken, profile, done) => {
    const email = profile._json.email;
    try {
        let user = await UserModel.findOne({ email });

        if (user) {
            return done(null, user);
        }

        user = {
            first_name: profile._json.name,
            last_name: "",
            email: "",
            password: "",
            age: 18,
        };

        const newUser = await UserModel.create(user);
        done(null, newUser);
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user, done) => {
    console.log('Serializando usuario');
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializando usuario');
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Lógica para el registro
app.post('/register', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash: true,
}));

// Lógica para el inicio de sesión
app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true,
}));

// Ruta para autenticación de GitHub
app.get('/auth/github', passport.authenticate('github'));

// Callback de GitHub
app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {

        res.redirect('/home');
    }
);
