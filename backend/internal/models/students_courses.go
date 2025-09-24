package models

import "time"

type StudentsCourses struct {
	ID        uint `gorm:"primaryKey;not null" json:"id"`
	StudentID uint `gorm:"not null" json:"student_id"`
	CourseID  uint `gorm:"not null" json:"course_id"`

	Progress    float64   `gorm:"not null;default:0.0;check:progress>=0.0 AND progress<=1.0" json:"progress"`
	IsCompleted bool      `gorm:"not null;default:false" json:"is_completed"`
	CreatedTime time.Time `gorm:"not null;default:now()" json:"created_time"`
	DeletedTime time.Time `gorm:"not null;default:now()" json:"deleted_time"`

	Student Student `gorm:"foreignKey:StudentID"`
	Course  Course  `gorm:"foreignKey:CourseID"`
	// IsActive    bool    `gorm:"not null;default:false" json:"is_active"`
}
