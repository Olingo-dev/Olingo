package database

import "github.com/olingo-dev/olingo/internal/entities"

var GroupRepository *InMemoryRepository[*entities.Group] = NewInMemoryRepository[*entities.Group]()
