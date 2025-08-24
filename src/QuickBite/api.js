
import axios from 'axios'

export const API = "https://quickbite-backend-7eur.onrender.com"

//export const API = "http://localhost:4000";

export const API_URL = axios.create({
    baseURL: API
});