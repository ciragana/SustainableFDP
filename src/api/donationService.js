import apiClient from "./apiClient";

export const getDonations = async () => {
  try {
    const response = await apiClient.get("/Donations");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const createDonation = async (donationData) => {
  try {
    const response = await apiClient.post("/Donations", donationData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// claim donation by id
export const claimDonation = async (id) => {
  try {
    const response = await apiClient.post(`/Donations/${id}/claim`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}


export const claimedDonations = async () => {
  try {
    const response = await apiClient.get("/Donations/my-claimed-donations");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
