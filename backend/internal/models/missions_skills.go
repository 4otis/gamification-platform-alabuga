package models

type MissionSkills struct {
	ID          uint   `json:"id"`
	ScoreReward string `json:"score_reward"`
	MissionId   string `json:"mission_id"`
	SkillId     string `json:"skill_id"`
}
