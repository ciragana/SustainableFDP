import React, { useEffect, useState } from 'react';
import { fetchClaimedDonations } from '../api/donationService';
import { Timeline, Button } from 'flowbite-react';
import { showToast } from '../utils/toastNotifications';
import { HiArrowNarrowRight } from 'react-icons/hi';

const UsersPanel = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await fetchClaimedDonations();
        setDonations(data);
      } catch (error) {
        showToast(`Failed to fetch donations: ${error.message}`, 'error');
      }
    };

    fetchDonations();
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
                <Timeline.Time>{new Date(donation.claimedAt).toLocaleString()}</Timeline.Time>
                <Timeline.Title>{donation.itemName}</Timeline.Title>
                <Timeline.Body>
                  <p>{donation.description}</p>
                  <p>Quantity: {donation.quantity}</p>
                  <p>Donor: {donation.donorUsername}</p>
                </Timeline.Body>
                <Button color="gray">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                </Button>
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
