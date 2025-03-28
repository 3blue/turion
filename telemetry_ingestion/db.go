// File: db.go
package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/lib/pq"
)

var db *sql.DB

func initDB() {
	// Use DB_URL env var if set, otherwise default to localhost
	connStr := os.Getenv("DB_URL")
	if connStr == "" {
		connStr = "postgres://telemetry:secret123@localhost:5432/telemetrydb?sslmode=disable"
	}
	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatalf("Database unreachable: %v", err)
	}
	fmt.Println("Connected to TimescaleDB")
}

func processTelemetry(header CCSDSSecondaryHeader, payload TelemetryPayload) {
	var anomalies []string

	if payload.Temperature < 20.0 || payload.Temperature > 30.0 {
		if payload.Temperature > 35.0 {
			anomalies = append(anomalies, "temperature")
		}
	}
	if payload.Battery < 70.0 || payload.Battery > 100.0 {
		if payload.Battery < 40.0 {
			anomalies = append(anomalies, "battery")
		}
	}
	if payload.Altitude < 500.0 || payload.Altitude > 550.0 {
		if payload.Altitude < 400.0 {
			anomalies = append(anomalies, "altitude")
		}
	}
	if payload.Signal < -60.0 || payload.Signal > -40.0 {
		if payload.Signal < -80.0 {
			anomalies = append(anomalies, "signal")
		}
	}

	if len(anomalies) == 0 {
		anomalies = []string{"nominal"}
	}

	timestamp := time.Unix(int64(header.Timestamp), 0)

	_, err := db.Exec(`
		INSERT INTO telemetry (
			timestamp, subsystem_id, temperature, battery, altitude, signal, anomaly
		) VALUES ($1, $2, $3, $4, $5, $6, $7)
	`, timestamp, header.SubsystemID, payload.Temperature, payload.Battery,
		payload.Altitude, payload.Signal, pq.Array(anomalies))

	if err != nil {
		log.Printf("Failed to insert telemetry: %v", err)
		return
	}

	if len(anomalies) == 1 && anomalies[0] == "nominal" {
		log.Println("Normal telemetry saved to DB")
	} else {
		log.Printf("Anomalous telemetry saved with issues: %v\n", anomalies)
	}
}
