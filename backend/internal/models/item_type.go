// internal/models/item_type.go
package models

type ItemType struct {
	ID   uint   `gorm:"primaryKey;not null" json:"id"`
	Name string `gorm:"not null;unique" json:"name"`
}
