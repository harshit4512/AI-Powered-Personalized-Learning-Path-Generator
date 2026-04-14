import axios from "axios"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  // reads VITE_API_URL from .env file
  // http://localhost:5000/api

  withCredentials: true,
  // CRITICAL
  // sends cookies with every request
  // without this auth never works

  headers: {
    "Content-Type": "application/json",
  },
})

export default api