package models

type StudentsSkills struct {
	ID        uint    `gorm:"primaryKey;not null" json:"id"`
	Score     float64 `gorm:"not null;default:0.0;check:score>=0.0" json:"score"`
	StudentID uint    `gorm:"not null" json:"student_id"`
	SkillID   uint    `gorm:"not null" json:"skill_id"`
	Student   Student `gorm:"foreignKey:StudentID"`
	Skill     Skill   `gorm:"foreignKey:SkillID"`
}
