import CurrentTelemetry from "./components/CurrentTelemetry";
import StatsSummary from "./components/StatsSummary";
import AnomalyTable from "./components/AnomalyTable";
import HistoricalChart from "./components/HistoricalChart";
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors limit={1} />
      <main style={{ paddingBottom: '11rem' }} className="min-h-screen p-6 bg-gray-100 font-mono">
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
