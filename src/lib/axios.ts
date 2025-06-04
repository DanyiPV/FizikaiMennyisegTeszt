import axios from "axios";

const axiosClient = axios.create({
  baseURL: " http://localhost:3000/", // fejlesztéshez - http://localhost:3000/ product - /api
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;