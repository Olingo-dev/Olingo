package auth

import (
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

var JwtSecret = []byte("your_super_secret_key")

func GenerateJWT(userID uint, email string, permissions int) (string, error) {
	claims := jwt.MapClaims{
		"user_id":     userID,
		"email":       email,
		"permissions": permissions,
		"exp":         time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JwtSecret)
}

func CreateCookie(token string) *fiber.Cookie {
	log.Print("Generating cookie")
	cookie := &fiber.Cookie{
		Name:     "olingo_auth_token",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
		Path:     "/",
		SameSite: "Strict",
	}
	development := os.Getenv("DEVCONTAINER")
	if development == "true" {
		log.Print("Using insecure cookies in development mode.")
		cookie.Secure = false
		cookie.HTTPOnly = false
	} else {
		cookie.Secure = true
		cookie.HTTPOnly = false
	}

	return cookie
}
