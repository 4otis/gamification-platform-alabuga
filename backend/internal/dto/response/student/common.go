package student

// StudentInfo информация о студенте
// swagger:model StudentInfo
type StudentInfo struct {
	ID         uint   `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Patronymic string `json:"patronymic"`
	Exp        uint   `json:"exp"`
	Mana       uint   `json:"mana"`
	Rank       string `json:"rank"`
}

type ProfileInfo struct {
	Student      *StudentInfo `json:"student"`
	EquipedItems []*ItemInfo  `json:"equiped_items"`
}

type ItemInfo struct {
	Name     string `json:"name"`
	FilePath string `json:"file_path"`
	MinExp   uint   `json:"min_exp"`
	TypeName string `json:"type_name"`
}

// MissionInfo информация о миссии
// swagger:model MissionInfo
type MissionInfo struct {
	ID         uint   `json:"id"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	ExpReward  uint   `json:"exp_reward"`
	ManaReward uint   `json:"mana_reward"`
}

// CourseInfo информация о курсе
// swagger:model CourseInfo
type CourseInfo struct {
	ID    uint   `json:"id"`
	Title string `json:"title"`
	Descr string `json:"descr"`
}

type SkillInfo struct {
	ID    uint    `json:"id"`
	Name  string  `json:"name"`
	Score float64 `json:"score"`
}

type ArtifactInfo struct {
	ID       uint   `json:"id"`
	Title    string `json:"title"`
	Descr    string `json:"descr"`
	FilePath string `json:"file_path"`
	RarityID uint   `json:"rarity_id"`
	Rarity   string `json:"rarity"`
}
