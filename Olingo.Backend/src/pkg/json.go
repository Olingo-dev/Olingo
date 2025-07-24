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

type ContainerCallersStruct struct {
	Create string
	Start  string
	Stop   string
	Remove string
	List   string
}

type ImageCallersStruct struct {
	Create string
	Delete string
	Pull   string
}
type ErrorResponseCallersStruct struct {
	Container ContainerCallersStruct
	Image     ImageCallersStruct
}

var ErrorResponseCaller = ErrorResponseCallersStruct{
	Container: ContainerCallersStruct{
		Create: "Container.Create",
		Remove: "Container.Remove",
		Start:  "Container.Start",
		Stop:   "Container.Stop",
		List:   "Container.List",
	},
	Image: ImageCallersStruct{
		Create: "Image.Create",
		Delete: "Image.Delete",
		Pull:   "Image.Pull",
	},
}

func ErrorResponse(err error, caller string) gin.H {
	return gin.H{"error": err.Error(), "caller": caller}
}
