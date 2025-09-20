import { Router } from 'express';
import { register, login, me } from '../services/auth.service.js';
import { authMiddleware } from '../services/jwt.service.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);

export default router;
