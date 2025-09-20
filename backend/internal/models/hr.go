package models

type HR struct {
	ID         uint   `json:"id"`
	Login      string `json:"login"`
	Password   string `json:"password"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Patronymic string `json:"patronymic"`
}
