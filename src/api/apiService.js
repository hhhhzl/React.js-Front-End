import axios from "axios";
import { TOKEN_LOCAL_STORAGE_KEY } from "../constants/values";

const apiService = axios.create({
  baseURL: "http://localhost:80/api/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    // OK responses
    console.log(response);
    return response;
  },
  (error) => {
    // not OK responses
    console.log(error.response);
    return Promise.reject(error);
  }
);

export default apiService;
