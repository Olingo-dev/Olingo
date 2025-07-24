package containers

import (
	"io"
	"net/http"
	"os"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
	"github.com/olingo-dev/olingo/internal/docker"
	"github.com/olingo-dev/olingo/pkg"
	v1 "github.com/opencontainers/image-spec/specs-go/v1"
)

func Endpoints(router *gin.Engine, cli *client.Client) {
	router.GET("/containers", func(ctx *gin.Context) {
		containers, err := cli.ContainerList(ctx, container.ListOptions{})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, pkg.ErrorResponse(err, pkg.ErrorResponseCaller.Container.List))
			return
		}
		mappedContainers := make([]docker.DockerContainer, len(containers))
		for index, container := range containers {
			mappedContainers[index] = docker.DockerContainer{
				Id:        container.ID,
				Name:      container.Names[0],
				CreatedAt: container.Created,
				Ports:     container.Ports,
				Image:     container.Image,
			}
		}
		ctx.JSON(http.StatusAccepted, mappedContainers)
	})
	router.POST("/containers", func(ctx *gin.Context) {
		type Body struct {
			Name  string `json:"name"`
			Image string `json:"image"`
		}
		var body Body
		status := pkg.DeserializeBody(&body, ctx)
		if status != nil {
			ctx.Status(*status)
		}
		out, err := cli.ImagePull(ctx, body.Image, image.PullOptions{})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, pkg.ErrorResponse(err, pkg.ErrorResponseCaller.Image.Pull))
			return
		}
		defer out.Close()
		io.Copy(os.Stdout, out) // Await iamge pull if there.
		createdContainer, err := cli.ContainerCreate(ctx, &container.Config{
			Labels: docker.GenerateLabels("123"),
			Image:  body.Image,
		}, &container.HostConfig{}, &network.NetworkingConfig{}, &v1.Platform{}, body.Name)
		if err != nil {
			ctx.Header("Retry-After", "120")
			ctx.JSON(http.StatusInternalServerError, pkg.ErrorResponse(err, pkg.ErrorResponseCaller.Container.Create))
			return
		}
		if err := cli.ContainerStart(ctx, createdContainer.ID, container.StartOptions{}); err != nil {
			ctx.Header("Retry-After", "120")
			ctx.JSON(http.StatusInternalServerError, pkg.ErrorResponse(err, pkg.ErrorResponseCaller.Container.Start))
		}
		ctx.JSON(http.StatusCreated, createdContainer)
	})
	router.DELETE("/containers/:id", func(ctx *gin.Context) {
		id := ctx.Param("id")
		switch rm := ctx.Query("mode"); rm {
		case "force":
			err := cli.ContainerRemove(ctx, id, container.RemoveOptions{
				Force: true,
			})
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, pkg.ErrorResponse(err, pkg.ErrorResponseCaller.Container.Remove))
			}
			ctx.Status(http.StatusOK)
		default:
			err := cli.ContainerStop(ctx, id, container.StopOptions{})
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, pkg.ErrorResponse(err, pkg.ErrorResponseCaller.Container.Stop))
			}
			err = cli.ContainerRemove(ctx, id, container.RemoveOptions{})
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, pkg.ErrorResponse(err, pkg.ErrorResponseCaller.Container.Remove))
			}
			ctx.Status(http.StatusOK)
		}
	})
}
