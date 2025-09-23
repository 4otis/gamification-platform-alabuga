package student

import (
	"github.com/4otis/gamification-platform-alabuga/internal/services"
	"github.com/gin-gonic/gin"
)

type ProfileHandler struct {
	studentService   services.StudentService
	inventoryService services.InventoryService
	rankingService   services.RankingService
}

func NewProfileHandler(studentService services.StudentService,
	inventoryService services.InventoryService,
	rankingService services.RankingService) *ProfileHandler {
	return &ProfileHandler{
		studentService:   studentService,
		inventoryService: inventoryService,
		rankingService:   rankingService,
	}
}

func (h *ProfileHandler) GetProfile(c *gin.Context) {

}

func (h *ProfileHandler) GetMissionHistory(c *gin.Context) {

}
