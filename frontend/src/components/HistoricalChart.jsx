import { useEffect, useState } from "react";
import { getTelemetryRange } from "../api";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

export default function HistoricalChart() {
  const [data, setData] = useState([]);

  const timeRange = {
    start: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // last 10 mins
    end: new Date().toISOString(),
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getTelemetryRange(timeRange.start, timeRange.end);
        const raw = res.data.data;

        // optional: convert timestamps to HH:MM:SS
        const formatted = raw.map((d) => ({
          ...d,
          timestamp: new Date(d.timestamp).toLocaleTimeString(),
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error loading telemetry range:", err);
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">📈 Historical Telemetry (last 10 minutes)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temp (°C)" />
          <Line type="monotone" dataKey="battery" stroke="#22c55e" name="Battery (%)" />
          <Line type="monotone" dataKey="altitude" stroke="#3b82f6" name="Altitude (km)" />
          <Line type="monotone" dataKey="signal" stroke="#6366f1" name="Signal (dB)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
