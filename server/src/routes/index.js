import { Router } from 'express';
import authRoutes from './auth.routes.js';
import profileRoutes from './profile.routes.js';
import progressRoutes from './progress.routes.js';
import aiRoutes from './ai.routes.js';
import chatRoutes from './chat.routes.js';
import pdfRoutes from './pdf.routes.js';

const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'AI Career Coach API' });
});

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/progress', progressRoutes);
router.use('/ai', aiRoutes);
router.use('/chat', chatRoutes);
router.use('/pdf', pdfRoutes);

export default router;
