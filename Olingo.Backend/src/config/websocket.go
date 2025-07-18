package config

import (
	"net/http"

	"github.com/gorilla/websocket"
)

var DockerEventWebsocketUpgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}
