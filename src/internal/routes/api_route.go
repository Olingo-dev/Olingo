package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nidrux/olingo/internal/config"
	"github.com/nidrux/olingo/pkg/registry"
)

const BASE_PATH string = "/api"

func ApiRoutes() {
	api := config.GetWebServer().Group(BASE_PATH)
	api.Get("/version", func(context *fiber.Ctx) error {
		return context.JSON(fiber.Map{"version": registry.GetRegistry().Get("version").(string)})
	})
	api.Get("/networks", func(context *fiber.Ctx) error {
		return context.Status(200).JSON(fiber.Map{"message": "Hello world"})
	})
	api.Get("/networks/:id", func(context *fiber.Ctx) error {
		return context.Status(200).JSON(fiber.Map{"message": "Hello world"})
	})
	api.Post("/networks", func(context *fiber.Ctx) error {
		return context.Status(200).JSON(fiber.Map{"message": "Hello world"})
	})
}
