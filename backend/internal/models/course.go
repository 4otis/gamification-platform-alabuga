package models

type Course struct {
	ID          uint        `gorm:"primaryKey;not null" json:"id"`
	Title       string      `gorm:"not null;unique" json:"title"`
	Descr       string      `json:"descr"`
	RankID      uint        `gorm:"not null" json:"rank_id"`
	ArtifactID  uint        `gorm:"not null" json:"artifact_id"`
	MinProgress float64     `gorm:"not null;default:1.0" json:"min_progress"`
	Progress    float64     `gorm:"not null;default:0.0" json:"progress"`
	IsActive    bool        `gorm:"not null;default:false" json:"is_active"`
	IsCompleted bool        `gorm:"not null;default:false" json:"is_completed"`
	Rank        StudentRank `gorm:"foreignKey:RankID"`
	Artifact    Artifact    `gorm:"foreignKey:ArtifactID"`
}
