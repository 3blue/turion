// File: decoder.go
package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"log"
)

func decodePacket(data []byte) {
	buf := bytes.NewReader(data)

	var primary CCSDSPrimaryHeader
	var secondary CCSDSSecondaryHeader
	var payload TelemetryPayload

	// CCSDS uses big-endian format
	if err := binary.Read(buf, binary.BigEndian, &primary); err != nil {
		log.Printf("Failed to read primary header: %v", err)
		return
	}
	if err := binary.Read(buf, binary.BigEndian, &secondary); err != nil {
		log.Printf("Failed to read secondary header: %v", err)
		return
	}
	if err := binary.Read(buf, binary.BigEndian, &payload); err != nil {
		log.Printf("Failed to read payload: %v", err)
		return
	}

	fmt.Println("Decoded Telemetry Packet:")
	fmt.Printf("Timestamp:   %d\n", secondary.Timestamp)
	fmt.Printf("SubsystemID: %d\n", secondary.SubsystemID)
	fmt.Printf("Temperature: %.2f °C\n", payload.Temperature)
	fmt.Printf("Battery:     %.2f %%\n", payload.Battery)
	fmt.Printf("Altitude:    %.2f km\n", payload.Altitude)
	fmt.Printf("Signal:      %.2f dB\n", payload.Signal)
	fmt.Println()

	processTelemetry(secondary, payload)
}
