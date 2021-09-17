import axios from "axios";
import NProgress from "nprogress";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: "https://my-json-server.typicode.com/cypriluc/simple-score-recorder",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// axios interceptors - use nprogress
apiClient.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

apiClient.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

// methods
export default {
  getResults() {
    return apiClient.get("/results");
  },

  postResult(result) {
    return apiClient.post("/results", result);
  },
};
