import jwt
from datetime import datetime, timedelta
from app.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRATION


# ✅ Generar Token JWT
def create_token(user_id: str):
    """
    Genera un token JWT para un usuario autenticado.
    
    Parámetros:
        - user_id (str): El ID del usuario autenticado.
    
    Retorna:
        - str: Token JWT.
    """
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(seconds=JWT_EXPIRATION),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


# ✅ Verificar Token JWT
def verify_token(token: str):
    """
    Verifica la validez de un token JWT.
    
    Parámetros:
        - token (str): Token JWT a verificar.
    
    Retorna:
        - str: ID del usuario si el token es válido.
        - None: Si el token es inválido o ha expirado.
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get("user_id")
    except jwt.ExpiredSignatureError:
        print("Token expirado.")
        return None
    except jwt.InvalidTokenError:
        print("Token inválido.")
        return None


# ✅ Cifrado de Contraseña (Opcional)
import hashlib


def hash_password(password: str):
    """
    Cifra una contraseña usando SHA-256.
    
    Parámetros:
        - password (str): Contraseña en texto plano.
    
    Retorna:
        - str: Hash de la contraseña.
    """
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(password: str, hashed_password: str):
    """
    Verifica si una contraseña coincide con su hash.
    
    Parámetros:
        - password (str): Contraseña en texto plano.
        - hashed_password (str): Hash almacenado en la base de datos.
    
    Retorna:
        - bool: True si coinciden, False si no.
    """
    return hash_password(password) == hashed_password