from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (keeping existing setup)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# --- Logic for YouTube Extraction ---

class ThumbnailRequest(BaseModel):
    url: str

class ThumbnailResponse(BaseModel):
    video_id: str
    thumbnails: dict

def extract_video_id(url: str) -> str:
    """
    Extracts the video ID from various YouTube URL formats.
    """
    # Regex patterns for different YouTube URL formats
    patterns = [
        r'(?:v=|\/)([0-9A-Za-z_-]{11}).*',
        r'(?:youtu\.be\/)([0-9A-Za-z_-]{11})',
        r'(?:embed\/)([0-9A-Za-z_-]{11})',
        r'(?:shorts\/)([0-9A-Za-z_-]{11})'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

@api_router.post("/extract", response_model=ThumbnailResponse)
async def extract_thumbnail(request: ThumbnailRequest):
    video_id = extract_video_id(request.url)
    
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL. Could not extract Video ID.")
    
    # Generate standard YouTube thumbnail URLs
    base_url = f"https://img.youtube.com/vi/{video_id}"
    
    thumbnails = {
        "maxres": f"{base_url}/maxresdefault.jpg", # HD (1280x720) - Not always available
        "sd": f"{base_url}/sddefault.jpg",         # SD (640x480)
        "hq": f"{base_url}/hqdefault.jpg",         # HQ (480x360)
        "mq": f"{base_url}/mqdefault.jpg",         # MQ (320x180)
        "default": f"{base_url}/default.jpg"       # Default (120x90)
    }
    
    return ThumbnailResponse(video_id=video_id, thumbnails=thumbnails)

# --- End Logic ---

@api_router.get("/")
async def root():
    return {"message": "YT Grabber API Operational"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
