
from jose import jwt, JWTError
from fastapi import HTTPException, Header
from dotenv import load_dotenv
import os

load_dotenv()
SECRET = os.getenv("JWT_SECRET")

def create_token(user_id: str):
    return jwt.encode({"id": user_id}, SECRET, algorithm="HS256")

def verify_token(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        return payload["id"]
    except (JWTError, IndexError):
        raise HTTPException(status_code=401, detail="Invalid or missing token")