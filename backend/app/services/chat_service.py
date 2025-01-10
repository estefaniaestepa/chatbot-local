import httpx
from app.config import MONGO_URI
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import json

client = AsyncIOMotorClient(MONGO_URI)
db = client.mindfulness_chatbot

API_URL = "http://localhost:11434/api/chat"

async def clear_chat_history(user_id: str):
    """
    Elimina todo el historial de chat de un usuario específico.
    """
    result = await db.messages.delete_many({"user_id": user_id})
    return {"message": f"{result.deleted_count} messages deleted from history"}

async def save_message(user_id: str, content: str, role: str):
    message = {
        "user_id": user_id,
        "content": content,
        "role": role,
        "timestamp": datetime.utcnow()
    }
    await db.messages.insert_one(message)

async def get_chat_history(user_id: str, limit: int = 20):
    history = await db.messages.find({"user_id": user_id}).sort("timestamp", -1).limit(limit).to_list(length=limit)
    return [
        {
            "content": msg["content"],
            "role": msg["role"],
            "timestamp": msg["timestamp"]
        }
        for msg in history
    ]

async def generate_chat_response(user_id: str, user_message: str):
    try:
        # Guardar el mensaje del usuario
        await save_message(user_id, user_message, "user")

        # Obtener historial para el contexto
        history = await get_chat_history(user_id)

        # Formatear historial para la API del modelo
        messages = [{"role": msg["role"], "content": msg["content"]} for msg in reversed(history)]
        messages.append({"role": "user", "content": user_message})

        # Llamada a la API del modelo (stream)
        async with httpx.AsyncClient() as client:
            async with client.stream(
                "POST",
                API_URL,
                json={
                    "model": "llama3.2",
                    "messages": messages,
                    "stream": True  # Activamos el stream
                },
                timeout=60  # Mayor tiempo de espera
            ) as response:
                if response.status_code != 200:
                    raise Exception(f"Failed to get response from chatbot model API: {response.status_code}")
                
                # Leer y consolidar fragmentos del stream
                response_text = ""
                async for chunk in response.aiter_text():
                    if chunk.strip():
                        try:
                            json_chunk = json.loads(chunk)
                            content = json_chunk.get("message", {}).get("content", "")
                            response_text += content
                        except json.JSONDecodeError:
                            continue

        # Guardar la respuesta consolidada
        if response_text:
            await save_message(user_id, response_text, "assistant")
            return response_text
        else:
            raise Exception("Empty response from chatbot model API")

    except httpx.TimeoutException:
        print("Error: Timeout connecting to chatbot model API")
        return "Sorry, the chatbot service took too long to respond."
    except Exception as e:
        print(f"Error generating chatbot response: {e}")
        return "Sorry, I encountered an issue while processing your request."
