import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://etix-mobile-app-deployed-1.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
