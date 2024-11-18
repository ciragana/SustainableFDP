

import React, { useState } from 'react';
import { login } from '../api/authService';
import { Link } from 'react-router-dom';
import { showToast } from '../utils/toastNotifications';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Checkbox, Label, TextInput } from 'flowbite-react';

const LoginForm = () => {

const [credentials, setCredentials] = useState({ email: '', password: '' });
const navigate = useNavigate();

const handleChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials, navigate);
      showToast('Login successful!', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 3000); // Delay of 3 seconds
    } catch (error) {
      showToast(`Login failed: ${error.message}`, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-700">
      <Card className="max-w-md w-full">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" value="Your email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" value="Your password" />
            <TextInput
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
              Lost Password?
            </a>
          </div>
          <Button type="submit" className="w-full">
            Log in to your account
          </Button>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <Link to="/signup" className="text-cyan-700 hover:underline dark:text-cyan-500">
              Create account
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};


export default LoginForm;
