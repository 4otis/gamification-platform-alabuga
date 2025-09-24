package models

import "time"

type StudentsMerches struct {
	ID          uint      `gorm:"primaryKey;not null" json:"id"`
	StudentID   uint      `gorm:"not null" json:"student_id"`
	MerchID     uint      `gorm:"not null" json:"merch_id"`
	CreatedTime time.Time `gorm:"not null;default:now()" json:"created_time"`
	IsDone      bool      `gorm:"not null;default:false" json:"is_done"`
	Student     Student   `gorm:"foreignKey:StudentID"`
	Merch       Merch     `gorm:"foreignKey:MerchID"`
}
