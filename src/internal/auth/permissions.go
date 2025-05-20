package auth

import "github.com/nidrux/olingo/internal/models/authentication"

func GetEffectiveUserPermissions(user authentication.User) int {
	total := user.Permissions
	for _, role := range user.Roles {
		total |= role.Permissions
	}
	return total
}
