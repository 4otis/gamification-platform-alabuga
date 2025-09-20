package models

type Mission struct {
	ID         uint   `json:"id"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	ManaReward uint   `json:"mana_reward"`
	ExpReward  uint   `json:"exp_reward"`
	NodeLvl    int    `json:"node_lvl"`
	ArtifactID uint   `json:"artifact_id"`
	TypeID     uint   `json:"type_id"`
	CourseID   uint   `json:"course_id"`
}
