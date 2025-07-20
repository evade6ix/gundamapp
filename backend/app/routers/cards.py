from fastapi import APIRouter, HTTPException, Query
from app.database import cards_collection
from bson import ObjectId

router = APIRouter()

# Search cards
@router.get("/")
async def search_cards(name: str = Query(None, description="Search by card name"), limit: int = 25, page: int = 1):
    query = {}
    if name:
        query["name"] = {"$regex": name, "$options": "i"}  # Case-insensitive search

    skip = (page - 1) * limit
    total = cards_collection.count_documents(query)
    cursor = cards_collection.find(query).skip(skip).limit(limit)
    cards = []
    for card in cursor:
        card["_id"] = str(card["_id"])  # Convert ObjectId to string
        cards.append(card)

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "totalPages": (total // limit) + (1 if total % limit else 0),
        "data": cards,
    }


# Get single card by ID
@router.get("/{card_id}")
async def get_card(card_id: str):
    try:
        _id = ObjectId(card_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid card ID format")

    card = cards_collection.find_one({"_id": _id})
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    card["_id"] = str(card["_id"])
    return card
