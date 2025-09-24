// internal/models/item.go
package models

type Item struct {
	ID       uint     `gorm:"primaryKey;not null" json:"id"`
	Name     string   `gorm:"not null" json:"name"`
	FilePath string   `gorm:"not null" json:"file_path"`
	MinExp   uint     `gorm:"not null;default:0" json:"min_exp"`
	TypeID   uint     `gorm:"not null" json:"type_id"`
	Type     ItemType `gorm:"foreignKey:TypeID"`

	IsEquiped bool `gorm:"-" json:"is_equiped"`
	StudentID uint `gorm:"-" json:"student_id,omitempty"`
}
