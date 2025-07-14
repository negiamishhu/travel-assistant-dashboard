import React from 'react';

const WelcomePage = ({ onGetStarted }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-8">
    <div className="bg-white/90 rounded-3xl shadow-xl p-10 flex flex-col items-center max-w-lg w-full">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center drop-shadow">Welcome to Smart Travel Assistant</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">Find nearby attractions, monitor your network, and travel smarter!</p>
      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all focus:outline-none"
        onClick={onGetStarted}
      >
        Get Started
      </button>
    </div>
  </div>
);

export default WelcomePage; 