package internal

import (
	"sync"

	"github.com/nidrux/olingo/internal/models"
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
		registry.GetRegistry().Register("database", db)
	})
}
func GetDatabaseConnection() *gorm.DB {
	return registry.GetRegistry().Get("database").(*gorm.DB)
}
