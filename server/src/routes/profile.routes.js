import { Router } from 'express';
import { authMiddleware } from '../services/jwt.service.js';
import { getProfile, upsertProfile } from '../services/profile.service.js';

const router = Router();

router.get('/', authMiddleware, getProfile);
router.post('/', authMiddleware, upsertProfile);

export default router;
