package auth

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/nidrux/olingo/internal/config"
	"github.com/nidrux/olingo/internal/models/authentication/permissions"
)

var routePermissions = map[string]int{
	"/admin/users":       permissions.AllowAll,
	"/groups/create":     permissions.CreateGroup,
	"/groups/delete":     permissions.DeleteGroup,
	"/containers/create": permissions.CreateContainer,
	"/nodes/view":        permissions.ViewNodes,
}

func AuthMiddleware(context *fiber.Ctx) error {
	publicPaths := []string{
		"/auth/login", "/favicon.ico", "/b/auth/logout",
		"/b/auth/first-time", "/auth/first-time", "/api/version",
	}
	for _, path := range publicPaths {
		if context.Path() == path {
			if config.IsFirstTimeInstallation() {
				if path == "/auth/first-time" {
					return context.Next()
				}
				return context.Redirect("/auth/first-time")
			}
			return context.Next()
		}
	}
	if strings.HasPrefix(context.Path(), "/assets") || strings.HasPrefix(context.Path(), "/art") || context.Path() == "/Olingo.svg" {
		return context.Next()
	}

	tokenStr := ""
	if cookie := context.Cookies("olingo_auth_token"); cookie != "" {
		tokenStr = cookie
	} else if authHeader := context.Get("Authorization"); strings.HasPrefix(authHeader, "Bearer ") {
		tokenStr = strings.TrimPrefix(authHeader, "Bearer ")
	}
	if tokenStr == "" {
		return context.Redirect("/auth/login")
	}

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.ErrUnauthorized
		}
		return JwtSecret, nil
	})
	if err != nil || !token.Valid {
		return context.Redirect("/auth/login")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return context.Redirect("/auth/login")
	}

	permissionsVal := int(claims["permissions"].(float64))

	context.Locals("user_id", uint(claims["user_id"].(float64)))
	context.Locals("permissions", permissionsVal)
	context.Locals("email", claims["email"].(string))

	if requiredPerm, exists := routePermissions[context.Path()]; exists {
		if permissionsVal&requiredPerm == 0 && permissionsVal&permissions.AllowAll == 0 {
			return context.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": "Insufficient permissions",
			})
		}
	}

	return context.Next()
}
