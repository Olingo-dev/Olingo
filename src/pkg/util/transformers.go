package util

import (
	"fmt"
	"strconv"
)

func ToInt[T ~int](value string) (int, error) {
	i, err := strconv.Atoi(value)
	if err != nil {
		return 0, fmt.Errorf("invalid integer: %s", value)
	}
	return i, nil
}
