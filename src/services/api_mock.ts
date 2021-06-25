import axios from 'axios';

const api_mock = axios.create({
  baseURL: 'http://localhost:3001',
});

export default api_mock;
