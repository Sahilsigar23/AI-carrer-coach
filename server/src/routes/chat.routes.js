import { Router } from 'express';
import { authMiddleware } from '../services/jwt.service.js';
import { chat } from '../services/chat.service.js';

const router = Router();

router.post('/', authMiddleware, chat);

export default router;
