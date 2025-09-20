package model

type Course struct {
	ID         uint   `json:"id"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	RankId     uint   `json:"rankId"`
	ArtifactId uint   `json:"artifactId"`
}