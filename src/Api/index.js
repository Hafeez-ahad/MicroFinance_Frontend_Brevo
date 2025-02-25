import axios from 'axios';


const apiClient = axios.create({
    baseURL: "https://micro-finance-backend.vercel.app"  ,
    timeout :7000,
    headers : {
        "Content-Type" : 'application/json'
    }
})

export default apiClient