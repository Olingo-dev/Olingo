package authentication

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email       string `gorm:"unique"`
	Password    string
	Roles       []Role `gorm:"many2many:user_roles"`
	Permissions int
}

type UserBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
