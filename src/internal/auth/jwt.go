package auth

import (
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
	return &fiber.Cookie{
		Name:     "olingo_auth_token",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
		Secure:   false,
		Path:     "/",
		SameSite: "Strict",
	}
}
