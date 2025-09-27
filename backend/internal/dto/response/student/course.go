package student

import "time"

type DetailedCourseInfo struct {
	ID          uint          `json:"id"`
	Title       string        `json:"title"`
	Descr       string        `json:"descr"`
	MinProgress float64       `json:"min_progress"`
	Timeout     time.Duration `json:"timeout"`
	Rank        string        `json:"rank"`
	Artifact    *ArtifactInfo `json:"artifact"`
	// RankID      uint          `json:"rank_id"`
}

// CourseResponse структура ответа страницы одного курса
// swagger:model CourseResponse
type CourseResponse struct {
	Course   *DetailedCourseInfo    `json:"course"`
	Missions []*StructedTreeMission `json:"missions"`
}
