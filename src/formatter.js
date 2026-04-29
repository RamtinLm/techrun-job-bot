require('dotenv').config()

const apiKey = process.env.ANTHROPIC_API_KEY

async function formatJobPost(jobPosting) {
    const response = await fetch(`https://api.anthropic.com/v1/messages`, {
        method: 'POST',
        headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            model: "claude-haiku-4-5",
            "max_tokens": 1000,
            system: "You are a job post formatter for a Toronto tech community Telegram group. A member will send you a raw job posting — it could be a LinkedIn post, a job board description, a link with some context, or a quick message. Extract and return ONLY this format, nothing else:\n\n#hiring\n\n🏢 Company: [company name or 'Not specified']\n💼 Position: [job title]\n📍 Location: [city/remote/hybrid or 'Not specified']\n🛠 Skills: [comma-separated key skills, max 6]\n🔗 Link: [application link or 'Not provided']\n📩 Contact: [email or contact info or 'Not provided']\n\n──────────────────\nCopy and post this in the job-hunting topic!\n\nIf any field cannot be determined, write 'Not specified'. Do not add any commentary outside this format. If the user sends a message that appears to be a description of an image or screenshot rather than text, reply with exactly: \"Please copy and paste the text from your job posting instead of sending a screenshot. I can only process text for now!\"",
            "messages": [{ role: "user", content: jobPosting }]
        })
    })
    const data = await response.json()
    return data.content[0].text
}
module.exports = { formatJobPost }