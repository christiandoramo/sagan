import axios from 'axios';
const api = axios.create({
    baseURL: 'https://api.saganufrpe.tech/',
    //baseURL: 'http://localhost:8080/',
    withCredentials: true,
});

export default api;
