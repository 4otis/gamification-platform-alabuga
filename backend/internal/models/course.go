package models

type Course struct {
	ID          uint        `gorm:"primaryKey;not null" json:"id"`
	Title       string      `gorm:"not null;unique" json:"title"`
	Descr       string      `json:"descr"`
	RankID      uint        `gorm:"not null" json:"rank_id"`
	ArtifactID  uint        `gorm:"not null" json:"artifact_id"`
	MinProgress float64     `gorm:"not null;default:1.0" json:"min_progress"`
	Rank        StudentRank `gorm:"foreignKey:RankID"`
	Artifact    Artifact    `gorm:"foreignKey:ArtifactID"`

	// Статусные поля (не сохраняются в БД, заполняются из JOIN)
	Progress    float64 `gorm:"-" json:"progress"`
	IsCompleted bool    `gorm:"-" json:"is_completed"`
	StudentID   uint    `gorm:"-" json:"student_id,omitempty"`
}
