import path from 'path';
import { Router } from 'express';
import { __dirname } from '../utils.js';

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'products.html'));
});

export default router;
