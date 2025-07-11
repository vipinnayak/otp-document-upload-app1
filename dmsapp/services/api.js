// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.85.253:5000/api/documentManagement',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
