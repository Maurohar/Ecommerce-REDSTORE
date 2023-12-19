import { Router } from 'express';
import UserRepo from '../db/UserRepo.js';

const router = Router();
const userRepo = new UserRepo();

router.get('/', (req, res) => {
  // Renderiza la página de registro (si es necesario)
  res.sendFile(path.join(__dirname, '..', 'public', 'log-in.html'));
});

router.post('/', async (req, res) => {
  try {
    // Aquí deberías tener el código para registrar al usuario.
    // Asegúrate de que req.body contenga la información necesaria.

    // Ejemplo:
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        
      // Otros campos del usuario...
    };

    const savedUser = await userRepo.saveUser(user);

    // Puedes devolver una respuesta JSON con el usuario guardado.
    res.status(200).json(savedUser);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    // Devuelve una respuesta de error al cliente.
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;