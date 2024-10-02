import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export default baseApi;