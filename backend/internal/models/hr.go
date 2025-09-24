package models

type HR struct {
	ID         uint   `gorm:"primaryKey;not null" json:"id"`
	Login      string `gorm:"not null;unique" json:"login"`
	Password   string `gorm:"not null" json:"password"`
	Name       string `gorm:"not null" json:"name"`
	Surname    string `gorm:"not null" json:"surname"`
	Patronymic string `gorm:"not null" json:"patronymic"`
	HasRoot    bool   `gorm:"not null;default:false;" json:"has_root"`
}
