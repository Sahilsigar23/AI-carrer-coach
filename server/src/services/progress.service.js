import { prisma } from '../config/prisma.js';

export async function listProgress(req, res, next) {
	try {
		const items = await prisma.progressItem.findMany({ where: { userId: req.user.userId }, orderBy: { createdAt: 'desc' } });
		res.json({ items });
	} catch (err) {
		next(err);
	}
}

export async function createProgress(req, res, next) {
	try {
		const { title, description } = req.body;
		const item = await prisma.progressItem.create({ data: { userId: req.user.userId, title, description: description || null } });
		res.status(201).json({ item });
	} catch (err) {
		next(err);
	}
}

export async function updateProgress(req, res, next) {
	try {
		const { id } = req.params;
		const { title, description, status } = req.body;
		const item = await prisma.progressItem.update({
			where: { id },
			data: { title, description, status, completedAt: status === 'completed' ? new Date() : null },
		});
		res.json({ item });
	} catch (err) {
		next(err);
	}
}

export async function deleteProgress(req, res, next) {
	try {
		const { id } = req.params;
		await prisma.progressItem.delete({ where: { id } });
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
