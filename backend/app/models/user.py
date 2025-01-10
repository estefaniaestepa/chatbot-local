from pydantic import BaseModel, EmailStr
from typing import Optional

# ✅ Modelo para actualizar el perfil
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None