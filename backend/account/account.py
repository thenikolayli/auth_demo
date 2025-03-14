# app for account interactions

# makes python look for files in the upper directory as well
import sys
sys.path.append("..")

from fastapi import APIRouter, status, Request, Depends
from fastapi.responses import JSONResponse
from backend.account.models import UserModel, UserLogin, UserValidator
from backend.utils import get_collection, verify_password, generate_token_pair, refresh_token_pair, decode_access_token, get_tokens_from_request
from os import getenv
from bson import ObjectId
import json

router = APIRouter(prefix="/account", tags=["account"])

# endpoint that logs the user in
@router.post("/login")
async def login(user_data: UserLogin):
    collection = await get_collection('Users')
    user = await collection.find_one({"username": user_data.username})

    # if the user doesn't exist
    if not user:
        return JSONResponse("User not found", status_code=status.HTTP_404_NOT_FOUND)
    # if the password is incorrect
    if not verify_password(user_data.password, user['password']):
        return JSONResponse("Incorrect password", status_code=status.HTTP_400_BAD_REQUEST)

    # gets tokens and creates an auth cookie
    new_access_token, new_refresh_token = generate_token_pair(str(user['_id']))
    response = JSONResponse("Logged in", status_code=status.HTTP_200_OK)
    response.set_cookie(
        key=getenv("AUTH_COOKIE_NAME"),
        value=json.dumps({"access": new_access_token, "refresh": new_refresh_token}),
        domain=getenv("AUTH_COOKIE_DOMAIN"),
        secure=getenv("AUTH_COOKIE_SECURE") == "True",
        httponly=getenv("AUTH_COOKIE_HTTPONLY") == "True",
        samesite=getenv("AUTH_COOKIE_SAMESITE"),
        expires=int(getenv("AUTH_COOKIE_REFRESH_AGE"))
    )

    return response

# endpoint that logs a user out
@router.delete("/logout")
async def logout():
    # deletes cookie
    response = JSONResponse("Logged out", status_code=status.HTTP_200_OK)
    response.delete_cookie(
        key=getenv("AUTH_COOKIE_NAME"),
        domain=getenv("AUTH_COOKIE_DOMAIN"),
        secure=bool(getenv("AUTH_COOKIE_SECURE")),
        samesite=getenv("AUTH_COOKIE_SAMESITE")
    )

    return response

@router.get("/refresh_token")
async def refresh_token(request: Request):
    # gets tokens and creates an auth cookie
    access_token, refresh_token = get_tokens_from_request(request)
    new_access_token, new_refresh_token = refresh_token_pair(refresh_token)

    payload = decode_access_token(access_token)
    user_id = payload["user_id"]

    users = await get_collection('Users')
    user = await users.find_one({"_id": ObjectId(user_id)})
    user.pop("password", "_id")
    user.update({"_id": str(user_id)})

    response = JSONResponse(user, status_code=status.HTTP_200_OK)
    response.set_cookie(
        key=getenv("AUTH_COOKIE_NAME"),
        value=json.dumps({"access": new_access_token, "refresh": new_refresh_token}),
        domain=getenv("AUTH_COOKIE_DOMAIN"),
        secure=getenv("AUTH_COOKIE_SECURE") == "True",
        httponly=getenv("AUTH_COOKIE_HTTPONLY") == "True",
        samesite=getenv("AUTH_COOKIE_SAMESITE"),
        expires=int(getenv("AUTH_COOKIE_REFRESH_AGE"))
    )

    return response

@router.post("/")
async def create_account(user: UserModel = Depends(UserValidator)):
    collection = await get_collection('Users')
    await collection.insert_one(user.model_dump())
    return JSONResponse("Account created", status_code=status.HTTP_201_CREATED)

@router.delete("/")
async def delete_account(request: Request):
    # gets user id from access token and deletes user
    access_token, _ = get_tokens_from_request(request)
    payload = decode_access_token(access_token)
    user_id = payload["user_id"]

    collection = await get_collection('Users')
    await collection.delete_one({"_id": ObjectId(user_id)})

    response = JSONResponse("Account deleted", status_code=status.HTTP_200_OK)
    response.delete_cookie(
        key=getenv("AUTH_COOKIE_NAME"),
        domain=getenv("AUTH_COOKIE_DOMAIN"),
        secure=getenv("AUTH_COOKIE_SECURE") == "True",
        samesite=getenv("AUTH_COOKIE_SAMESITE")
    )

    return response

@router.get("/{username}")
async def get_account(username: str):
    collection = await get_collection('Users')
    user = await collection.find_one({"username": username})
    sensitive_values = ["password", "_id", "email", "roles"]

    if not user:
        return JSONResponse("User not found", status_code=status.HTTP_404_NOT_FOUND)

    for value in sensitive_values:
        user.pop(value)
    return JSONResponse(user, status_code=status.HTTP_200_OK)