from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.auth.routes import auth_router
from backend.routes.workspace import workspace_router


app = FastAPI()  # ✅ First create the app instance



app.add_middleware(  # ✅ CORS middleware
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workspace_router, prefix="/workspace")  # ✅ Routers after app is defined
app.include_router(auth_router, prefix="/auth")
