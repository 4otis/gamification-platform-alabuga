package student

// ProfileResponse структура ответа страницы профиля
// swagger:model ProfileResponse
type ProfileResponse struct {
	Profile   *ProfileInfo    `json:"profile"`
	Skills    []*SkillInfo    `json:"skills"`
	Artifacts []*ArtifactInfo `json:"artifacts"`
	History   []*HistoryInfo  `json:"history"`
}

type HistoryInfo struct {
	Title string `json:"title"`
	Descr string `json:"descr"`
	Type  string `json:"type"`
	Mana  int    `json:"mana"`
	Exp   int    `json:"exp"`
}
