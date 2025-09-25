package models

type Skill struct {
	ID   uint   `gorm:"primaryKey;not null" json:"id"`
	Name string `gorm:"not null;unique" json:"name"`

	Score float64 `gorm:"-" json:"score"`
}
