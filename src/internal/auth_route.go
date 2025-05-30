package internal

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/nidrux/olingo/internal/auth"
	"github.com/nidrux/olingo/internal/config"
	"github.com/nidrux/olingo/internal/models/authentication"
	"github.com/nidrux/olingo/internal/models/authentication/permissions"
	"github.com/nidrux/olingo/pkg/util"
	"golang.org/x/crypto/bcrypt"
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

	firstTimeGroup := api.Group("/first-time", limiter.New(limiter.Config{
		Max:        5,
		Expiration: 1 * time.Minute,
		LimitReached: func(c *fiber.Ctx) error {
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"error": "Too many attempts. Please try again later.",
			})
		},
	}))
	firstTimeGroup.Post("/", func(context *fiber.Ctx) error {
		var count int64
		db := GetDatabaseConnection()
		db.Model(&authentication.User{}).
			Where("permissions & ? != 0", permissions.AllowAll).
			Count(&count)
		if count > 0 {
			return context.Redirect("/auth/login")
		}
		var req authentication.UserBody
		if err := context.BodyParser(&req); err != nil {
			context.Status(fiber.StatusBadRequest).JSON(util.GenerateErrorJson("Invalid request body"))
		}
		log.Print(req.Password)
		if req.Email == "" || req.Password == "" {
			return context.Status(fiber.StatusBadRequest).JSON(util.GenerateErrorJson("Email and password are required"))
		}
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return context.Status(fiber.StatusInternalServerError).JSON(util.GenerateErrorJson("Failed to hash password"))
		}
		user := authentication.User{
			Email:       req.Email,
			Password:    string(hashedPassword),
			Permissions: permissions.AllowAll,
		}
		if err := db.Create(&user).Error; err != nil {
			return context.Status(fiber.StatusInternalServerError).JSON(util.GenerateErrorJson("Failed to create user"))
		}
		tokenString, err := auth.GenerateJWT(user.ID, user.Email, user.Permissions)
		if err != nil {
			return context.Status(fiber.StatusInternalServerError).JSON(util.GenerateErrorJson("Failed to generate JWT"))
		}
		context.Cookie(&fiber.Cookie{
			Name:     "olingo_auth_token",
			Value:    tokenString,
			Expires:  time.Now().Add(24 * time.Hour),
			HTTPOnly: true,
			Secure:   false,
			Path:     "/",
			SameSite: "Strict",
		})

		return context.Redirect("/")
	})
}
