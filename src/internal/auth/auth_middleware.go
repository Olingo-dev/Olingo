package auth

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

func AuthMiddleware(c *fiber.Ctx) error {
	switch c.Path() {
	case "/auth/login", "/favicon.ico", "/auth/logout", "/art/*", "/api/version":
		return c.Next()
	default:
		if strings.HasPrefix(c.Path(), "/assets") || strings.HasPrefix(c.Path(), "/art") || strings.HasPrefix(c.Path(), "/Olingo.svg") {
			return c.Next()
		}
		// CHECK AUTH HEADER. TODO VALIDATE TOKEN
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "unauthorized",
			})
		}
		return c.Next()
	}
}
