package models

type Student struct {
	ID         uint   `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Patronymic string `json:"patronymic"`
	Login      string `json:"login"`
	Password   string `json:"password"`
	Exp        int    `json:"exp"`
	Mana       int    `json:"mana"`
	RankId     uint   `json:"rank_id"`
}
