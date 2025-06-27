package util

import (
	"fmt"
	"regexp"

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
func MinLength[T ~string](minLength uint64) pipeline.Request[T] {
	return func(value T) (T, error) {
		if len(value) < int(minLength) {
			var zero T
			return zero, fmt.Errorf("value cannot be less than %d characters", minLength)
		}
		return value, nil
	}
}
func Regex[T ~string](regex string, customErrorMessage string) pipeline.Request[T] {
	return func(value T) (T, error) {
		matched, _ := regexp.MatchString(regex, string(value))
		if !matched {
			var zero T
			return zero, fmt.Errorf("%s", customErrorMessage)
		}
		return value, nil
	}
}
