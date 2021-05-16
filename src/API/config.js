import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL + 'api',
  headers: {
    'Content-Type': 'application/json',
    accept: 'text/plain',
  },
});

export default api;
