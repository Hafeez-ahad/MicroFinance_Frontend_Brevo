import axios from 'axios';

const URL = import.meta.env.VITE_URL;

const apiClient = axios.create({
    baseURL:  URL ,
    timeout :7000,
    headers : {
        "Content-Type" : 'application/json'
    }
})

export default apiClient