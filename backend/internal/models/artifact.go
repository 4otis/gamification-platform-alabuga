package models

type Artifact struct {
	ID        uint   `json:"id"`
	Title     string `json:"title"`
	Descr     string `json:"descr"`
	FilePath  string `json:"file_path"`
	RarityID  uint   `json:"rarity_id"`
}