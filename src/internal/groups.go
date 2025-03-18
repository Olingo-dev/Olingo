package internal

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/nidrux/olingo/internal/models"
	"github.com/nidrux/olingo/pkg/pipeline"
	"github.com/nidrux/olingo/pkg/util"
)

func GetAllGroups() (*fiber.Map, error) {
	db := GetDatabaseConnection()
	var groups []models.Group
	if err := db.Find(&groups).Error; err != nil {
		return nil, err
	}
	return &fiber.Map{"groups": groups}, nil
}
func CreateGroup(groupName *string) (*fiber.Map, error) {
	log.Print("Creating database entry")
	name, err := pipeline.Process(*groupName, util.NotEmpty)
	if err != nil {
		return nil, err
	}
	db := GetDatabaseConnection()
	createdGroup := &models.Group{Name: name, ID: uuid.New().String(), CreatedBy: uuid.New().String()}
	result := db.Create(createdGroup)
	if result.Error != nil {
		return nil, result.Error
	}
	return &fiber.Map{"group": createdGroup}, nil
}
