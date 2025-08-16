package database

type Repository[T any] interface {
	Create(item T) error
	Read(id string) (T, error)
	Update(item T) error
	Delete(id string) error
	List() ([]T, error)
	Get(id string) (T, error)
}
type Identifiable interface {
	GetID() string
}
