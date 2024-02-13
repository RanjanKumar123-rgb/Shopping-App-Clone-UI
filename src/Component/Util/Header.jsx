import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-300 text-black">
      <nav className="container mx-auto flex flex-col lg:flex-row py-5 lg:space-x-10 justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/Pics/amazon.png" alt="Logo" className="h-12" />
        </Link>

        {/* SEARCH BAR */}
        <div className="flex mt-4 lg:mt-0">
          <input
            type="text"
            placeholder="Search anything here"
            className="border-2 w-full lg:w-80 border-gray-600 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-yellow-500 text-white rounded-md ml-2 px-4 py-1 hover:bg-yellow-600 transition-colors duration-300">
            Search
          </button>
        </div>


        {/* INPUT BLOCK */}
        <div className="flex mt-4 lg:mt-0 space-x-6">
          {/* Signup */}
          <Link to={'/'} className="hover:underline">Sign up</Link>

          {/* Login */}
          <Link to={'/'} className="hover:underline">Login</Link>

          {/* Become a seller */}
          <Link to={'/'} className="hover:underline">Become a seller</Link>

          {/* Cart */}
          <Link to={'/'} className="hover:underline">Cart</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
