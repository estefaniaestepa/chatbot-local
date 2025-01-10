from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.services.auth_service import create_token
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI

router = APIRouter()

# Conexión con MongoDB
client = AsyncIOMotorClient(MONGO_URI)
db = client.mindfulness_chatbot


# ✅ Modelo para Registro
class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


# ✅ Modelo para Login
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ✅ Registro de Usuario
@router.post("/register")
async def register(user: RegisterRequest):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = {
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "is_active": True
    }

    await db.users.insert_one(new_user)
    return {"message": "User registered successfully"}


# ✅ Inicio de Sesión
@router.post("/login")
async def login(request: LoginRequest):
    db_user = await db.users.find_one({"email": request.email})
    if not db_user or db_user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(str(db_user["_id"]))
    return {"access_token": token}