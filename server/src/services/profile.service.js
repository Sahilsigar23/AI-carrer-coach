import { prisma } from '../config/prisma.js';

export async function getProfile(req, res, next) {
	try {
		const profile = await prisma.profile.findUnique({ where: { userId: req.user.userId } });
		res.json({ profile: profile || null });
	} catch (err) {
		next(err);
	}
}

export async function upsertProfile(req, res, next) {
	try {
		const { academicInfo, skills = [], interests = [], languages = [] } = req.body;
		const data = { academicInfo: academicInfo || null, skills, interests, languages };
		const profile = await prisma.profile.upsert({
			where: { userId: req.user.userId },
			update: data,
			create: { userId: req.user.userId, ...data },
		});
		res.status(201).json({ profile });
	} catch (err) {
		next(err);
	}
}
