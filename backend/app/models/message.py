from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Message(BaseModel):
    user_id: str
    content: str
    timestamp: Optional[datetime] = datetime.utcnow()
