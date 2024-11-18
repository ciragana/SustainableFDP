import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/adminService';
import { Card } from 'flowbite-react';
import { showToast } from '../utils/toastNotifications';

const AdminPanel = () => {
  const [users, setUsers] = useState({ Admin: [], Donor: [], User: [] });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        const filteredUsers = { Admin: [], Donor: [], User: [] };

        // Categorize users based on their roles
        Object.values(data).forEach((userList) => {
          userList.forEach((user) => {
            if (user.role === 0) {
              filteredUsers.Admin.push(user);
            } else if (user.role === 1) {
              filteredUsers.Donor.push(user);
            } else if (user.role === 2) {
              filteredUsers.User.push(user);
            }
          });
        });

        setUsers(filteredUsers);
      } catch (error) {
        showToast(` You do not have Admin priveleges `, 'error');
      }
    };

    fetchUsers();
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
    </div>
  );
};

export default AdminPanel;
