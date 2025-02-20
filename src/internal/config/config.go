package config

import (
	"github.com/gofiber/fiber/v2/log"
	"github.com/nidrux/orca/pkg/pipeline"
	"github.com/nidrux/orca/pkg/registry"
	"github.com/nidrux/orca/pkg/util"
)

type config struct {
	Port uint16 `env:"PORT"`
}

func loadConfig(getter util.ValueGetter) (*config, error) {
	portStr, err := getter("PORT")
	if err != nil {
		log.Fatalf("Failed to validate")
	}
	port, err := pipeline.Process[int](portStr, util.NotEmpty, util.ToInt)
	if err != nil {
		return nil, err
	}
	return &config{
		Port: uint16(port),
	}, nil
}

func InitConfig() {
	config, err := loadConfig(util.EnvGetter)
	if err != nil {
		log.Fatalf("Failed to validate config pipeline: %v", err)
	}
	registry.GetRegistry().Register("config", config)
}
func GetConfig() *config {
	return registry.GetRegistry().Get("config").(*config)
}
