from motor.motor_asyncio import AsyncIOMotorClient
from os import getenv

async def get_collection(collection_name):
    client = AsyncIOMotorClient(getenv('MONGO_URI'))
    db = client["main"] # theres only one db
    collection = db[collection_name]

    return collection