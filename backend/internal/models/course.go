package model

type Course struct {
	ID         uint   `json:"id"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	RankId     uint   `json:"rank_id"`
	ArtifactId uint   `json:"artifact_sd"`
}