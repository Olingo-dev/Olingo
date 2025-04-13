package util

import (
	"fmt"

	"github.com/nidrux/olingo/pkg/pipeline"
)

func NotEmpty[T ~string](value T) (T, error) {
	if value == "" {
		var zero T
		return zero, fmt.Errorf("value cannot be empty")
	}
	return value, nil
}
func MaxLength[T ~string](maxLength uint64) pipeline.Request[T] {
	return func(value T) (T, error) {
		if len(value) > int(maxLength) {
			var zero T
			return zero, fmt.Errorf("value cannot be greater than %d characters", maxLength)
		}
		return value, nil
	}
}
