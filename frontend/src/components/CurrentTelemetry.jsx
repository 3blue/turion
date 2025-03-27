import { useEffect, useState, useRef } from "react";
import { getCurrentTelemetry } from "../api";

export default function CurrentTelemetry() {
  const [telemetry, setTelemetry] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCurrentTelemetry();
        setTelemetry(res.data.data);
      } catch (err) {
        console.error("Current telemetry error:", err);
      }
    };
  
    fetch();
    const interval = setInterval(fetch, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!telemetry) return <p>Loading telemetry...</p>;

  return (
    <div className="relative bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">📡 Current Telemetry</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div><strong>Time:</strong> {telemetry.timestamp}</div>
        <div><strong>Temperature:</strong> {telemetry.temperature} °C</div>
        <div><strong>Battery:</strong> {telemetry.battery} %</div>
        <div><strong>Altitude:</strong> {telemetry.altitude} km</div>
        <div><strong>Signal:</strong> {telemetry.signal} dB</div>
        <div><strong>Anomaly:</strong> {telemetry.anomaly.join(", ")}</div>
      </div>
    </div>
  );
}
