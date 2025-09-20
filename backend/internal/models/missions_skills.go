package models

type MissionsSkills struct {
	ID          uint    `json:"id"`
	ScoreReward float64 `json:"score_reward"`
	MissionID   uint    `json:"mission_id"`
	SkillID     uint    `json:"skill_id"`
}
