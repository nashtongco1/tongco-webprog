import axios from "axios";
import constants from "../constants"; // adjust path if needed

const API = axios.create({
  baseURL: `${constants.HOST}/users`,
});

export const fetchUsers = () => API.get("/");

export const createUser = (userData) => API.post("/", userData);

export const updateUser = (id, userData) => API.put(`/${id}`, userData);

export const deleteUser = (id) => API.delete(`/${id}`);

export const loginUser = (credentials) => API.post("/login", credentials);