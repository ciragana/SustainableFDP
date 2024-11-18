import React, { useState } from 'react';
import { signup } from '../api/authService';
import { Link } from 'react-router-dom';
import { showToast } from '../utils/toastNotifications';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Label, TextInput, Select } from 'flowbite-react';

const SignupForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert role to a number before sending the data
      const dataToSend = { ...formData, role: Number(formData.role) };
      await signup(dataToSend);
      showToast('Signup successful! Redirecting to login...', 'success');
      navigate('/login'); // Redirect after success
    } catch (error) {
      showToast(`Signup failed: ${error.message}`, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="max-w-md w-full bg-white dark:bg-gray-800">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Create an account
        </h5>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" value="Your username" />
            <TextInput
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="email" value="Your email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="password" value="Your password" />
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="role" value="Register as" />
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled>Select user type</option>
              <option value="1">Donor</option>
              <option value="2">User</option>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?&nbsp;
            <Link to="/login" className="text-cyan-700 hover:underline dark:text-cyan-500">
              Log in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
