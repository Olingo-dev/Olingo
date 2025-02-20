package util

import (
	"fmt"
	"os"
)

type ValueGetter func(string) (string, error)

func EnvGetter(key string) (string, error) {
	value, exists := os.LookupEnv(key)
	if !exists {
		return "", fmt.Errorf("missing environment variable: %s", key)
	}
	return value, nil
}
