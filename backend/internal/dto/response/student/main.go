package student

type MainResponse struct {
	Student     *StudentInfo        `json:"student"`
	Missions    []*MissionInfo      `json:"missions"`
	Courses     []*CourseInfo       `json:"courses"`
	Rank        *RankInfo           `json:"rank"`
	Position    int                 `json:"position"`
	Leaderboard []*LeaderboardEntry `json:"leaderboard"`
}

type StudentInfo struct {
	ID         uint   `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Patronymic string `json:"patronymic"`
	Exp        uint   `json:"exp"`
	Mana       uint   `json:"mana"`
	// скоро понадобится картинка в каком-то формате AvatarURL string `json:"avatar_url"`
}

type MissionInfo struct {
	ID         uint   `json:"id"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	ExpReward  uint   `json:"exp_reward"`
	ManaReward uint   `json:"mana_reward"`
	//статус isCompleted?
}

type CourseInfo struct {
	ID    uint   `json:"id"`
	Title string `json:"title"`
	Descr string `json:"descr"`
	// Progress int    `json:"progress"` // 0-100%
}

type RankInfo struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type LeaderboardEntry struct {
	ID       uint   `json:"id"`
	Position int    `json:"position"`
	Name     string `json:"name"`
	Exp      uint   `json:"exp"`
	Rank     string `json:"rank"`
}
