

from dotenv import load_dotenv
import os
from livekit import agents, rtc
from livekit.agents import (
    AgentServer,
    AgentSession,
    Agent,
    room_io,
)
from livekit.plugins import noise_cancellation, silero, langchain, cartesia
from livekit.plugins.turn_detector.multilingual import MultilingualModel
import json

from graph import create_workflow

load_dotenv(".env.local")

server = AgentServer()


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""
            You are a professional interviewer conducting a job interview.
            The LangGraph workflow will drive the conversation flow.
            Speak clearly, professionally, and conversationally.
            """
        )


@server.rtc_session()
async def my_agent(ctx: agents.JobContext):

    # 1️⃣ Create LangGraph workflow
    interview_workflow = create_workflow()
    lg_llm = langchain.LLMAdapter(graph=interview_workflow)

 # 2. Use Cartesia TTS with Viseme support
    tts = cartesia.TTS(model="sonic-english", voice="e07c00bc-4134-4eae-9ea4-1a55fb45746b")
#    This is the "Data Channel" bridge for your 3D Avatar
    @tts.on("viseme_received")
    def on_viseme(v):
        # We send index and value directly so the JS side can read them easily
        viseme_data = json.dumps({
            "type": "viseme", 
            "index": v.index, 
            "value": v.value
        })
        ctx.room.local_participant.publish_data(
            viseme_data,
            topic="lip-sync"
        )


    session = AgentSession(
        stt="deepgram/nova-3:multi",
        llm=lg_llm,
        tts=tts,
        vad=silero.VAD.load(),
    )


    await session.start(room=ctx.room, agent=Assistant())


if __name__ == "__main__":
    agents.cli.run_app(server)
