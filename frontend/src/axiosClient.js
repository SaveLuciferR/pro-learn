import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://pro-learn`,
  withCredentials: true,
  // timeout: 60000,
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
});

export default axiosClient;
