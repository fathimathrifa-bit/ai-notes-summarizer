
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["notesai"]

users_collection = db["users"]
history_collection = db["history"]