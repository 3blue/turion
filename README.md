This repository is a submission for Turion Space. It implements a software solution to the project outlined in Instructions.md.

**Installation instructions**
1. Download the free software [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Install [WSL for Windows](https://learn.microsoft.com/en-us/windows/wsl/install) and activate in a terminal window.
3. [Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to a new folder inside WSL.
4. From the base directory you created, run the command `docker-compose up --build` to launch the service.
5. Access [http://localhost:5173] to view the telemetry dashboard!

**Frontend-Focused Optional Requirements**
 - Error handling: Implement basic error handling and loading states. ✅ (UI components display a loading message when telemetry is yet to arrive, and basic error handling is implemented with `toast.error` inside frontend/src/components/CurrentTelemetry.jsx)
 - Responsive design: Ensure the dashboard works on desktop and mobile. ✅ (Tested using Chrome DevTools iPhone emulator)
 - User experience: Add features like search/filter for telemetry data, dark mode, or theming. ✅ (Satisfied by addition of dark mode checkbox at top of dashboard)
 - Telemetry visualization: Include charts for telemetry metrics (embedded Grafana is acceptable). ✅ (Satisfied by multiline telemetry graph implemented using `recharts`. The graph updates its display every 10 seconds.)

**Bonus Points**
Docker Compose: Provide a working Docker Compose file for local development with all dependencies (frontend, backend, database, observability tools). ✅
Comprehensive tests: Include unit tests, integration tests, and end-to-end tests. ❌
Performance testing results: Provide evidence of load testing or benchmarking (e.g., using tools like JMeter, k6, or Locust). ❌

*Other notes*
Secrets for the database connection are stored in plain text for the sake of simplicity, but best practice would be to connect to something like the AWS Secrets Manager and pull them by key.
