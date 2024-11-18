import apiClient from './apiClient';

export const getDonations = async () => {
  try {
    const response = await apiClient.get('/Donations');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createDonation = async (donationData) => {
  try {
    const response = await apiClient.post('/Donations', donationData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// claim donation by id
export const claimDonation = async (id) => {
  try {
    const response = await apiClient.post(`/Donations/${id}/claim`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const claimedDonations = async () => {
  try {
    const response = await apiClient.get('/Donations/my-claimed-donations');
    return response.data.$values; // Extract the donations from the $values array
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const cleanData = (data) => {
  return data.map((claim) => ({
    id: claim.id,
    donationId: claim.donationId,
    itemName: claim.itemName,
    description: claim.description,
    quantity: claim.quantity,
    donorEmail: claim.donor.email,
    claimedAt: claim.claimedAt,
  }));
};

const fetchClaimedDonations = async () => {
  try {
    const response = await claimedDonations(); // API call
    const cleanedDonations = cleanData(response);
    setDonations(cleanedDonations); // Update state with cleaned data
  } catch (error) {
    console.error('Failed to fetch claimed donations:', error);
  }
};
