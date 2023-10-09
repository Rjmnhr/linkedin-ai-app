import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://backend.azkroflyz.com", // Replace with your API base URL
  // baseURL: "http://localhost:8002",
  timeout: 20000, // Request timeout in milliseconds
});

export default AxiosInstance;
