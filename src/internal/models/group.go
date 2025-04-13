package models

// DATABASE
type Group struct {
	ID        string `gorm:"primaryKey"`
	Name      string
	CreatedAt int64 `gorm:"autoCreateTime"`
	UpdatedAt int
	CreatedBy string
}

// REQUEST BODY
type GroupBody struct {
	Name string `json:"name"`
}
