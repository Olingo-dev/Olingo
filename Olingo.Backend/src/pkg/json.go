package pkg

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func DeserializeBody[T any](body T, ctx *gin.Context) *int {
	decoder := json.NewDecoder(ctx.Request.Body)
	err := decoder.Decode(&body)
	if err != nil {
		status := http.StatusBadRequest
		return &status
	}
	return nil
}
