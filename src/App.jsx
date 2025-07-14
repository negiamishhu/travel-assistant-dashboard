import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import LocationInfo from './components/LocationInfo';
import NetworkStatus from './components/NetworkStatus';
import LazyImage from './components/LazyImage';

const attractions = [
  { id: 1, name: 'Attraction 1', desc: 'A beautiful place to visit and explore.', icon: '🏞️' },
  { id: 2, name: 'Attraction 2', desc: 'A must-see spot for travelers.', icon: '🌅' },
  { id: 3, name: 'Attraction 3', desc: 'A hidden gem in the city.', icon: '🏰' },
];

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomePage onGetStarted={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col">
      <header className="w-full py-8 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow">🌐 Smart Travel Assistant</h1>
          <p className="text-lg text-blue-100 font-medium">Find attractions, monitor your network, and travel smarter!</p>
        </div>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <LocationInfo />
          <NetworkStatus />
        </div>
        <section className="bg-gradient-to-br from-blue-100 via-white to-indigo-50 rounded-3xl shadow-inner p-6 md:p-10 mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            <span role="img" aria-label="attractions">📍</span> Nearby Attractions
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {attractions.map((attr, i) => (
              <div
                key={attr.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-200 hover:ring-4 hover:ring-blue-300 hover:scale-105 transition-transform duration-200 relative group"
              >
                <div className="absolute top-3 left-3 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-lg font-bold shadow group-hover:bg-blue-200 transition">
                  {attr.icon}
                </div>
                <LazyImage src={`https://picsum.photos/300/200?random=${i + 1}`} alt={attr.name} />
                <div className="p-4 pt-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1 flex items-center gap-2">
                    {attr.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{attr.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full py-4 mt-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Smart Travel Assistant — “Travel far, travel wide, travel smart.”
      </footer>
    </div>
  );
};

export default App;
