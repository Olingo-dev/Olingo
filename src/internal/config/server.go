package config

import (
	"sync"

	"github.com/gofiber/fiber/v2"
	"github.com/nidrux/olingo/pkg/registry"
)

var (
	app     *fiber.App
	appOnce sync.Once
)

func GetApp() *fiber.App {
	appOnce.Do(func() {
		app = fiber.New()
	})
	return app
}

func InitWebServer() {
	app := fiber.New()
	registry.GetRegistry().Register("webserver", app)
}

func GetWebServer() *fiber.App {
	return registry.GetRegistry().Get("webserver").(*fiber.App)
}
