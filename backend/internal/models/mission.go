package model

type Mission struct {
	ID         uint   `json:"id"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	ManaReward uint   `json:"manaReward"`
	ExpReward  uint   `json:"expReward"`
	NodeLvl    int    `json:"manaReward"`
	ArtifactId uint   `json:"artifactId"`
	TypeId     uint   `json:"typeId"`
	CourseId   uint   `json:"courseId"`
}