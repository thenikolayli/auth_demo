from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional

class UserModel(BaseModel):
    username: str
    password: str
    email: EmailStr
    groups: Optional[list[str]] = None