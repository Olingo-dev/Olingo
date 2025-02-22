package database

import (
	"context"
	"log"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/nidrux/olingo/pkg/registry"
)

var once sync.Once

func InitDatabase() {
	once.Do(func() {
		URI := ""
		pool, err := pgxpool.New(context.Background(), URI)
		if err != nil {
			log.Fatal("Failed to connect to the database. Error: %v", err)
		}
		registry.GetRegistry().Register("database", pool)
	})
}

func GetDatabaseConnection() *pgxpool.Pool {
	return registry.GetRegistry().Get("database").(*pgxpool.Pool)
}
