from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from backend.scraper import scrape_website
from backend.database import db
import uuid

workspace_router = APIRouter()

class ScrapeRequest(BaseModel):
    url: str
    user_email: str

@workspace_router.post("/scrape")
async def handle_scrape(data: ScrapeRequest):
    try:
        sections = await scrape_website(data.url)

        # Save in MongoDB as a new "page"
        page_id = str(uuid.uuid4())
        page = {
            "_id": page_id,
            "url": data.url,
            "user_email": data.user_email,
            "title": data.url.split("/")[-1] or "index",
            "content": sections,
        }

        await db.pages.insert_one(page)
        return {"page_id": page_id, "sections": sections}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
