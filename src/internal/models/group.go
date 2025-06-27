package models

// DATABASE
type Group struct {
	ID        string `gorm:"primaryKey"`
	Name      string `gorm:"unique;not null"`
	CreatedAt int64  `gorm:"autoCreateTime"`
	UpdatedAt int
	CreatedBy string
}

// REQUEST BODY
type GroupBody struct {
	GroupName string `json:"groupName"`
}
