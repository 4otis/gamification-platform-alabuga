package models

type Question struct {
	ID             uint         `gorm:"primaryKey;not null" json:"id"`
	Content        string       `gorm:"not null;type:text" json:"content"`
	QuestionTypeID uint         `gorm:"not null" json:"question_type_id"`
	MissionID      uint         `gorm:"not null" json:"mission_id"`
	QuestionType   QuestionType `gorm:"foreignKey:QuestionTypeID"`
	Mission        Mission      `gorm:"foreignKey:MissionID"`
}
