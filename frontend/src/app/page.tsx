"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import Link from "next/link";

interface Card {
  _id: string;
  name: string;
  images: { small: string; large: string };
  set: { name: string };
  rarity: string;
  color: string;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCards = async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/cards", {
        params: query ? { name: query } : {},
      });
      setCards(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load cards.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCards(search);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gundam TCG Search</h1>

      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-6 gap-2"
      >
        <input
          type="text"
          placeholder="Search Gundam cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-1/2 rounded border border-gray-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading cards...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card._id} href={`/card/${card._id}`}>
            <div className="bg-gray-800 rounded p-2 hover:scale-105 transition transform cursor-pointer">
              <img
                src={card.images.small}
                alt={card.name}
                className="w-full rounded"
              />
              <h2 className="mt-2 text-center text-white">{card.name}</h2>
              <p className="text-center text-gray-400 text-sm">{card.set.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
