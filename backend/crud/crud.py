# endpoints for the admin panel to interact with the database
# no models.py, as this uses models from all the other apps

# makes python look for files in the upper directory as well
import sys
sys.path.append("..")

from fastapi import APIRouter, status, Request, Depends
from fastapi.responses import JSONResponse
from typing import Any
from backend.utils import get_collection, require_role, hash_password
from backend.account.models import UserModel, UserValidator
import json
router = APIRouter(prefix="/models", tags=["models"])

# endpoint that returns a user given a username
@router.get("/user/{username}")
async def get_single_user(username: str, _=Depends(require_role("admin"))):
    collection = await get_collection("Users")
    user = await collection.find_one({"username": username})

    if not user:
        return JSONResponse("User not found", status_code=status.HTTP_404_NOT_FOUND)

    user["_id"] = str(user["_id"])
    return JSONResponse(user, status_code=status.HTTP_200_OK)

# endpoint that returns a list of users
@router.get("/user")
async def get_list_user(skip: int = 0, number: int = 10, _=Depends(require_role("admin"))):
    collection = await get_collection("Users")
    users = await collection.find().skip(skip).limit(number).to_list()
    for user in users:
        user["_id"] = str(user["_id"])

    return JSONResponse(users, status_code=status.HTTP_200_OK)

# endpoint that creates a user
@router.post("/user")
async def create_user(user: UserModel = Depends(UserValidator), _=Depends(require_role("admin"))):
    collection = await get_collection("Users")
    new_user = await collection.insert_one(user.model_dump())
    return JSONResponse(str(new_user.inserted_id), status_code=status.HTTP_201_CREATED)

# endpoint that updates a user given a username, field, and value
@router.patch("/user")
async def create_user(username: str, field: str, value: Any, _=Depends(require_role("admin"))):
    collection = await get_collection("Users")

    # special cases for each field
    match field:
        case "username":
            value = value
        case "roles":
            value = json.loads(value)
        case "password":
            value = hash_password(value)

    result = await collection.update_one({"username": username}, {"$set": {field: value}})

    if result.matched_count == 0:
        return JSONResponse("no user found", status_code=status.HTTP_404_NOT_FOUND)

    return JSONResponse(f"{username}'s {field} set to {value}", status_code=status.HTTP_200_OK)

# endpoint that deletes a user given a username
@router.delete("/user/{username}")
async def delete_user(username: str, _=Depends(require_role("admin"))):
    collection = await get_collection("Users")
    deleted_user = await collection.delete_one({"username": username})

    if deleted_user.deleted_count == 0:
        return JSONResponse("User not found", status_code=status.HTTP_404_NOT_FOUND)

    return JSONResponse("User deleted", status_code=status.HTTP_200_OK)