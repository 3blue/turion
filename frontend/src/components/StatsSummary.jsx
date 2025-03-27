import { useEffect, useState } from "react";
import { getStats } from "../api";

export default function StatsSummary() {
  const [stats, setStats] = useState(null);
  const [agg, setAgg] = useState("avg");

  useEffect(() => {
    const fetch = async () => {
      const timeRange = {
        start: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
        end: new Date().toISOString(),
      };
      try {
        const res = await getStats(timeRange.start, timeRange.end, agg);
        setStats(res.data.data);
      } catch (err) {
        console.error("Stats fetch error:", err);
      }
    };
  
    fetch();
    const interval = setInterval(fetch, 2000); // updates every 2 seconds
    return () => clearInterval(interval);
  }, [agg]);
  

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">📊 {agg.toUpperCase()} Stats (last 10 min)</h2>
        <select
          value={agg}
          onChange={(e) => setAgg(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="avg">Average</option>
          <option value="min">Minimum</option>
          <option value="max">Maximum</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div><strong>Temp:</strong> {stats.temperature?.toFixed(2)} °C</div>
        <div><strong>Battery:</strong> {stats.battery?.toFixed(2)} %</div>
        <div><strong>Altitude:</strong> {stats.altitude?.toFixed(2)} km</div>
        <div><strong>Signal:</strong> {stats.signal?.toFixed(2)} dB</div>
      </div>
    </div>
  );
}
