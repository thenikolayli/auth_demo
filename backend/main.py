from fastapi import FastAPI
from backend.apps.account import router as account_router

app = FastAPI()
app.include_router(account_router)