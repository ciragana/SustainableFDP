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

// daily donation count
export const getDonationCount = async () => {
  try {
    const response = await apiClient.get("/Admin/daily-donation-counts");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}


// /Admin/daily-claimed-donation-counts
export const getClaimedDonationCount = async () => {
  try {
    const response = await apiClient.get("/Admin/daily-claimed-donation-counts");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
