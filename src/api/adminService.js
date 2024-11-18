import apiClient from "./apiClient";

// Get all users who have registered, Admins, donors, Users
export const getUsers = async () => {
  try {
    const response = await apiClient.get("/Admin/all-users");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
