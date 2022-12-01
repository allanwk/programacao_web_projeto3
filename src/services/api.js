import axios from "axios";

const api = axios.create({
  baseURL: "https://programacao-web-projeto3-backend.vercel.app/",
});

export default api;
