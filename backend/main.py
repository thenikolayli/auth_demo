# main app the connects all the apps

from fastapi import FastAPI, Depends
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.middleware.cors import CORSMiddleware
from backend.account.account import router as account_router
from backend.crud.crud import router as crud_router
from backend.utils import require_role
from dotenv import load_dotenv
from os import getenv

# loads env variables for the whole app
load_dotenv()
app = FastAPI(docs_url=None, redoc_url=None, openapi_url="/openapi.json")
app.include_router(account_router)
app.include_router(crud_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=getenv("CORS_ORIGINS"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/")
async def root(_=Depends(require_role("admin"))):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="Admin Panel")