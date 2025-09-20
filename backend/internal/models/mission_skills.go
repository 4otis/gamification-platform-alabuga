package models

type MissionSkills struct {
	ID          uint   `json:"id"`
	ScoreReward string `json:"scoreReward"`
	MissionId   string `json:"missionId"`
	SkillId     string `json:"skillId"`
}
