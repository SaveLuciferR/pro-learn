import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://api.pro-learn.my',
  withCredentials: true,
  headers: {
    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    // 'Cookie': 'PHPSESSID=' + localStorage.getItem('client'),
    // "Cache-Control": "no-cache",
    // "Cookie": document.cookie,
  }

  // timeout: 60000,
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
});

export default axiosClient;
