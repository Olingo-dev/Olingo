package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nidrux/olingo/internal/config"
	"github.com/nidrux/olingo/pkg/registry"
)

func EventsRoutes() {
	events := config.GetWebServer().Group("/events")
	events.Get("/version", func(context *fiber.Ctx) error {
		return context.JSON(fiber.Map{"version": registry.GetRegistry().Get("version").(string)})
	})

	events.Get("/containers", func(context *fiber.Ctx) error {
		return context.JSON(fiber.Map{"version": registry.GetRegistry().Get("version").(string)})
	})
}
