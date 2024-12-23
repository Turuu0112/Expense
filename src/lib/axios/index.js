import axios from "axios";

export const api = axios.create({
  baseURL: "//localhost:5000", // Use http for localhost unless you have HTTPS set up
  // baseURL:"https://expense-trackertu.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
