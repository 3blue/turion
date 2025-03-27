// File: packet.go
package main

type CCSDSPrimaryHeader struct {
	PacketID      uint16
	PacketSeqCtrl uint16
	PacketLength  uint16
}

type CCSDSSecondaryHeader struct {
	Timestamp   uint64
	SubsystemID uint16
}

type TelemetryPayload struct {
	Temperature float32
	Battery     float32
	Altitude    float32
	Signal      float32
}
