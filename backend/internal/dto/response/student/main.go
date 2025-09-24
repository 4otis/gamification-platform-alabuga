package student

// MainResponse структура ответа главной страницы
// swagger:model MainResponse
type MainResponse struct {
	Profile     *ProfileInfo        `json:"profile"`
	Missions    []*MissionInfo      `json:"missions"`
	Courses     []*CourseInfo       `json:"courses"`
	Leaderboard []*LeaderboardEntry `json:"leaderboard"`
	CurPosition int                 `json:"cur_position"`
	// CurRank     *RankInfo           `json:"cur_rank"`
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
