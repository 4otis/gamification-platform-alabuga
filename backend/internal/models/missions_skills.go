package models

type MissionsSkills struct {
	ID          uint   `json:"id"`
	ScoreReward string `json:"score_reward"`
	MissionID   string `json:"mission_id"`
	SkillID     string `json:"skill_id"`
}
