const axios = require('axios');
require('dotenv').config();

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY
  }
});

module.exports = axiosClient;

const axios = require('axios');
