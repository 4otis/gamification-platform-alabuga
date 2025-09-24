package models

type Student struct {
	ID         uint        `gorm:"primaryKey;not null" json:"id"`
	Login      string      `gorm:"not null;unique" json:"login"`
	Password   string      `gorm:"not null" json:"password"`
	Name       string      `gorm:"not null" json:"name"`
	Surname    string      `gorm:"not null" json:"surname"`
	Patronymic string      `gorm:"not null" json:"patronymic"`
	Exp        uint        `gorm:"not null;default:0;check:exp>=0" json:"exp"`
	Mana       uint        `gorm:"not null;default:0;check:mana>=0" json:"mana"`
	RankID     uint        `gorm:"not null" json:"rank_id"`
	Rank       StudentRank `gorm:"foreignKey:RankID"`

	Artifacts []*Artifact `gorm:"many2many" json:"artifacts"`
}
