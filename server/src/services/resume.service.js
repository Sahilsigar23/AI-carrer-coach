import multer from 'multer';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';
import { GoogleGenerativeAI } from '@google/generative-ai';

const hasApiKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
const genAI = hasApiKey ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '') : null;

const upload = multer({
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		if (/(pdf|msword|officedocument)/i.test(file.mimetype) || /\.(pdf|doc|docx)$/i.test(file.originalname)) cb(null, true);
		else cb(new Error('Unsupported file type'));
	},
	storage: multer.memoryStorage(),
}).single('resume');

function parseGeminiJson(rawText = '') {
	let text = String(rawText || '').trim();
	const fenced = text.match(/```(?:json)?\n([\s\S]*?)\n```/i);
	if (fenced) text = fenced[1].trim();
	if (!(text.startsWith('{') || text.startsWith('['))) {
		const s = text.indexOf('{');
		const e = text.lastIndexOf('}');
		if (s !== -1 && e !== -1 && e > s) text = text.slice(s, e + 1);
	}
	text = text.replace(/,\s*([}\]])/g, '$1');
	return JSON.parse(text);
}

async function extractText(buffer, mimetype, filename) {
	if (/pdf$/i.test(filename) || /pdf/i.test(mimetype)) {
		const data = await pdfParse(buffer);
		return data.text || '';
	}
	// docx via mammoth
	const { value } = await mammoth.extractRawText({ buffer });
	return value || '';
}

export function analyzeResume(req, res, next) {
	upload(req, res, async (err) => {
		try {
			if (err) return res.status(400).json({ message: err.message || 'Upload error' });
			if (!hasApiKey || !genAI) return res.status(503).json({ message: 'Gemini API is not configured.' });
			if (!req.file) return res.status(400).json({ message: 'No file provided' });

			const text = await extractText(req.file.buffer, req.file.mimetype, req.file.originalname);
			if (!text || text.trim().length < 50) return res.status(400).json({ message: 'Could not read resume text. Please upload a clearer PDF/DOCX.' });

			const prompt = `Analyze the following resume text and return JSON with:
{
  "overallScore": number(0-100),
  "atsCompatibility": number(0-100),
  "strengths": string[],
  "improvements": string[],
  "missingSkills": string[],
  "suggestions": string[]
}
Only return valid JSON. Resume text:\n\n${text}`;

			const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
			const result = await model.generateContent(prompt);
			const raw = result.response.text();
			const data = parseGeminiJson(raw);
			return res.json(data);
		} catch (e) {
			return res.status(503).json({ message: 'Failed to analyze resume with Gemini.' });
		}
	});
}
