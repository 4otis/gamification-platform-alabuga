package models

type Artifact struct {
	ID        uint   `json:"id"`
	Title     string `json:"title"`
	Descr     string `json:"descr"`
	FilePath  string `json:"filePath"`
	RarityID  uint   `json:"rarityId"`
}