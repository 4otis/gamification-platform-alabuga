package models

type StudentSkills struct {
	ID        uint  `json:"id"`
	Score     float `json:"score"`
	StudentId uint  `json:"student_id"`
	SkillId   uint  `json:"skill_id"`
}