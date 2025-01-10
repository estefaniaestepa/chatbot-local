from fastapi import APIRouter, Depends, HTTPException, Header
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from app.services.auth_service import verify_token
from app.models.user import UserUpdate
from app.config import MONGO_URI

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# Conexión con MongoDB
client = AsyncIOMotorClient(MONGO_URI)
db = client.mindfulness_chatbot


# ✅ Obtener perfil del usuario
@router.get("/profile")
async def get_user_profile(Authorization: str = Header(None)):
    if Authorization is None or not Authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token missing or invalid format")

    token = Authorization.split(" ")[1]
    user_id = verify_token(token)

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await db.users.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


# 🔄 Actualizar datos del usuario
@router.put("/update-profile")
async def update_user_profile(user: UserUpdate, Authorization: str = Header(None)):
    if Authorization is None or not Authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token missing or invalid format")

    token = Authorization.split(" ")[1]
    user_id = verify_token(token)

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    updated_data = {k: v for k, v in user.model_dump().items() if v is not None}
    if not updated_data:
        raise HTTPException(status_code=400, detail="No valid fields provided for update")

    if "password" in updated_data:
        raise HTTPException(status_code=400, detail="Password update not allowed here")

    result = await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": updated_data})

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="No changes made")

    return {"message": "User profile updated successfully"}


# ❌ Eliminar cuenta de usuario
@router.delete("/delete-account")
async def delete_user_account(Authorization: str = Header(None)):
    if Authorization is None or not Authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token missing or invalid format")

    token = Authorization.split(" ")[1]
    user_id = verify_token(token)

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    result = await db.users.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User account deleted successfully"}