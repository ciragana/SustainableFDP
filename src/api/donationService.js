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
  return data
    .filter((claim) => claim.donation) // Ensure the donation exists
    .map((claim) => ({
      id: claim.id,
      donationId: claim.donationId,
      itemName: claim.donation?.itemName || 'Unknown Item',
      description: claim.donation?.description || 'No description provided',
      quantity: claim.donation?.quantity || 0,
      donorEmail: claim.donation?.donor?.email || 'Unknown Donor',
      donorUsername: claim.donation?.donor?.username || 'Unknown Username',
      claimedAt: claim.claimedAt,
    }));
};


export const fetchClaimedDonations = async () => {
  try {
    const response = await claimedDonations(); // API call
    const cleanedDonations = cleanData(response);
    return cleanedDonations; // Return cleaned data
  } catch (error) {
    console.error('Failed to fetch claimed donations:', error);
    throw error;
  }
};
