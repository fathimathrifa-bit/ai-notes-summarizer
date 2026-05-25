
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import RegisterModel, LoginModel, SummarizeModel
from database import users_collection, history_collection
from auth import create_token, verify_token
from dotenv import load_dotenv
from datetime import datetime
from bson import ObjectId
import bcrypt
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AI Notes Summarizer Backend Running"}

@app.post("/register")
def register(data: RegisterModel):
    if users_collection.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    hashed = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt())
    users_collection.insert_one({
        "email": data.email,
        "password": hashed.decode()
    })
    return {"message": "Registered successfully"}

@app.post("/login")
def login(data: LoginModel):
    user = users_collection.find_one({"email": data.email})
    if not user or not bcrypt.checkpw(data.password.encode(), user["password"].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": create_token(str(user["_id"]))}

@app.get("/profile")
def profile(user_id: str = Depends(verify_token)):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    return {"email": user["email"]}

@app.post("/summarize")
def summarize(data: SummarizeModel, user_id: str = Depends(verify_token)):
    try:
        # Simple extractive summarization - no internet needed!
        text = data.notes
        sentences = text.replace('!', '.').replace('?', '.').split('.')
        sentences = [s.strip() for s in sentences if len(s.strip()) > 20]
        
        # Pick key sentences (first, middle, last)
        if len(sentences) <= 3:
            summary_sentences = sentences
        else:
            mid = len(sentences) // 2
            summary_sentences = [
                sentences[0],
                sentences[mid],
                sentences[-1]
            ]
        
        summary = ". ".join(summary_sentences) + "."
        summary = f"📝 Summary:\n\n{summary}\n\n🔑 Key Points:\n• {sentences[0]}\n• {sentences[min(1, len(sentences)-1)]}"
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    history_collection.insert_one({
        "userId": user_id,
        "notes": data.notes,
        "summary": summary,
        "createdAt": datetime.utcnow()
    })
    return {"summary": summary}
       

@app.get("/history")
def get_history(user_id: str = Depends(verify_token)):
    items = list(history_collection.find(
        {"userId": user_id}, {"_id": 0}
    ).sort("createdAt", -1))
    for item in items:
        if "createdAt" in item:
            item["createdAt"] = item["createdAt"].isoformat()
    return items