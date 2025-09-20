package model

type Mission struct {
	ID         uint   `json:"id"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	ManaReward uint   `json:"mana_reward"`
	ExpReward  uint   `json:"exp_reward"`
	NodeLvl    int    `json:"mana_reward"`
	ArtifactId uint   `json:"artifact_id"`
	TypeId     uint   `json:"type_id"`
	CourseId   uint   `json:"course_id"`
}