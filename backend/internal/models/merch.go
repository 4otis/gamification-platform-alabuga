package models

import "time"

type Merch struct {
	ID              uint   `gorm:"primaryKey;not null" json:"id"`
	Name            string `gorm:"not null" json:"name"`
	Descr           string `gorm:"type:text" json:"descr"`
	FilePath        string `gorm:"not null" json:"file_path"`
	Price           uint   `gorm:"not null;check:price>0;" json:"price"`
	AmountAvailable int    `gorm:"not null;check:amount_available>=0;" json:"amount_available"`

	CreatedTime time.Time `gorm:"-" json:"created_time"`
	IsDone      bool      `gorm:"-" json:"is_done"`
	StudentID   uint      `gorm:"-" json:"student_id,omitempty"`
}
