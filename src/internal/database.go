package internal

import (
	"log"
	"sync"

	"github.com/nidrux/olingo/internal/models"
	"github.com/nidrux/olingo/internal/models/authentication"
	"github.com/nidrux/olingo/internal/models/authentication/permissions"
	"github.com/nidrux/olingo/pkg/registry"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var once sync.Once

func InitDatabase() {
	once.Do(func() {
		db, err := gorm.Open(sqlite.Open("./db.sqlite"), &gorm.Config{})
		if err != nil {
			panic("failed to connect database")
		}
		db.AutoMigrate(&models.Group{})
		db.AutoMigrate(&authentication.User{})
		db.AutoMigrate(&authentication.Role{})
		createDefaultRole(db)
		registry.GetRegistry().Register("database", db)
	})
}
func GetDatabaseConnection() *gorm.DB {
	return registry.GetRegistry().Get("database").(*gorm.DB)
}

func createDefaultRole(db *gorm.DB) error {
	var count int64
	db.Model(&authentication.Role{}).Where("name = ?", "Administrator").Count(&count)
	if count == 0 {
		adminRole := authentication.Role{
			Name:        "Administrator",
			Permissions: permissions.AllowAll,
		}
		if err := db.Create(&adminRole).Error; err != nil {
			return err
		}
		log.Println("Created Administrator role")
	} else {
		log.Println("Administrator role already exists")
	}
	return nil
}
