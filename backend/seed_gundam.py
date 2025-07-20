import requests
from app.database import cards_collection
from dotenv import load_dotenv
import os

load_dotenv()

API_TCG_KEY = os.getenv("API_TCG_KEY")
HEADERS = {"x-api-key": API_TCG_KEY}
API_URL = "https://apitcg.com/api/gundam/cards"

def seed_cards():
    page = 1
    total_inserted = 0

    while True:
        params = {"page": page, "limit": 100}
        response = requests.get(API_URL, headers=HEADERS, params=params)
        response.raise_for_status()
        data = response.json()

        cards = data.get("data", [])
        if not cards:
            break

        # Insert cards to MongoDB
        for card in cards:
            existing = cards_collection.find_one({"id": card["id"]})
            if not existing:
                cards_collection.insert_one(card)
                total_inserted += 1

        print(f"Seeded page {page} with {len(cards)} cards")
        if page >= data.get("totalPages", 0):
            break
        page += 1

    print(f"✅ Total cards seeded: {total_inserted}")

if __name__ == "__main__":
    seed_cards()
