import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Edit User
const editUser = async (userData) => {
  const response = await axios.put(`${API_URL}/${userData.id}`, userData);
  return response.data;
};

// Delete User
const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data;
};

const userService = {
  register,
  getUsers,
  editUser,
  deleteUser,
};

export default userService;
