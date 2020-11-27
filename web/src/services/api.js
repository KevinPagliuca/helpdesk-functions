import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.230.115:3333',
});

export default api;