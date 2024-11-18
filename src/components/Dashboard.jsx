import React, { useEffect, useState, useContext } from 'react';
import { Button, Card } from 'flowbite-react';
import { getDonations, claimDonation, claimedDonations } from '../api/donationService';
import { showToast } from '../utils/toastNotifications';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getDonations(); // Fetch available donations
        setDonations(data.$values); // Access the donations inside `$values`
        console.log(data);
      } catch (error) {
        showToast(`Failed to fetch donations: ${error.message}`, 'error');
      }
    };

    fetchDonations();
  }, []);

  const handleClaimDonation = async (id) => {
    try {
      await claimDonation(id); // Call the API to claim the donation
      showToast('Donation claimed successfully!', 'success');
      // Update the state to reflect the claimed donation
      setDonations((prevDonations) =>
        prevDonations.filter((donation) => donation.id !== id)
      );
    } catch (error) {
      showToast(`Failed to claim donation: ${error.message}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-green-800 text-white py-16 px-6 md:px-12 lg:px-20 flex flex-col items-center text-center rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">SustainableFDP</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Join us in making a difference! Our platform connects restaurants, charities, and individuals to manage food donations and reduce waste, ensuring resources reach those who need them the most.
        </p>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map((donation) => (
          <Card key={donation.id} className="bg-white dark:bg-gray-800">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">{donation.itemName}</h5>
            <p className="text-gray-700 dark:text-gray-400">{donation.description}</p>
            <p className="text-gray-700 dark:text-gray-400">Quantity: {donation.quantity}</p>
            <p className="text-gray-700 dark:text-gray-400">
              Claimed: {donation.isClaimed ? 'Yes' : 'No'}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Donated By: {donation.donor?.email || 'Unknown'}
            </p>
            {authState.role === 'User' && !donation.isClaimed && (
              <Button className="mt-2" onClick={() => handleClaimDonation(donation.id)}>
                Claim Donation
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
