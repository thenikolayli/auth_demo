# main app the connects all the apps

from fastapi import FastAPI
from backend.account.account import router as account_router
from backend.crud.crud import router as crud_router
from dotenv import load_dotenv

# loads env variables for the whole app
load_dotenv()
app = FastAPI()
app.include_router(account_router)
app.include_router(crud_router)