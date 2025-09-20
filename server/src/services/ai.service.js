import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '../config/prisma.js';

const hasApiKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
const genAI = hasApiKey ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '') : null;

function getModel(name = 'gemini-1.5-flash') {
	if (!genAI) return null;
	return genAI.getGenerativeModel({ model: name });
}

// Parse Gemini text into JSON safely (handles ```json fences, extra prose, trailing commas)
function parseGeminiJson(rawText = '') {
    if (!rawText) throw new Error('Empty response');
    let text = String(rawText).trim();
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

async function generateJsonFromGemini(prompt, options = {}) {
    const { modelName = 'gemini-1.5-flash', retries = 1 } = options;
    const model = getModel(modelName);
    if (!model) throw new Error('Model unavailable');
    let lastErr;
    for (let i = 0; i <= retries; i++) {
        try {
            const result = await model.generateContent(`${prompt}\n\nReturn only valid JSON with no markdown fences or extra text.`);
            const text = result.response.text();
            return parseGeminiJson(text);
        } catch (err) {
            lastErr = err;
            if (i < retries) continue;
        }
    }
    throw lastErr || new Error('Failed to get JSON from Gemini');
}

function fallbackRoadmap(targetRole = 'AI Engineer', currentLevel = 'beginner') {
    const role = String(targetRole || '').toLowerCase();

    const commons = {
        foundation: [
            { title: 'CS50 Intro to Computer Science', url: 'https://cs50.harvard.edu/x/' },
            { title: 'Khan Academy - Math Refresher', url: 'https://www.khanacademy.org/' },
        ],
        interview: [
            { title: 'Project Ideas', url: 'https://github.com/florinpop17/app-ideas' },
            { title: 'Interview Prep', url: 'https://www.interviewbit.com/' },
        ],
    };

    const byRole = {
        'ai engineer': [
            { title: 'Python for ML – FreeCodeCamp', url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/' },
            { title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning' },
        ],
        'data scientist': [
            { title: 'Data Science Roadmap – Kaggle', url: 'https://www.kaggle.com/learn' },
            { title: 'Statistics Refresher', url: 'https://seeing-theory.brown.edu/' },
        ],
        'data analyst': [
            { title: 'Google Data Analytics Certificate', url: 'https://grow.google/certificates/data-analytics/' },
            { title: 'SQL – Mode Analytics', url: 'https://mode.com/sql-tutorial/' },
        ],
        'frontend developer': [
            { title: 'React Docs – Learn', url: 'https://react.dev/learn' },
            { title: 'TailwindCSS Tutorial', url: 'https://tailwindcss.com/docs/installation' },
        ],
        'backend developer': [
            { title: 'Node.js/Express Guide', url: 'https://expressjs.com/en/starter/installing.html' },
            { title: 'SQLBolt (SQL Basics)', url: 'https://sqlbolt.com/' },
        ],
        'devops engineer': [
            { title: 'Docker Getting Started', url: 'https://docs.docker.com/get-started/' },
            { title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' },
        ],
        'ux designer': [
            { title: 'Google UX Design Certificate', url: 'https://grow.google/certificates/ux-design/' },
            { title: 'NNGroup UX Articles', url: 'https://www.nngroup.com/articles/' },
        ],
    };

    // choose closest match
    let coreResources = byRole['ai engineer'];
    for (const key of Object.keys(byRole)) {
        if (role.includes(key)) { coreResources = byRole[key]; break; }
    }

    return {
        milestones: [
            {
                title: `Foundation for ${targetRole}`,
                description: 'Get started with core fundamentals using free resources',
                resources: commons.foundation,
            },
            {
                title: `Core ${targetRole} Skills`,
                description: 'Hands-on skills and a mini project',
                resources: coreResources,
            },
            {
                title: 'Portfolio + Interview Prep',
                description: 'Build 1-2 projects and prepare for interviews',
                resources: commons.interview,
            },
        ],
    };
}

function fallbackRecommendations() {
	return { careers: [
		{ title: 'AI Engineer', description: 'Build and deploy ML systems at scale', futureScope: 'Very High' },
		{ title: 'Data Analyst', description: 'Analyze data for insights and reporting', futureScope: 'High' },
		{ title: 'Frontend Developer', description: 'Create modern web experiences', futureScope: 'High' },
	] };
}

function fallbackSkillGap(currentSkills = []) {
	return { have: currentSkills, need: ['Communication', 'SQL', 'Git'], recommendations: ['Complete a mini project', 'Take a certificate course'] };
}

export async function recommendCareers(req, res, next) {
	try {
		const { profileOverride } = req.body;
		const profile = profileOverride || (await prisma.profile.findUnique({ where: { userId: req.user.userId } }));
		if (!hasApiKey) {
			return res.status(503).json({ message: 'Gemini API is not configured. Please set GEMINI_API_KEY.' });
		}
		const prompt = `Given this student profile (skills: ${profile?.skills || []}, interests: ${profile?.interests || []}, academic: ${profile?.academicInfo || ''}), suggest 2-3 Indian-market relevant career paths with short descriptions and future scope. Reply as JSON with keys careers: [{title, description, futureScope}]`;
		let data;
		try { data = await generateJsonFromGemini(prompt, { retries: 1 }); }
		catch { return res.status(503).json({ message: 'Gemini returned an invalid response.' }); }
		res.json({ recommendations: data });
	} catch (err) {
		return res.status(503).json({ message: 'Failed to fetch recommendations from Gemini.' });
	}
}

export async function analyzeSkillGap(req, res, next) {
	try {
		const { targetRole, currentSkills = [] } = req.body;
		if (!hasApiKey) {
			return res.status(503).json({ message: 'Gemini API is not configured. Please set GEMINI_API_KEY.' });
		}
		const prompt = `For role ${targetRole}, compare current skills ${currentSkills.join(', ')} vs typical industry-required skills in India. Return JSON with keys: have: string[], need: string[], recommendations: string[]`;
		let data;
		try { data = await generateJsonFromGemini(prompt, { retries: 1 }); }
		catch { return res.status(503).json({ message: 'Gemini returned an invalid response.' }); }
		res.json({ skillGap: data });
	} catch (err) {
		return res.status(503).json({ message: 'Failed to fetch skill gap from Gemini.' });
	}
}

export async function generateRoadmap(req, res, next) {
	try {
		const targetRole = req.body?.targetRole || req.body?.careerPath;
		const { currentLevel = 'beginner' } = req.body;
        if (!hasApiKey) {
            return res.status(503).json({ message: 'Gemini API is not configured. Please set GEMINI_API_KEY to generate a live roadmap.' });
        }
    const prompt = `You are an expert career mentor. Create a milestone-based 12-week learning roadmap for the role: "${targetRole}" for a ${currentLevel} learner in India.

Each milestone must include 3–6 concrete learning resources with real URLs (mix of free and well-known paid courses where useful). Prefer reputable sources like Coursera, edX, CS50, FreeCodeCamp, Khan Academy, Google Career Certificates, AWS, Microsoft Learn, YouTube playlists from official channels, documentation, and high-quality blogs.

Return strictly valid JSON:
{
  "milestones": [
    {
      "title": string,
      "description": string,
      "resources": [ { "title": string, "url": string } ],
      "certificate"?: string
    }
  ]
}`;
		let data;
		try { data = await generateJsonFromGemini(prompt, { retries: 1 }); }
		catch { return res.status(503).json({ message: 'Gemini returned an invalid response.' }); }
        res.json({ roadmap: data });
	} catch (err) {
		res.status(503).json({ message: 'Failed to fetch roadmap from Gemini. Ensure the Generative Language API is enabled for your project and try again.' });
	}
}

export async function skillGapWithRoadmap(req, res, next) {
	try {
		const targetRole = req.body?.targetRole || req.body?.careerPath;
		const { currentSkills = [], currentLevel = 'beginner' } = req.body;
        if (!hasApiKey) {
            return res.status(503).json({ message: 'Gemini API is not configured. Please set GEMINI_API_KEY to generate a live roadmap.' });
        }
    const prompt = `You are an expert career mentor. Given target role "${targetRole}" and current skills [${currentSkills.join(', ')}] for a learner in India, provide both a skills gap and a learning roadmap.

Requirements:
- Identify have vs need skills realistically for the Indian market.
- For the roadmap, provide 3–6 concrete resources with real URLs per milestone (free when possible) from reputable sources: Coursera, edX, CS50, FreeCodeCamp, Khan Academy, Google Career Certificates, official docs, AWS/Azure/GCP, Microsoft Learn, and high-quality YouTube playlists.

Return strictly valid JSON:
{
  "skillGap": {
    "have": string[],
    "need": string[],
    "recommendations": string[]
  },
  "roadmap": {
    "milestones": [
      {
        "title": string,
        "description": string,
        "resources": [ { "title": string, "url": string } ],
        "certificate"?: string
      }
    ]
  }
}`;
		let data;
		try { data = await generateJsonFromGemini(prompt, { retries: 1 }); }
		catch { return res.status(503).json({ message: 'Gemini returned an invalid response. Please retry.' }); }
        res.json(data);
	} catch (err) {
        res.status(503).json({ message: 'Failed to fetch from Gemini. Ensure the API is enabled and the key is valid.' });
	}
}
