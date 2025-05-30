package internal

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/nidrux/olingo/internal/auth"
	"github.com/nidrux/olingo/internal/config"
	"github.com/nidrux/olingo/internal/database"
	"github.com/nidrux/olingo/internal/models/authentication"
	"github.com/nidrux/olingo/internal/models/authentication/permissions"
	"github.com/nidrux/olingo/pkg/util"
	"golang.org/x/crypto/bcrypt"
)

func AuthRoutes() {
	const BASE_PATH string = "/b/auth"
	api := config.GetWebServer().Group(BASE_PATH)
	api.Post("/logout", func(context *fiber.Ctx) error {
		context.ClearCookie("olingo_auth_token")
		return context.Redirect("/auth/login")
	})
	api.Post("/login", func(context *fiber.Ctx) error {
		var req authentication.UserBody
		if err := context.BodyParser(&req); err != nil {
			return context.Status(fiber.StatusBadRequest).JSON(util.GenerateErrorJson("Invalid request body"))
		}
		if req.Email == "" || req.Password == "" {
			return context.Status(fiber.StatusBadRequest).JSON(util.GenerateErrorJson("Email and password are required"))
		}
		var user authentication.User
		db := database.GetDatabaseConnection()
		if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
			return context.Status(fiber.StatusUnauthorized).JSON(util.GenerateErrorJson("Invalid credentials"))
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
			return context.Status(fiber.StatusUnauthorized).JSON(util.GenerateErrorJson("Invalid credentials"))
		}

		token, err := auth.GenerateJWT(user.ID, user.Email, user.Permissions)
		if err != nil {
			return context.Status(fiber.StatusInternalServerError).JSON(util.GenerateErrorJson("Failed to generate JWT"))
		}
		context.Cookie(auth.CreateCookie(token))

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
		isFirstInstallation := config.IsFirstTimeInstallation()
		if !isFirstInstallation {
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
		db := database.GetDatabaseConnection()
		if err := db.Create(&user).Error; err != nil {
			return context.Status(fiber.StatusInternalServerError).JSON(util.GenerateErrorJson("Failed to create user"))
		}
		token, err := auth.GenerateJWT(user.ID, user.Email, user.Permissions)
		if err != nil {
			return context.Status(fiber.StatusInternalServerError).JSON(util.GenerateErrorJson("Failed to generate JWT"))
		}
		context.Cookie(auth.CreateCookie(token))
		return context.Redirect("/")
	})
}
