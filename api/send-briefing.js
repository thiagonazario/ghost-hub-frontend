// api/send-briefing.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // O Webhook fica escondido aqui, numa variável de ambiente da Vercel
    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) 
        });

        if (response.ok) {
            return res.status(200).json({ status: 'success' });
        } else {
            throw new Error('Discord rejection');
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}