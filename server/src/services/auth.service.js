import { prisma } from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import { signJwt } from './jwt.service.js';

export async function register(req, res, next) {
	try {
		const { email, password, name } = req.body;
		if (!email || !password || !name) return res.status(400).json({ message: 'Missing fields' });
		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) return res.status(409).json({ message: 'Email already in use' });
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({ data: { email, passwordHash, name } });
		const token = signJwt({ userId: user.id, email: user.email });
		res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
	} catch (err) {
		next(err);
	}
}

export async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });
		const match = await bcrypt.compare(password, user.passwordHash);
		if (!match) return res.status(401).json({ message: 'Invalid credentials' });
		const token = signJwt({ userId: user.id, email: user.email });
		res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
	} catch (err) {
		next(err);
	}
}

export async function me(req, res, next) {
	try {
		const user = await prisma.user.findUnique({ where: { id: req.user.userId }, include: { profile: true } });
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.json({ user: { id: user.id, email: user.email, name: user.name, profile: user.profile } });
	} catch (err) {
		next(err);
	}
}
