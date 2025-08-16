package group

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/olingo-dev/olingo/internal/database"
)

func Endpoints(router *gin.Engine) {
	GroupRepository := database.GroupRepository
	router.GET("/groups", func(ctx *gin.Context) {
		groups, err := GroupRepository.List()
		if err != nil {
			ctx.Status(http.StatusFailedDependency)
		}
		ctx.JSON(http.StatusAccepted, groups)
	})
}
