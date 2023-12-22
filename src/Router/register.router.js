import { Router } from 'express';
import UserRepo from '../db/UserRepo.js';
import * as path from 'path'; 
import { fileURLToPath } from 'url';
import { __dirname } from '../utils.js'

const router = Router();
const userRepo = new UserRepo();

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 */
router.get('/', (req, res) => {

    const registerPagePath = path.join(__dirname, '..', 'public','register-session.html',);
    res.sendFile(registerPagePath);
});

router.post('/', async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            role: req.body.role
        }
        const savedUser = await userRepo.saveUser(user);
        res.status(200).json(savedUser);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Devuelve una respuesta de error al cliente.
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;