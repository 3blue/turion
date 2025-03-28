FROM golang:1.24

WORKDIR /app

# Copy only go.mod and go.sum first to leverage Docker caching
COPY go.mod go.sum ./
RUN go mod download

# Now copy the rest of the source code
COPY . .

RUN go mod tidy

CMD ["go", "run", "."]
