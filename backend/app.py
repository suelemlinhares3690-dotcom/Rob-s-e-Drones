import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from google.adk.agents import LlmAgent
from google.adk.runners import InMemoryRunner
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Robôs & Drones API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the specialized robotics agent
robotics_agent = LlmAgent(
    name="RoboHelper",
    model="gemini-3.1-flash-lite-preview",
    instruction=(
        "Você é um especialista em robótica e drones. Seu nome é 'Robô de Robôs & Drones'. "
        "Sua única função é responder dúvidas sobre esses temas. "
        "Se o usuário perguntar algo fora deste escopo (como receitas, fofocas, outros tópicos gerais), "
        "responda educadamente: 'Desculpe, eu só fui programado para falar sobre robótica e drones. "
        "Que tal conversarmos sobre como funcionam os sensores de um robô?'"
    )
)

# Setup the runner
runner = InMemoryRunner(agent=robotics_agent, app_name="RobosDrones")

# Store session ID after creation
_session_id: str | None = None


async def get_or_create_session() -> str:
    global _session_id
    if _session_id is None:
        session = await runner.session_service.create_session(
            app_name="RobosDrones",
            user_id="default_user",
        )
        _session_id = session.id
    return _session_id


class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        session_id = await get_or_create_session()
        response_text = ""
        async for event in runner.run_async(
            session_id=session_id,
            user_id="default_user",
            new_message=types.Content(
                role="user",
                parts=[types.Part.from_text(text=request.message)],
            ),
        ):
            if event.is_final_response() and event.content and event.content.parts:
                for part in event.content.parts:
                    if part.text and not part.thought:
                        response_text += part.text

        return {"response": response_text}
    except Exception as e:
        print(f"Error in ADK execution: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Robótica API with Google ADK is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
