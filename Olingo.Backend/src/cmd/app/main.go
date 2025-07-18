package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
	"github.com/olingo-dev/olingo/config"
	"github.com/olingo-dev/olingo/internal/docker/containers"
	"github.com/olingo-dev/olingo/internal/notifications"
)

var ASCIIART = `
________  .__  .__                       
\_____  \ |  | |__| ____    ____   ____  
 /   |   \|  | |  |/    \  / ___\ /  _ \ 
/    |    \  |_|  |   |  \/ /_/  >  <_> )
\_______  /____/__|___|  /\___  / \____/ 
        \/             \//_____/         
`

func main() {
	fmt.Println(ASCIIART)
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		log.Fatalf("Failed to connect to client: %v", err)
	}
	defer os.Exit(1)
	ctx := context.Background()
	cli.NegotiateAPIVersion(ctx)
	ping, err := cli.Ping(ctx)
	if err != nil {
		log.Fatalf("Failed to ping client: %v", err)
	}
	defer os.Exit(1)

	version := os.Getenv(config.Environment.Version)
	fmt.Fprintln(os.Stdout, "Olingo version:", version)
	fmt.Fprintln(os.Stdout, "Docker API version:", ping.APIVersion)
	fmt.Fprintln(os.Stdout, "Docker build version:", ping.BuilderVersion)

	// Endpoints
	router := gin.Default()
	notifications.Endpoints(router, cli)
	containers.Endpoints(router, cli)
	router.Run()
}
