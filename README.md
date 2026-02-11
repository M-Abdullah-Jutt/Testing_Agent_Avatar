# Agentic AI Interviewer with Live Avatar


## Overview

This project is a **real-time AI-powered interview agent** built for educational and professional purposes.  
It combines **voice-based AI interaction**, **retrieval-augmented generation (RAG)** for contextual answers, and a **LiveAvatar** to make the AI **visually interactive**.  

The system allows a user to:
- Speak naturally to the AI agent
- Receive responses in real-time via TTS
- See a visual avatar that lip-syncs to the AI’s voice
- Conduct structured interviews or Q&A sessions using custom workflows

This prototype is built on **LiveKit**, **LangChain**, **Deepgram**, **Cartesia TTS**, and **LiveAvatar**.

---

## Features

- 🎙 **Speech-to-Text (STT)** using Deepgram
- 🤖 **AI Interview Logic** using LangChain + custom workflows
- 🗣 **Text-to-Speech (TTS)** using Cartesia
- 👤 **Live Avatar** displaying AI responses in real-time
- 🧩 **Room management** with LiveKit for multi-user sessions
- 📝 **RAG-ready backend** for retrieving company or domain-specific information

---

## Architecture

Frontend (Browser)
↕ WebRTC
LiveKit Room
↕
LiveAvatar Service
↕
Python Agent Server

STT: Deepgram

LLM: LangChain

TTS: Cartesia

Turn detection: Silero + Multilingual Model

Workflow-driven conversation (LangGraph)


---

## Requirements

- Python 3.12+
- [LiveKit Cloud Project](https://livekit.io)
- [LiveAvatar Account](https://liveavatar.ai)
- Deepgram API Key
- Cartesia API Key

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/M-Abdullah-Jutt/Live-Interviewer-Agent
cd agentic-ai-interviewer/livekit-voice-agent

---

2. Install dependencies:
uv add livekit-agents livekit-plugins-liveavatar langchain chromadb
uv add deepgram-sdk cartesia-sdk silero

---

Create .env.local:
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
DEEPGRAM_API_KEY=your_deepgram_key
CARTESIA_API_KEY=your_cartesia_key
LIVEAVATAR_ID=your_avatar_id

---

## Usage

Run the agent server:
uv run agent.py dev