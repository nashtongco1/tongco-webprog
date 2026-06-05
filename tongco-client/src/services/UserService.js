import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/users",
});

export const fetchUsers = () => API.get("/");

export const createUser = (userData) => API.post("/", userData);

export const updateUser = (id, userData) => API.put(`/${id}`, userData);

export const deleteUser = (id) => API.delete(`/${id}`);

export const loginUser = (credentials) => API.post("/login", credentials);