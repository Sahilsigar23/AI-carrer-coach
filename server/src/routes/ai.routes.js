import { Router } from 'express';
import { authMiddleware } from '../services/jwt.service.js';
import { recommendCareers, analyzeSkillGap, generateRoadmap, skillGapWithRoadmap } from '../services/ai.service.js';
import { analyzeResume } from '../services/resume.service.js';

const router = Router();

router.post('/recommendations', authMiddleware, recommendCareers);
router.post('/skill-gap', authMiddleware, analyzeSkillGap);
router.post('/roadmap', authMiddleware, generateRoadmap);
router.post('/skill-gap-roadmap', authMiddleware, skillGapWithRoadmap);
router.post('/resume-analyze', authMiddleware, analyzeResume);

export default router;
