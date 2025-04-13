package pipeline

type Request[T any] func(T) (T, error)
type Transformer[T any, U any] func(T) (U, error)

func Process[T any](value T, requests ...Request[T]) (T, error) {
	var err error
	for _, request := range requests {
		value, err = request(value)
		if err != nil {
			return value, err
		}
	}
	return value, nil
}

func ProcessWithTransform[T any, U any](value T, transform Transformer[T, U], requests ...Request[T]) (U, error) {
	var err error
	for _, request := range requests {
		value, err = request(value)
		if err != nil {
			var zero U
			return zero, err
		}
	}
	return transform(value)
}
