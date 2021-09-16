import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: "https://my-json-server.typicode.com/cypriluc/simple-score-recorder",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getResults() {
    return apiClient.get("/results");
  },

  postResult(result) {
    return apiClient.post("/results", result);
  },
};
