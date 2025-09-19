package handlers

import "github.com/4otis/gamification-platform-alabuga/internal/services"

type HRHandler struct {
	hrService *services.HRService
}

func NewHRHandler(hrService *services.HRService) *HRHandler {
	return &HRHandler{
		hrService: hrService,
	}
}
