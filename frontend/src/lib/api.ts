import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://gundamapp-production.up.railway.app/api" // Hardcoded for Vercel
      : "http://localhost:8000/api", // Local Dev
});

export default api;
