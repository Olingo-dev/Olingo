package config

import (
	"github.com/gofiber/fiber/v2/log"
	"github.com/nidrux/olingo/pkg/pipeline"
	"github.com/nidrux/olingo/pkg/registry"
	"github.com/nidrux/olingo/pkg/util"
)

type config struct {
	Port uint16 `env:"PORT"`
	// ExecutingPath string
}

func loadConfig(getter util.ValueGetter) (*config, error) {
	portStr, err := getter("PORT")
	if err != nil {
		log.Fatalf("Failed to validate")
	}
	port, err := pipeline.ProcessWithTransform(portStr, util.ToInt[int], util.NotEmpty)
	if err != nil {
		return nil, err
	}

	// executingPath, err := os.Executable()
	// if err != nil {
	// 	return nil, err
	// }
	// executingPath = filepath.Dir(executingPath)

	return &config{
		Port: uint16(port),
		// ExecutingPath: executingPath,
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
