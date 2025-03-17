package util

import "github.com/gofiber/fiber/v2"

func GenerateErrorJson(message string) *fiber.Map {
	return &fiber.Map{"error": message}
}
