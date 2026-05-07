require('dotenv').config()

const apiKey = process.env.OPENROUTER_API_KEY

async function formatJobPost(jobPosting) {
    const response = await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            model: "openrouter/free",
            "max_tokens": 1000,
            messages: [
                { role: "system", content: "You are a job post formatter for a Toronto tech community Telegram group. A member will send you a raw job posting — it could be a LinkedIn post, a job board description, a link with some context, or a quick message forwarded from someone else. Extract and return ONLY this format, nothing else:#hiring\n\n🏢 Company: [company name or 'Not specified']\n💼 Position: [job title]\n📍 Location: [city/remote/hybrid or 'Not specified']\n🛠 Skills: [comma-separated key skills, max 6]\n🔗 Link: [application link or 'Not provided']\n📩 Contact: [email or contact info or maybe a website link or 'Not provided']\n If any field cannot be determined, write 'Not specified'. Do not add any commentary outside this format. Remember that You support English and Farsi/Persian job postings only. If the input appears to be in another language, reply with exactly: \"Sorry, I only support English and Farsi job postings for now!\". Always return the formatted output in English regardless of input language." },
                { role: "user", content: jobPosting }
            ]
        })
    })
    const data = await response.json()
    if (data.error) {
        throw new Error(`API error: ${data.error.message}`)
    }
    return data.choices[0].message.content
}
module.exports = { formatJobPost }