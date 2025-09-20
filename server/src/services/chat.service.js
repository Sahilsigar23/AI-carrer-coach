import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '../config/prisma.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function chat(req, res, next) {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: 'Message is required' });

        // Save user message
        await prisma.chatMessage.create({ data: { userId: req.user.userId, role: 'user', content: message } });

        // Pull a short conversation window for context (last 8 messages)
        let historyText = '';
        try {
            const history = await prisma.chatMessage.findMany({
                where: { userId: req.user.userId },
                orderBy: { createdAt: 'desc' },
                take: 8,
            });
            history.reverse().forEach(m => {
                historyText += `\n${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`;
            });
        } catch {}

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const systemPrompt = `You are an empathetic AI Career Mentor for Indian students and early-career professionals.
Rules:
- Answer briefly and concretely (max 6 sentences). Use bullets for lists.
- Ask EXACTLY ONE follow-up question at the end, starting with 'Follow-up:'
- If the user asks to stop questions, don't ask one.
- Support English and Indian languages; reply in the user's language if clear, else English.
- If the user asks for a plan/roadmap, give 4-7 concise steps and relevant, reputable links.
- Avoid asking multiple questions at once. Keep the chat conversational and incremental.`;

        const finalPrompt = `${systemPrompt}\n\nConversation so far:${historyText}\n\nUser: ${message}\nAssistant:`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
            generationConfig: { maxOutputTokens: 400, temperature: 0.7, topP: 0.9 },
        });

        const reply = result.response.text();

        // Save assistant reply
        await prisma.chatMessage.create({ data: { userId: req.user.userId, role: 'assistant', content: reply } });
        res.json({ reply });
    } catch (err) { next(err); }
}
