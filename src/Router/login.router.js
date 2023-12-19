import path from 'path';
import { Router } from 'express';
import { __dirname } from '../utils.js';
import userloginModel from '../models/schema.users.js';
import bcrypt from 'bcrypt';
import flash from 'connect-flash';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'log-in.html'));
});


export default router;

