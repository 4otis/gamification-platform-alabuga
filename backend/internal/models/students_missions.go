package models

import "time"

type StudentsMissions struct {
	ID          uint      `gorm:"primaryKey;not null" json:"id"`
	StudentID   uint      `gorm:"not null" json:"student_id"`
	MissionID   uint      `gorm:"not null" json:"mission_id"`
	IsActive    bool      `gorm:"not null;default:false" json:"is_active"`
	IsCompleted bool      `gorm:"not null;default:false" json:"is_completed"`
	CreatedTime time.Time `gorm:"not null;default:now()" json:"created_time"`
	DeletedTime time.Time `gorm:"not null;default:now()" json:"deleted_time"`
	Student     Student   `gorm:"foreignKey:StudentID"`
	Mission     Mission   `gorm:"foreignKey:MissionID"`
}
