import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Label, TextInput, Textarea } from 'flowbite-react';
import { createDonation } from '../api/donationService';
import { showToast } from '../utils/toastNotifications';

const DonateForm = () => {
  const [formData, setFormData] = useState({ itemName: '', description: '', quantity: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDonation(formData);
      showToast('Donation created successfully!', 'success');
      navigate('/dashboard'); // Redirect after success
    } catch (error) {
      showToast(`Failed to create donation: ${error.message}`, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="max-w-md w-full bg-white dark:bg-gray-800">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Create a Donation
        </h5>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="itemName" value="ItemName" />
            <TextInput
              id="itemName"
              name="itemName"
              type="text"
              placeholder="Donation Title"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="description" value="Description" />
            <Textarea
              id="description"
              name="description"
              placeholder="Donation Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="quantity" value="Amount" />
            <TextInput
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Donation Amount/Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Donation
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DonateForm;
