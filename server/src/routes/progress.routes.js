import { Router } from 'express';
import { authMiddleware } from '../services/jwt.service.js';
import { listProgress, createProgress, updateProgress, deleteProgress } from '../services/progress.service.js';

const router = Router();

router.get('/', authMiddleware, listProgress);
router.post('/', authMiddleware, createProgress);
router.put('/:id', authMiddleware, updateProgress);
router.delete('/:id', authMiddleware, deleteProgress);

export default router;
