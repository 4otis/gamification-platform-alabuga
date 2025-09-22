package models

type StudentRank struct {
	ID     uint   `gorm:"primaryKey;not null" json:"id"`
	Name   string `gorm:"not null" json:"name"`
	MinExp uint   `gorm:"not null;default:0;check:min_exp>=0" json:"min_exp"`
}
