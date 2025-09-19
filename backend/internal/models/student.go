package models

type Student struct {
	ID         uint   `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Patronymic string `json:"patronymic"`
	Exp        int    `json:"exp"`
	Mana       int    `json:"mana"`
	RandId     uint   `json:"rank_id"`
}
