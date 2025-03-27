import { useEffect, useState } from "react";
import { getAnomalies } from "../api";

export default function AnomalyTable() {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const timeRange = {
        start: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      };

      try {
        const res = await getAnomalies(timeRange.start, timeRange.end);
        const newData = res.data.data;

        const sorted = newData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const latest = sorted.slice(0, 5);

        setAnomalies(latest);
      } catch (err) {
        console.error("Anomaly fetch error:", err);
      }
    };

    fetch();
    const interval = setInterval(fetch, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">🚨 Recent Anomalies (Top 5)</h2>

      {anomalies.length === 0 ? (
        <p className="text-green-600">No anomalies found 🎉</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-2">Timestamp</th>
              <th className="text-left p-2">Subsystem</th>
              <th className="text-left p-2">Anomaly Fields</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.map((a) => (
              <tr key={a.timestamp} className="border-t">
                <td className="p-2">{a.timestamp}</td>
                <td className="p-2">{a.subsystem_id}</td>
                <td className="p-2 text-red-600">{a.anomaly.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
