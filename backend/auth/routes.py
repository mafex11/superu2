from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel, EmailStr
from backend.database import db
from backend.utils import hash_password, verify_password, create_access_token

auth_router = APIRouter()

class UserSchema(BaseModel):
    email: EmailStr
    password: str

@auth_router.post("/signup")
async def signup(data: UserSchema, response: Response):
    existing = await db.users.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = hash_password(data.password)
    await db.users.insert_one({"email": data.email, "hashed_password": hashed})

    token = create_access_token({"sub": data.email})
    response.set_cookie("access_token", token, httponly=True)
    return {"msg": "User created"}

@auth_router.post("/login")
async def login(data: UserSchema, response: Response):
    user = await db.users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": data.email})
    response.set_cookie("access_token", token, httponly=True)
    return {"msg": "Logged in"}
