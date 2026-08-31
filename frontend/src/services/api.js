import axios from 'axios';

const api = axios.create({//axios wrapper
  baseURL: 'http://localhost:5000/api',
});

export default api;