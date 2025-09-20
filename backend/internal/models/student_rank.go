package models

type StudentRank struct {
	ID     uint   `json:"id"`
	Name   string `json:"name"`
	MinExp uint   `json:"min_exp"`
}