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

const resolveReferences = (data) => {
  const itemMap = new Map();

  // First pass: create a map of items
  data.forEach((item) => {
    if (!item.$ref) {
      itemMap.set(item.$id, item);
    }
  });

  // Second pass: resolve references
  data.forEach((item) => {
    if (item.$ref) {
      const resolvedItem = itemMap.get(item.$ref);
      Object.assign(item, resolvedItem);
    }
  });

  return data;
};

const cleanData = (data) => {
  const resolvedData = resolveReferences(data);
  return resolvedData.map((claim) => ({
    id: claim.donation.id,
    donorId: claim.donation.donorId,
    createdAt: claim.donation.createdAt,
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
