import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function signJwt(payload) {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token) {
	return jwt.verify(token, JWT_SECRET);
}

export function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
	if (!token) return res.status(401).json({ message: 'Unauthorized' });
	try {
		const decoded = verifyJwt(token);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid token' });
	}
}
