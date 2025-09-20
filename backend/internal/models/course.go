package models

type Course struct {
	ID         uint   `json:"id"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	RankID     uint   `json:"rank_id"`
	ArtifactID uint   `json:"artifact_id"`
}
