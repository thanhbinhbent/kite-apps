import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Copyright */}
        <p className="text-gray-700 text-sm">
          © 2025 KiteApps. All rights reserved.
        </p>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-black transition">
            Privacy
          </a>
          <a href="#" className="text-gray-700 hover:text-black transition">
            Terms
          </a>
          <a href="#" className="text-gray-700 hover:text-black transition">
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
