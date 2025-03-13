# models for the account app

# makes python look for files in the upper directory as well
import sys
sys.path.append("..")

from fastapi import HTTPException, status
from pydantic import BaseModel, EmailStr
from backend.utils import get_collection, hash_password
from os import getenv

# model that represents the user
class UserModel(BaseModel):
    username: str
    password: str
    email: EmailStr
    roles: list[str] | None = None

# model that represents the fields required to login
class UserLogin(BaseModel):
    username: str
    password: str

# validator for the user model
async def UserValidator(user: UserModel):
    print(user)
    banned_characters = "/\\ "
    collection = await get_collection('Users')
    user.roles = [] # users are not allowed to select which roles they have when creating an account
    # check for duplicate username and email
    if await collection.count_documents({"username": user.username}) > 0:
        raise HTTPException(detail="Username taken", status_code=status.HTTP_400_BAD_REQUEST)
    if await collection.count_documents({"email": user.email}) > 0:
        raise HTTPException(detail="Email taken", status_code=status.HTTP_400_BAD_REQUEST)
    if user.username == getenv("ADMIN_USERNAME"):
        user.roles.append("admin")
    for character in banned_characters:
        if character in user.username:
            raise HTTPException(detail=f'Invalid character: "{character}"', status_code=status.HTTP_400_BAD_REQUEST)
    # hash password
    user.password = hash_password(user.password)

    return user