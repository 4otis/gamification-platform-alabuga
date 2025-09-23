package models

type MissionsSkills struct {
	ID          uint    `gorm:"primaryKey;not null" json:"id"`
	ScoreReward float64 `gorm:"not null;default:0.0;check:score_reward>=0.0" json:"score_reward"`
	MissionID   uint    `gorm:"not null" json:"mission_id"`
	SkillID     uint    `gorm:"not null" json:"skill_id"`
	Mission     Mission `gorm:"foreignKey:MissionID"`
	Skill       Skill   `gorm:"foreignKey:SkillID"`
}
