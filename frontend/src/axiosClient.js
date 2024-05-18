import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://api.pro-learn.my', // http://localhost:8000
    withCredentials: true,
    headers: {
        // "Access-Control-Allow-Origin": "http://pro-learn.my:3000",
    }
    // timeout: 60000,
});

export default axiosClient;
