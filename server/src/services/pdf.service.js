import PDFDocument from 'pdfkit';
import { v4 as uuid } from 'uuid';

export async function generateRoadmapPdf(req, res, next) {
	try {
		const { roadmap } = req.body; // { milestones: [{title, description, resources: [{title, url}], certificate?}] }
		if (!roadmap) return res.status(400).json({ message: 'roadmap is required' });
		const doc = new PDFDocument({ size: 'A4', margin: 50 });
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `attachment; filename=roadmap-${uuid()}.pdf`);
		doc.pipe(res);

		doc.fontSize(20).text('Personalized Learning Roadmap', { align: 'center' });
		doc.moveDown();
		(roadmap.milestones || []).forEach((m, idx) => {
			doc.fontSize(14).text(`Step ${idx + 1}: ${m.title}`);
			doc.fontSize(12).text(m.description || '');
			if (m.resources && m.resources.length) {
				doc.moveDown(0.3);
				doc.text('Resources:');
				m.resources.forEach((r) => doc.text(`- ${r.title}: ${r.url}`));
			}
			if (m.certificate) {
				doc.moveDown(0.3);
				doc.text(`Certificate: ${m.certificate}`);
			}
			doc.moveDown();
		});

		doc.end();
	} catch (err) {
		next(err);
	}
}
