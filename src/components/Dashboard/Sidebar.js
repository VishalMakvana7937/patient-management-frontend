import React, { useState } from "react";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Track sidebar visibility

  const toggleBillingMenu = () => {
    setIsBillingOpen(!isBillingOpen);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`h-screen bg-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ width: '266px', height: '100vh', overflow: 'hidden' }}
      >
        <button
          className="absolute text-gray-600 md:hidden top-4 left-4"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <span className="material-icons">close</span>
          ) : (
            <span className="material-icons">menu</span>
          )}
        </button>

        {/* Logo and Tagline */}
        <div className="flex flex-col items-center py-6">
          <img src={require('../images/logo.png')} alt="Logo" className="auto" />
        </div>

        {/* Menu Items */}
        <nav className="mt-3">
          <ul className="p-0">
            <Link to='/dashboard' className='text-gray-500 text-decoration-none'>
              <li className="flex items-center py-3 pl-8 space-x-4 text-gray-600 transition-all duration-300 cursor-pointer hover:bg-blue-100 hover:text-blue-500 ps-4">
                <span className="material-icons">grid_view</span>
                <span>Dashboard</span>
              </li>
            </Link>

            <Link to='/doctormanagement' className='text-gray-500 text-decoration-none'>
              <li className="flex items-center py-3 pl-8 space-x-4 text-gray-600 transition-all duration-300 cursor-pointer hover:bg-blue-100 hover:text-blue-500 ps-4">
                <span className="material-icons">person</span>
                <span>Doctor Management</span>
              </li>
            </Link>

            <Link to='/patientdashboard' className='text-gray-500 text-decoration-none hover:text-blue-500'>
              <li className="flex items-center py-3 pl-8 space-x-4 text-gray-600 transition-all duration-300 cursor-pointer hover:bg-blue-100 hover:text-blue-500 ps-4">
                <span className="material-icons">people</span>
                <span>Patient Management</span>
              </li>
            </Link>

            {/* Billing and Payments with dropdown */}
            <li>
              <div
                className="flex items-center justify-between py-3 pl-8 pr-4 text-gray-600 transition-all duration-300 cursor-pointer hover:bg-blue-100 hover:text-blue-500 ps-4"
                onClick={toggleBillingMenu}
              >
                <div className="flex items-center space-x-4">
                  <span className="material-icons">account_balance_wallet</span>
                  <span>Billing And Payments</span>
                </div>
                <span className="material-icons">
                  {isBillingOpen ? "expand_less" : "expand_more"}
                </span>
              </div>

              {/* Dropdown Menu */}
              {isBillingOpen && (
                <ul className="mt-1 ml-4 space-y-1 text-sm text-gray-400">
                  <Link to='/monitorbilling' className='text-gray-500 text-decoration-none'>
                    <li className="flex items-center pl-4 space-x-2 cursor-pointer hover:text-blue-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                      <span>Monitor Billing</span>
                    </li>
                  </Link>
                  <Link to='/insuranceclaims' className='text-gray-500 text-decoration-none'>
                    <li className="flex items-center py-3 pl-4 space-x-2 cursor-pointer hover:text-blue-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                      <span>Insurance Claims</span>
                    </li>
                  </Link>
                  <Link to='/paymentprocess' className='text-gray-500 text-decoration-none'>
                    <li className="flex items-center pl-4 space-x-2 text-gray-400 cursor-pointer hover:text-blue-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                      <span>Payment Process</span>
                    </li>
                  </Link>
                </ul>
              )}
            </li>

            <Link to='/reportingandanalytics' className='text-gray-500 text-decoration-none'>
              <li className="flex items-center py-3 pl-8 space-x-4 text-gray-600 transition-all duration-300 cursor-pointer hover:bg-blue-100 hover:text-blue-500 ps-4">
                <span className="material-icons">bar_chart</span>
                <span>Reporting And Analytics</span>
              </li>
            </Link>
          </ul>

          {/* Logout Button */}
          <div className="absolute bottom-0 w-full">
            <Link to='/' className="text-red-500 text-decoration-none">
              <button className="flex items-center justify-start w-full py-3 space-x-2 font-bold text-red-500 transition-all duration-300 bg-red-50 hover:bg-red-100 ps-4">
                <IoLogIn className="fs-4" />
                <span>Logout</span>
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
