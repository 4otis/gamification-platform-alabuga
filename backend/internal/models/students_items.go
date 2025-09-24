package models

type StudentsItems struct {
	ID        uint    `gorm:"primaryKey;not null" json:"id"`
	StudentID uint    `gorm:"not null" json:"student_id"`
	ItemID    uint    `gorm:"not null" json:"item_id"`
	IsEquiped bool    `gorm:"not null;default:false" json:"is_equiped"`
	Student   Student `gorm:"foreignKey:StudentID"`
	Item      Item    `gorm:"foreignKey:ItemID"`
	// IsActive    bool    `gorm:"not null;default:false" json:"is_active"`
}
