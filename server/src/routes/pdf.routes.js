import { Router } from 'express';
import { authMiddleware } from '../services/jwt.service.js';
import { generateRoadmapPdf } from '../services/pdf.service.js';

const router = Router();

router.post('/roadmap', authMiddleware, generateRoadmapPdf);

export default router;
