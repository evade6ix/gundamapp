from fastapi import FastAPI
from app.routers import cards
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Gundam TCG API", version="1.0.0")

# CORS configuration (allow all origins TEMPORARILY for testing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TEMP: open for debugging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(cards.router, prefix="/api/cards", tags=["Cards"])

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
