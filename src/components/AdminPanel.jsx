import React, { useEffect, useState } from 'react';
import { getUsers, getDonationCount, getClaimedDonationCount } from '../api/adminService';
import { Card } from 'flowbite-react';
import { showToast } from '../utils/toastNotifications';

const AdminPanel = () => {
  const [users, setUsers] = useState({ Admin: [], Donor: [], User: [] });
  const [donationCounts, setDonationCounts] = useState({});
  const [claimedDonationCounts, setClaimedDonationCounts] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        const filteredUsers = { Admin: [], Donor: [], User: [] };

        // Categorize users based on their roles
        if (data.Admin?.$values) {
          filteredUsers.Admin = data.Admin.$values;
        }
        if (data.Donor?.$values) {
          filteredUsers.Donor = data.Donor.$values;
        }
        if (data.User?.$values) {
          filteredUsers.User = data.User.$values;
        }

        setUsers(filteredUsers);
      } catch (error) {
        showToast(`You do not have Admin privileges`, 'error');
      }
    };

    const fetchDonationCounts = async () => {
      try {
        const data = await getDonationCount();
        setDonationCounts(data);
      } catch (error) {
        showToast(`Failed to fetch donation counts: ${error.message}`, 'error');
      }
    };

    const fetchClaimedDonationCounts = async () => {
      try {
        const data = await getClaimedDonationCount();
        setClaimedDonationCounts(data);
      } catch (error) {
        showToast(`Failed to fetch claimed donation counts: ${error.message}`, 'error');
      }
    };

    fetchUsers();
    fetchDonationCounts();
    fetchClaimedDonationCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Admin', 'Donor', 'User'].map((role) => (
          <div key={role}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{role}s</h2>
            {users[role].map((user) => (
              <Card key={user.id} className="bg-white dark:bg-gray-800 mb-4">
                <h5 className="text-xl font-bold text-gray-900 dark:text-white">{user.username}</h5>
                <p className="text-gray-700 dark:text-gray-400">Email: {user.email}</p>
                <p className="text-gray-700 dark:text-gray-400">Role: {role}</p>
              </Card>
            ))}
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Daily Donation Counts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(donationCounts).map(([date, count]) => (
          <Card key={date} className="bg-white dark:bg-gray-800 mb-4">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">{date}</h5>
            <p className="text-gray-700 dark:text-gray-400">Donations: {count}</p>
          </Card>
        ))}
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Daily Claimed Donation Counts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(claimedDonationCounts).map(([date, count]) => (
          <Card key={date} className="bg-white dark:bg-gray-800 mb-4">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">{date}</h5>
            <p className="text-gray-700 dark:text-gray-400">Claims: {count}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
