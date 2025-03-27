// File: main.go
package main

import (
	"fmt"
	"log"
	"net"
)

func main() {
	initDB()
	// Set up UDP server on port 8089
	addr := net.UDPAddr{
		Port: 8089,
		IP:   net.ParseIP("0.0.0.0"), // Listen on all interfaces
	}

	conn, err := net.ListenUDP("udp", &addr)
	if err != nil {
		log.Fatalf("Failed to bind to UDP port: %v", err)
	}
	defer conn.Close()

	fmt.Println("Listening for telemetry on UDP :8089...")

	// Loop forever to read packets
	for {
		buf := make([]byte, 1024) // Adjust size as needed
		n, remoteAddr, err := conn.ReadFromUDP(buf)
		if err != nil {
			log.Printf("Error reading UDP packet: %v", err)
			continue
		}

		fmt.Printf("Received %d bytes from %s\n", n, remoteAddr)
		decodePacket(buf[:n])
	}
}