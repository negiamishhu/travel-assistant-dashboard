import React from "react";

function WelcomePage({ onGetStarted }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-8">
      <div className="bg-white/90 rounded-3xl shadow-xl p-16 flex flex-col items-center max-w-lg w-full">
        <h1 className="text-4xl  font-extrabold text-blue-800 mb-4 text-center drop-shadow">Welcome to Quick Note & Sketch Board</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">Store your ideas and notes at one place</p>
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all focus:outline-none"
          onClick={onGetStarted}
        >
          Get Started Today
        </button>
      </div>
    </div>
  );
}

export default WelcomePage; 