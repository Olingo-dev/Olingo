package notifications

import (
	"fmt"
	"io"
	"log"
	"os"

	"github.com/docker/docker/api/types/events"
	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
	"github.com/olingo-dev/olingo/config"
	"github.com/olingo-dev/olingo/internal/docker"
)

func Endpoints(router *gin.Engine, cli *client.Client) {
	router.GET("/notifications", func(ctx *gin.Context) {
		eventOptions := events.ListOptions{}
		eventsChannel, errChannel := cli.Events(ctx, eventOptions)

		conn, err := config.DockerEventWebsocketUpgrader.Upgrade(ctx.Writer, ctx.Request, nil)

		if err != nil {
			log.Fatalf("Failed to upgrade connection to websocket: %v", err)
			return
		}
		defer conn.Close()
		ctx.Stream(func(w io.Writer) bool {
			for {
				select {
				case event := <-eventsChannel:
					docker.PrintDockerEvent(&event)
					conn.WriteJSON(docker.DockerEvent{
						Id:        event.Actor.ID,
						Type:      string(event.Type),
						Action:    string(event.Action),
						Timestamp: event.Time,
						Name:      string(event.Actor.Attributes[docker.DockerAttributes.Name]),
						Image:     string(event.Actor.Attributes[docker.DockerAttributes.Image]),
					})
				case err := <-errChannel:
					fmt.Fprintln(os.Stdout, "Error recieving docker event: ", err)
					return false
				}
			}
		})
	})
}
