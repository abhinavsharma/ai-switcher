# AI Chat Replicator

A Chrome extension that lets you replicate conversations between different AI chat applications.

## Supported AI Platforms

- ChatGPT (https://chatgpt.com/)
- Google Gemini (https://gemini.google.com/)
- Anthropic Claude (https://claude.ai/)
- xAI Grok (https://grok.com/)

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked" and select this folder
4. Visit any supported AI chat app and you'll see buttons for the other platforms

## Features

- Shows floating action buttons for other AI platforms when you're using one of the supported platforms
- Each button allows you to transfer your current conversation to another AI platform
- Automatically detects which AI platform you're currently using
- Uses Tailwind CSS for styling

## How It Works

When you're using one of the supported AI chat platforms, the extension displays floating buttons for all the other AI platforms. Clicking a button will eventually transfer your conversation to that platform.

## Permissions

This extension only activates on the supported AI chat platforms.