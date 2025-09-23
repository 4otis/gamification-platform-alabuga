package models

type StudentsMissions struct {
	ID          uint    `gorm:"primaryKey;not null" json:"id"`
	StudentID   uint    `gorm:"not null" json:"student_id"`
	MissionID   uint    `gorm:"not null" json:"mission_id"`
	IsActive    bool    `gorm:"not null;default:false" json:"is_active"`
	IsCompleted bool    `gorm:"not null;default:false" json:"is_completed"`
	Student     Student `gorm:"foreignKey:StudentID"`
	Mission     Course  `gorm:"foreignKey:MissionID"`
}
