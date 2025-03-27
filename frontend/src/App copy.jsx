import { useEffect, useState } from "react";
import { getCurrentTelemetry } from "./api";

function App() {
  const [telemetry, setTelemetry] = useState(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await getCurrentTelemetry();
        console.log("Fetched telemetry:", res.data); // <— add this
        setTelemetry(res.data.data);
      } catch (err) {
        console.error("Error fetching telemetry:", err);
      }
    };

    // fetch immediately
    fetchTelemetry();

    // fetch every 2 seconds
    const interval = setInterval(fetchTelemetry, 2000);

    // cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 font-mono">
      <h1 className="text-2xl font-bold mb-4">🛰️ Current Telemetry</h1>
      {telemetry ? (
        <div className="space-y-2">
          <p><strong>Time:</strong> {telemetry.timestamp}</p>
          <p><strong>Temperature:</strong> {telemetry.temperature} °C</p>
          <p><strong>Battery:</strong> {telemetry.battery} %</p>
          <p><strong>Altitude:</strong> {telemetry.altitude} km</p>
          <p><strong>Signal:</strong> {telemetry.signal} dB</p>
          <p><strong>Anomaly:</strong> {telemetry.anomaly.join(", ")}</p>
        </div>
      ) : (
        <p>Loading telemetry...</p>
      )}
    </div>
  );
}

export default App;

