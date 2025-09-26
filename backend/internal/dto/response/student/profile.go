package student

import "time"

// ProfileResponse структура ответа страницы профиля
// swagger:model ProfileResponse
type ProfileResponse struct {
	Profile      *ProfileInfo       `json:"profile"`
	Skills       []*SkillInfo       `json:"skills"`
	Artifacts    []*ArtifactInfo    `json:"artifacts"`
	Transactions []*TransactionInfo `json:"transactions"`
}

type TransactionInfo struct {
	Position  int           `json:"postion"`
	Timestamp time.Time     `json:"timestamp"`
	Title     string        `json:"title"`
	Descr     string        `json:"descr"`
	Type      string        `json:"type"`
	Mana      int           `json:"mana"`
	Exp       int           `json:"exp"`
	Skills    []*SkillInfo  `json:"skills"`
	Artifact  *ArtifactInfo `json:"artifacts"`
}
