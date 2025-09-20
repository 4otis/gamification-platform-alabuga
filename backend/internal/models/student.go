package models

type Student struct {
	ID         uint   `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Patronymic string `json:"patronymic"`
	Login      string `json:"login"`
	Password   string `json:"password"`
	Exp        uint   `json:"exp"`
	Mana       uint   `json:"mana"`
	RankId     uint   `json:"rank_id"`
}
