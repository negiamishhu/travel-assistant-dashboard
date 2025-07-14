import { useEffect, useState } from 'react';

const LocationInfo = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      },
      (err) => alert('Location access denied!')
    );
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">📍 Your Location</h2>
      <p className="text-sm text-blue-600 mb-2">Using Geolocation API</p>
      {location ? (
        <p>Lat: {location.latitude}, Lng: {location.longitude}</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationInfo; 