import React, { useEffect, useState } from 'react';
import { Button, MegaMenu, Navbar } from 'flowbite-react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

function Menubar({ logo }) {
  const [role, setRole] = useState(null);
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <>
      <MegaMenu>
        <div className="w-full flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
          <Navbar.Brand href="/">
            <img alt="" src={logo} className="mr-3 h-6 sm:h-9" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              SustainableFDP
            </span>
          </Navbar.Brand>
          <div className="order-2 flex items-center md:order-2 md:flex">
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
                >
                  Signup
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <span className="mr-4 text-sm font-medium text-gray-800 dark:text-white">
                  {role}
                </span>
                <Button
                  onClick={handleLogout}
                  className="mr-1 rounded-lg px-2 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 md:mr-2 md:px-3 md:py-1"
                >
                  Logout
                </Button>
              </>
            )}

            <div className="mx-3">
              <Flowbite>
                <DarkThemeToggle />
              </Flowbite>
            </div>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <>
              <Link
                className="mr-1 rounded-lg py-2 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-700 dark:hover:text-gray-400"
                to="/my-donations"
              >
                My Claims
              </Link>
              <Link
                className="mr-1 rounded-lg py-2 text-sm font-medium text-gray-800 focus:outline-none dark:text-white hover:text-blue-700 dark:hover:text-gray-400"
                to="/donate"
              >
                Donate
              </Link>
              <Link
                className="mr-1 rounded-lg py-2 text-sm font-medium text-gray-800 focus:outline-none dark:text-white hover:text-blue-700 dark:hover:text-gray-400"
                to="/admin"
              >
                Admin
              </Link>
            </>
          </Navbar.Collapse>
        </div>
      </MegaMenu>
    </>
  );
}

export default Menubar;
