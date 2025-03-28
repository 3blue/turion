# Telemetry Generator (Go)
FROM golang:1.24

WORKDIR /app
COPY . .

RUN go mod init telemetry_generation && \
    go mod tidy

CMD ["go", "run", "generate.go"]
