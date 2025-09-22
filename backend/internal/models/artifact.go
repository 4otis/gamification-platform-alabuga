package models

type Artifact struct {
	ID       uint   `gorm:"primaryKey;not null" json:"id"`
	Title    string `gorm:"not null;unique" json:"title"`
	Descr    string `json:"descr"`
	FilePath string `gorm:"not null" json:"file_path"`
	RarityID uint   `gorm:"not null" json:"rarity_id"`
	Rarity   Rarity `gorm:"foreignKey:RarityID"`
}
