package auth

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

func AuthMiddleware(c *fiber.Ctx) error {
	switch c.Path() {
	case "/auth/login", "/favicon.ico", "/b/auth/logout", "/art/*", "/api/version", "/b/auth/first-time", "/b/auth/login", "/auth/first-time":
		return c.Next()
	default:
		if strings.HasPrefix(c.Path(), "/assets") || strings.HasPrefix(c.Path(), "/art") || strings.HasPrefix(c.Path(), "/Olingo.svg") {
			return c.Next()
		}
		// CHECK AUTH HEADER. TODO VALIDATE TOKEN
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Redirect("/auth/login")
		}
		return c.Next()
	}
}
