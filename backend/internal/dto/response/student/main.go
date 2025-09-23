package student

// MainResponse структура ответа главной страницы
// swagger:model MainResponse
type MainResponse struct {
	Student     *StudentInfo        `json:"student"`
	Missions    []*MissionInfo      `json:"missions"`
	Courses     []*CourseInfo       `json:"courses"`
	CurRank     *RankInfo           `json:"cur_rank"`
	CurExp      *ExpInfo            `json:"cur_exp"`
	CurPosition int                 `json:"cur_position"`
	Leaderboard []*LeaderboardEntry `json:"leaderboard"`
}

// StudentInfo информация о студенте
// swagger:model StudentInfo
type StudentInfo struct {
	ID         uint   `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Patronymic string `json:"patronymic"`
	Exp        uint   `json:"exp"`
	Mana       uint   `json:"mana"`
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

// RankInfo информация о ранге
// swagger:model RankInfo
type RankInfo struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

// ExpInfo информация о ранге
// swagger:model ExpInfo
type ExpInfo struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

// LeaderboardEntry запись в таблице лидеров
// swagger:model LeaderboardEntry
type LeaderboardEntry struct {
	ID       uint   `json:"id"`
	Position int    `json:"position"`
	Name     string `json:"name"`
	Exp      uint   `json:"exp"`
	Rank     string `json:"rank"`
}
