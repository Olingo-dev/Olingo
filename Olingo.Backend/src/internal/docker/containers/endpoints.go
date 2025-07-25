package containers

import (
	"fmt"
	"net/http"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/api/types/registry"
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
		/*
			{
				name: "",
				image: ""
				ports [],
			}
		*/
		// Deserialize body
		type Body struct {
			Name  string `json:"name"`
			Image string `json:"image"`
		}
		var body Body
		status := pkg.DeserializeBody(&body, ctx)
		if status != nil {
			ctx.Status(*status)
		}
		// Is the image of a valid format? Introduce pipeline now? Regex validation?
		// - image:tag (Any other formats? - Find edge case)
		// - Docker registry check? Hub? Self configurated ?
		// -> Efficient way to check ?
		// -> Check before submitting container creation ? frontend api call.... For now include here...
		imageFilter := filters.NewArgs()
		imageFilter.Add(docker.DockerFilterAttributes.Image.Reference, body.Image)
		// Hub search
		hubImages, err := cli.ImageSearch(ctx, body.Image, registry.SearchOptions{
			Filters: imageFilter,
		})
		if err != nil {
			return
		}
		// Pull local imagelist. If image is not in said list? Do we pull it?
		localImages, err := cli.ImageList(ctx, image.ListOptions{
			Filters: imageFilter,
		})
		if err != nil {
			return
		}
		if len(hubImages) <= 0 || len(localImages) <= 0 {
			reader, err := cli.ImagePull(ctx, body.Image, image.PullOptions{})
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, err)
				return
			}
			defer reader.Close()
		}
		// Basic setup for creating a minimaly configured container.
		container, err := cli.ContainerCreate(ctx, &container.Config{
			Labels: docker.GenerateLabels("123"),
			Image:  body.Image,
		}, &container.HostConfig{}, &network.NetworkingConfig{}, &v1.Platform{}, body.Name)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusCreated, container)
	})
	router.DELETE("/containers/:id", func(ctx *gin.Context) {
		id := ctx.Param("id")
		switch rm := ctx.Query("mode"); rm {
		case "force":
			err := cli.ContainerRemove(ctx, id, container.RemoveOptions{
				Force: true,
			})
			if err != nil {
				fmt.Println(err)
				ctx.JSON(http.StatusInternalServerError, "Failed to remove container")
			}
			ctx.Status(http.StatusOK)
		default:
			err := cli.ContainerStop(ctx, id, container.StopOptions{})
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, "Failed to stop the container")
			}
			err = cli.ContainerRemove(ctx, id, container.RemoveOptions{})
			if err != nil {
				fmt.Println(err)
				ctx.JSON(http.StatusInternalServerError, "Failed to remove the container")
			}
			ctx.Status(http.StatusOK)
		}
	})
}
