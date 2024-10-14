import axios from "axios";

const baseApi = axios.create({
  baseURL: "localhost",
  headers: { "Content-Type": "application/json" },
});

export default baseApi;
