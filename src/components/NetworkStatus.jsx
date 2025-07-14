import { useEffect, useState } from 'react';

const NetworkStatus = () => {
  const [connection, setConnection] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      setConnection({
        type: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
      });
    } else {
      setIsSupported(false);
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">📡 Network Info</h2>
      {connection ? (
        <ul>
          <li>Type: {connection.type}</li>
          <li>Downlink: {connection.downlink} Mbps</li>
          <li>RTT: {connection.rtt} ms</li>
        </ul>
      ) : isSupported ? (
        <p>Network info not available.</p>
      ) : (
        <p>Your browser does not support the Network Information API.</p>
      )}
    </div>
  );
};

export default NetworkStatus; 