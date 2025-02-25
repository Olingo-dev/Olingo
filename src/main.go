package main

import (
	"embed"
	"fmt"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/nidrux/olingo/internal/config"
	"github.com/nidrux/olingo/internal/database"
	"github.com/nidrux/olingo/internal/routes"
	"github.com/nidrux/olingo/pkg/registry"
)

//go:embed web/build/*
var embeddedFiles embed.FS

var commitHash string

func main() {

	// config.InitConfig()
	config.InitWebServer()

	registry.GetRegistry().Register("version", commitHash)

	app := config.GetWebServer()
	// cfg := config.GetConfig()

	database.InitDatabase()

	app.Use(logger.New())
	app.Use(requestid.New())
	app.Use(logger.New(logger.Config{
		Format: "${pid} ${locals:requestid} ${status} - ${method} ${path}​\n",
	}))

	// First init the api routes. every other route will fallback to the react dist
	routes.ApiRoutes()
	env := os.Getenv("DEVCONTAINER")
	if env == "true" {
		log.Info("Running in development mode: Serving from local filesystem")
		app.Static("/", "../web/build") // Serve from local folder

		app.Get("/*", func(c *fiber.Ctx) error {
			return c.SendFile("web/build/index.html")
		})
	} else {
		log.Info("Running in production mode: Serving embedded files")
		app.Use("/", filesystem.New(filesystem.Config{
			Root:       http.FS(embeddedFiles),
			PathPrefix: "web/build",
			Browse:     false,
		}))
		app.Get("/*", func(c *fiber.Ctx) error {
			file, err := embeddedFiles.ReadFile("web/build/index.html")
			if err != nil {
				return fiber.ErrNotFound
			}
			return c.Type("html").Send(file)
		})
	}

	log.Fatal(app.Listen(fmt.Sprintf(":%d", 8080)))
}
