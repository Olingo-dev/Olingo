package internal

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nidrux/olingo/internal/config"
	"github.com/nidrux/olingo/internal/models"
	"github.com/nidrux/olingo/pkg/pipeline"
	"github.com/nidrux/olingo/pkg/registry"
	"github.com/nidrux/olingo/pkg/util"
)

const BASE_PATH string = "/api"

func ApiRoutes() {
	api := config.GetWebServer().Group(BASE_PATH)
	// CONFIG
	api.Get("/version", func(context *fiber.Ctx) error {
		return context.JSON(fiber.Map{"version": registry.GetRegistry().Get("version").(string)})
	})
	// DOCKER NETWORK
	api.Get("/networks", func(context *fiber.Ctx) error {
		return context.Status(200).JSON(fiber.Map{"message": "Hello world"})
	})
	api.Get("/networks/:id", func(context *fiber.Ctx) error {
		return context.Status(200).JSON(fiber.Map{"message": "Hello world"})
	})
	api.Post("/networks", func(context *fiber.Ctx) error {
		return context.Status(200).JSON(fiber.Map{"message": "Hello world"})
	})
	// GROUPS
	api.Get("/groups", func(context *fiber.Ctx) error {
		result, err := GetAllGroups()
		if err != nil {
			return context.SendStatus(fiber.StatusFailedDependency)
		}
		return context.Status(200).JSON(result)
	})
	api.Post("/groups", func(context *fiber.Ctx) error {
		var req models.GroupBody
		if err := context.BodyParser(&req); err != nil {
			context.Status(fiber.StatusBadRequest).JSON(util.GenerateErrorJson("Invalid request body"))
		}
		name, err := pipeline.Process(req.Name, util.NotEmpty, util.MaxLength[string](65))
		if err != nil {
			context.Status(fiber.StatusBadRequest).JSON(util.GenerateErrorJson(err.Error()))
		}
		result, err := CreateGroup(&name)
		if err != nil {
			return context.SendStatus(fiber.StatusFailedDependency)
		}
		return context.Status(200).JSON(result)
	})
}
