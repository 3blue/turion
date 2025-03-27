import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCurrentTelemetry = () =>
  API.get("/telemetry/current");

export const getTelemetryRange = (start, end) =>
  API.get("/telemetry", {
    params: { start_time: start, end_time: end },
  });

export const getAnomalies = (start, end) =>
  API.get("/telemetry/anomalies", {
    params: { start_time: start, end_time: end },
  });

export const getStats = (start, end, agg = "avg") =>
  API.get("/telemetry/stats", {
    params: { start_time: start, end_time: end, agg },
  });
