import { Router } from 'express';
import UserRepo from '../db/UserRepo.js';
import * as path from 'path'; 
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { __dirname } from '../utils.js';

const router = Router();
const userRepo = new UserRepo();

const createHash = (password) => {
  const saltRounds = 10; 
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
  return hash;
};

router.get('/', (req, res) => {
  const registerPagePath = path.join(__dirname, '..', 'public', 'register-session.html');
  res.sendFile(registerPagePath);
});

router.post('/', async (req, res) => {
  try {
    const existingUser = await userRepo.getUserByEmail(req.body.email);

    if (existingUser) {

      return res.status(400).json({ error: 'Correo electrónico ya registrado' });
    }

    if (existingUser && bcrypt.compareSync(req.body.password, existingUser.password)) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: createHash(req.body.password),
      age: req.body.age,
      CartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }
    };

    const savedUser = await userRepo.saveUser(user);
    res.status(200).json(savedUser);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
