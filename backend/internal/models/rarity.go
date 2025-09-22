package models

type Rarity struct {
	ID   uint   `gorm:"primaryKey;not null" json:"id"`
	Name string `gorm:"not null;unique" json:"name"`
}
