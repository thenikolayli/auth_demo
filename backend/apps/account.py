from fastapi import APIRouter, Request, Response, status
from backend.models import UserModel
from backend.utils import get_collection

router = APIRouter(prefix="/api/account", tags=["account"])

# @router.post("/create")
# async def create_account(user: UserModel, request: Request):
#     # db = await get_collection("User")
#     # await db.insert_one(dict(user))
#     print(request.cookies)
# 
#     return Response("hhihih", status_code=status.HTTP_201_CREATED)