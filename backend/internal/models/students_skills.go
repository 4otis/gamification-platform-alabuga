package models

type StudentsSkills struct {
	ID        uint    `json:"id"`
	Score     float64 `json:"score"`
	StudentID uint    `json:"student_id"`
	SkillID   uint    `json:"skill_id"`
}
