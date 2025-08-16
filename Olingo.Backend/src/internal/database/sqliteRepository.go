package database

import "gorm.io/gorm"

type SqliteRepository[T Identifiable] struct {
	db *gorm.DB
}

func NewSqliteRepository[T Identifiable](db *gorm.DB) *SqliteRepository[T] {
	var zero T
	db.AutoMigrate(&zero)
	return &SqliteRepository[T]{db: db}
}

func (r *SqliteRepository[T]) Create(item T) error {
	return r.db.Create(&item).Error
}

func (r *SqliteRepository[T]) Read(id string) (T, error) {
	var item T
	if err := r.db.First(&item, "id = ?", id).Error; err != nil {
		return item, err
	}
	return item, nil
}

func (r *SqliteRepository[T]) Update(item T) error {
	return r.db.Save(&item).Error
}

func (r *SqliteRepository[T]) Delete(id string) error {
	var empty T
	return r.db.Delete(&empty, "id = ?", id).Error
}

func (r *SqliteRepository[T]) List() ([]T, error) {
	var items []T
	if err := r.db.Find(&items).Error; err != nil {
		return nil, err
	}
	return items, nil
}

func (r *SqliteRepository[T]) Get(id string) (T, error) {
	var item T
	if err := r.db.First(&item, "id = ?", id).Error; err != nil {
		return item, err
	}
	return item, nil
}
