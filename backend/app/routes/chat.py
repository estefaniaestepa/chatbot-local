from fastapi import APIRouter, Depends, HTTPException, Header
from app.services.auth_service import verify_token
from app.services.chat_service import generate_chat_response, get_chat_history, clear_chat_history
from pydantic import BaseModel

router = APIRouter()

# Modelo para el mensaje del usuario
class MessageRequest(BaseModel):
    content: str

# Enviar mensaje
@router.post("/send-message")
async def send_message(request: MessageRequest, Authorization: str = Header(None)):
    if Authorization is None or not Authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token missing or invalid format")

    token = Authorization.split(" ")[1]
    user_id = verify_token(token)

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    response = await generate_chat_response(user_id, request.content)
    return {"message": response}

# Obtener historial
@router.get("/history")
async def chat_history(Authorization: str = Header(None)):
    if Authorization is None or not Authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token missing or invalid format")

    token = Authorization.split(" ")[1]
    user_id = verify_token(token)

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    history = await get_chat_history(user_id)
    return history

# Borrar historial
@router.delete("/clear-history")
async def clear_history(Authorization: str = Header(None)):
    if Authorization is None or not Authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token missing or invalid format")

    token = Authorization.split(" ")[1]
    user_id = verify_token(token)

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    result = await clear_chat_history(user_id)
    return result