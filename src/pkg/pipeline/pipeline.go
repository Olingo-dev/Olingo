package pipeline

type Request[T any] func(string) (T, error)

func Process[T any](value string, requests ...Request[T]) (T, error) {
	var zero T
	var err error
	var result T
	for _, request := range requests {
		result, err = request(value)
		if err != nil {
			return zero, err
		}
	}
	return result, nil
}
