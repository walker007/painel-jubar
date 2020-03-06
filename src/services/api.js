import axios from 'axios';
import {getToken} from "./Auth";
const api = axios.create({
    baseURL: process.env.REACT_APP_URL_API
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;