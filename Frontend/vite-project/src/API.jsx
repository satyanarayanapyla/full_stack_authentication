import axios from "axios";

const API = axios.create({
  baseURL: "https://authority-enterprenours-backend-6.onrender.com"
});

export default API;