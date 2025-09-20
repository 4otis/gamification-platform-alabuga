package models

type StudentSkills struct {
	ID        uint  `json:"id"`
	Score     float `json:"score"`
	StudentID uint  `json:"student_id"`
	SkillID   uint  `json:"skill_id"`
}