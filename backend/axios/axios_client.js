import axios from "axios";
require('dotenv').config();

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY
  }
});

export default axiosClient;