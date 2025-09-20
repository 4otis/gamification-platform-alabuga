package models

type StudentSkills struct {
	ID        uint  `json:"id"`
	Score     float `json:"score"`
	StudentId uint  `json:"studentId"`
	SkillId   uint  `json:"skillId"`
}