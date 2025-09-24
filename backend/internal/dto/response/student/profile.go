package student

type ProfileResponse struct {
	Profile   *ProfileInfo    `json:"profile"`
	Skills    []*SkillInfo    `json:"skills"`
	Artifacts []*ArtifactInfo `json:"artifacts"`
	History   []*HistoryInfo  `json:"history"`
}
