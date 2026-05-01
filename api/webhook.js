const { formatJobPost } = require('../src/formatter')
async function sendMessage(chatID, text) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatID, text: text })
    })
}
module.exports = async function handler(req, res) {
    const secretToken = req.headers['x-telegram-bot-api-secret-token']
    if (secretToken !== process.env.TELEGRAM_SECRET_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    try {
        if (!req.body.message) {
            return res.status(200).json({ ok: true })
        }
        const message = req.body.message.text
        const chatID = req.body.message.chat.id

        if (!message) {
            await sendMessage(chatID, 'Please send me a valid job description or a link to a job posting.')
            return res.status(200).json({ ok: true })
        } else if (message.startsWith('/start')) {
            await sendMessage(chatID, 'Hello! I am the Techrun Job Post bot. please send me a job description or a link to a job posting.')
            return res.status(200).json({ ok: true })
        } else if (message.startsWith('/help')) {
            await sendMessage(chatID, 'You only need to send me the job description or a link for the job posting. I will format it for you.')
            return res.status(200).json({ ok: true })
        } else if (message.length < 50) {
            await sendMessage(chatID, 'Please send me a valid job description or a link to a job posting.')
            return res.status(200).json({ ok: true })
        } else {
            const formattedJobpost = await formatJobPost(message)
            await sendMessage(chatID, formattedJobpost)
            return res.status(200).json({ ok: true })
        }
    } catch (error) {
        console.error('Webhook error:', error.message)
        // return 200 so Telegram doesn't keep retrying the request
        return res.status(200).json({ ok: true })
    }
}