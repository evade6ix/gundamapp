from fastapi import FastAPI
from app.routers import cards
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app = FastAPI(title="Gundam TCG API", version="1.0.0")

# Force HTTPS for all requests
app.add_middleware(HTTPSRedirectMiddleware)

# CORS configuration (TEMPORARY: allow all origins for debugging)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TEMP: Open to all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(cards.router, prefix="/api/cards", tags=["Cards"])

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
