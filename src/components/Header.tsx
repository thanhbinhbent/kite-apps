import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-gray-900">KiteApps</h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-black transition">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-black transition">
            Features
          </a>
          <a href="#" className="text-gray-700 hover:text-black transition">
            Pricing
          </a>
          <a href="#" className="text-gray-700 hover:text-black transition">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 hover:text-black">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
