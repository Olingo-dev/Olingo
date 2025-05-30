package authentication

import "gorm.io/gorm"

type Role struct {
	gorm.Model
	Name        string `gorm:"unique"`
	Permissions int
}

const (
	RoleAdmin = 1 << iota
)
