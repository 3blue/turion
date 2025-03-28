import { useEffect, useState } from "react";
import CurrentTelemetry from "./components/CurrentTelemetry";
import StatsSummary from "./components/StatsSummary";
import AnomalyTable from "./components/AnomalyTable";
import HistoricalChart from "./components/HistoricalChart";
import { Toaster } from 'sonner';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <div style={{ padding: "1rem 1rem 1.5rem 1rem" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          🌙 Dark Mode
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>
      </div>

      <Toaster position="bottom-right" richColors limit={1} />

      <main
        style={{ paddingBottom: "11rem" }}
        className="min-h-screen p-6 pb-24 bg-gray-100 dark:bg-gray-900 font-mono text-gray-800 dark:text-gray-100"
      >
        <h1 className="text-3xl font-bold mb-6">🛰️ Telemetry Dashboard</h1>

        <section className="mb-6">
          <CurrentTelemetry />
        </section>

        <section className="mb-6">
          <StatsSummary />
        </section>

        <section>
          <AnomalyTable />
        </section>

        <section>
          <HistoricalChart />
        </section>
      </main>
    </>
  );
}

export default App;
