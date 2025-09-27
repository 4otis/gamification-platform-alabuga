package student

type GetMissionResponse struct {
	Mission *DetailedMissionInfo `json:"mission"`
}

type GetMissionsTreeResponse struct {
	Missions []*StructedTreeMission `json:"missions"`
}

type DetailedMissionInfo struct {
	ID              uint          `json:"id"`
	Title           string        `json:"title"`
	Descr           string        `json:"descr"`
	ManaReward      uint          `json:"mana_reward"`
	ExpReward       uint          `json:"exp_reward"`
	MissionType     string        `json:"mission_type"`
	NodeLvl         int           `json:"node_lvl"`
	IsAutoCompleted bool          `json:"is_auto_completed"`
	IsActive        bool          `json:"is_active"`
	IsCompleted     bool          `json:"is_completed"`
	Course          *CourseInfo   `json:"course"`
	Artifact        *ArtifactInfo `json:"artifact"`
	Skills          []*SkillInfo  `json:"skills"`
}

type StructedTreeMission struct {
	ID          uint   `json:"id"`
	Title       string `json:"title"`
	IsActive    bool   `json:"is_active"`
	IsCompleted bool   `json:"is_completed"`
}
