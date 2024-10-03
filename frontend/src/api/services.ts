import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export default baseApi;