package database

type InMemoryRepository[T Identifiable] struct {
	data map[string]T
}

func NewInMemoryRepository[T Identifiable]() *InMemoryRepository[T] {
	return &InMemoryRepository[T]{data: make(map[string]T)}
}

func (r *InMemoryRepository[T]) Create(item T) error {
	r.data[item.GetID()] = item
	return nil
}

func (r *InMemoryRepository[T]) Read(id string) (T, error) {
	zero := r.data[id]
	return zero, nil
}

func (r *InMemoryRepository[T]) Update(item T) error {
	r.data[item.GetID()] = item
	return nil
}

func (r *InMemoryRepository[T]) Delete(id string) error {
	delete(r.data, id)
	return nil
}

func (r *InMemoryRepository[T]) List() ([]T, error) {
	var items []T
	for _, item := range r.data {
		items = append(items, item)
	}
	return items, nil
}
func (r *InMemoryRepository[T]) Get(id string) (T, error) {
	item, exists := r.data[id]
	if !exists {
		var zero T
		return zero, nil
	}
	return item, nil
}
