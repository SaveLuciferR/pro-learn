import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://pro-learn`,
});

export default axiosClient;
