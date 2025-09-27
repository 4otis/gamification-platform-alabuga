package models

import "time"

type Mission struct {
	ID              uint   `gorm:"primaryKey;not null" json:"id"`
	Title           string `gorm:"not null" json:"title"`
	Descr           string `json:"descr"`
	ExpReward       uint   `gorm:"not null;check:exp_reward>=0" json:"exp_reward"`
	ManaReward      uint   `gorm:"not null;check:mana_reward>=0" json:"mana_reward"`
	NodeLvl         int    `gorm:"not null" json:"node_lvl"`
	ArtifactID      uint   `gorm:"not null" json:"artifact_id"`
	TypeID          uint   `gorm:"not null" json:"type_id"`
	CourseID        uint   `gorm:"not null" json:"course_id"`
	IsAutoCompleted bool   `gorm:"not null;default:true;" json:"is_auto_completed"`

	Artifact    Artifact    `gorm:"foreignKey:ArtifactID"`
	MissionType MissionType `gorm:"foreignKey:TypeID"`
	Course      Course      `gorm:"foreignKey:CourseID"`
	Questions   []Question  `gorm:"foreignKey:MissionID" json:"questions"`

	// Статусные поля (не сохраняются в БД, заполняются из JOIN)
	IsActive    bool      `gorm:"-" json:"is_active,omitempty"`
	IsCompleted bool      `gorm:"-" json:"is_completed,omitempty"`
	CreatedTime time.Time `gorm:"-" json:"created_time"`
	DeletedTime time.Time `gorm:"-" json:"deleted_time"`
	StudentID   uint      `gorm:"-" json:"student_id,omitempty"`
	ScoreReward float64   `gorm:"-" json:"score_reward,omitempty"`
}
