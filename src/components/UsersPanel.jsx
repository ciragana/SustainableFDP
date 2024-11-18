import React, { useEffect, useState } from 'react';
import { fetchClaimedDonations } from '../api/donationService';
import { Timeline } from 'flowbite-react';
import { showToast } from '../utils/toastNotifications';

const UsersPanel = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const claimedDonations = async () => {
      try {
        const data = await fetchClaimedDonations();
        console.log(data);
        setDonations(data);
      } catch (error) {
        showToast(`Failed to fetch donations: ${error.message}`, 'error');
      }
    };

    claimedDonations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Claimed Donations</h1>
      <Timeline>
        {donations.length > 0 ? (
          donations.map((donation) => (
            <Timeline.Item key={donation.id}>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>{new Date(donation.createdAt).toLocaleString()}</Timeline.Time>
                <Timeline.Title>Donation ID: {donation.id}</Timeline.Title>
                <Timeline.Body>
                  <p>Donor ID: {donation.donorId}</p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          ))
        ) : (
          <p>No claimed donations available.</p>
        )}
      </Timeline>
    </div>
  );
};

export default UsersPanel;
