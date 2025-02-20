package util

import (
	"fmt"
	"strconv"
)

func NotEmpty[T any](value string) (T, error) {
	var zero T
	if value == "" {
		return zero, fmt.Errorf("value cannot be empty")
	}
	return zero, nil
}

func ToInt(value string) (int, error) {
	i, err := strconv.Atoi(value)
	if err != nil {
		return 0, fmt.Errorf("invalid integer: %s", value)
	}
	return i, nil
}
