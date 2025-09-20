import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

if (process.env.NODE_ENV !== 'production') {
	if (!process.env.DATABASE_URL) {
		console.warn('DATABASE_URL is not set. Please configure server/.env');
	}
}

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
