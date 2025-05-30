package internal

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nidrux/olingo/internal/config"
	"github.com/nidrux/olingo/internal/models/authentication"
	"github.com/nidrux/olingo/pkg/util"
)

func AuthRoutes() {
	const BASE_PATH string = "/b/auth"
	api := config.GetWebServer().Group(BASE_PATH)
	// CONFIG
	api.Post("/login", func(context *fiber.Ctx) error {
		var req authentication.UserBody
		if err := context.BodyParser(&req); err != nil {
			context.Status(fiber.StatusBadRequest).JSON(util.GenerateErrorJson("Invalid request body"))
		}
		return context.Redirect("/")
	})
	api.Post("/first-time", func(context *fiber.Ctx) error {
		var req authentication.UserBody
		if err := context.BodyParser(&req); err != nil {
			context.Status(fiber.StatusBadRequest).JSON(util.GenerateErrorJson("Invalid request body"))
		}
		return context.Redirect("/")
	})
}
