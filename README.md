# Techrun Job Bot 🤖

A Telegram bot for the Techrun Toronto community. Send it a raw job posting and it returns a clean, formatted version ready to post in the job-hunting topic.

## How it works

1. DM the bot a raw job post (link, paragraph, anything)
2. Bot formats it using Claude Haiku API
3. Copy the output and paste it into the group topic

## Tech Stack

- Node.js
- Vercel (serverless)
- Telegram Bot API
- Anthropic Claude Haiku API

## Local Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your keys
4. Run locally with ngrok (guide coming soon)

## Environment Variables

TELEGRAM_BOT_TOKEN=
ANTHROPIC_API_KEY=

## Contributing

This is an open-source community project. Issues and PRs are welcome!