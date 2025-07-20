"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

interface Card {
  _id: string;
  name: string;
  images: { small: string; large: string };
  set: { name: string };
  rarity: string;
  color: string;
  level?: string;
  cost?: string;
  ap?: string;
  hp?: string;
  cardType?: string;
  effect?: string;
}

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await api.get(`/cards/${id}`);
        setCard(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load card.");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) return <p className="text-center">Loading card...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!card) return <p className="text-center">Card not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/" className="text-blue-500 hover:underline">&larr; Back to Search</Link>
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <img
          src={card.images.large}
          alt={card.name}
          className="rounded w-full md:w-1/2"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{card.name}</h1>
          <p className="text-gray-400 mb-4">{card.set.name}</p>
          <div className="space-y-2">
            <p><strong>Rarity:</strong> {card.rarity}</p>
            <p><strong>Color:</strong> {card.color}</p>
            {card.level && <p><strong>Level:</strong> {card.level}</p>}
            {card.cost && <p><strong>Cost:</strong> {card.cost}</p>}
            {card.ap && <p><strong>AP:</strong> {card.ap}</p>}
            {card.hp && <p><strong>HP:</strong> {card.hp}</p>}
            {card.cardType && <p><strong>Type:</strong> {card.cardType}</p>}
            {card.effect && (
              <p><strong>Effect:</strong> <span dangerouslySetInnerHTML={{ __html: card.effect }} /></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
