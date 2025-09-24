package student

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/4otis/gamification-platform-alabuga/internal/dto/response/student"
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
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

// GetProfile godoc
// @Summary Получить профиль студента
// @Description Возвращает полную информацию о профиле студента: данные студента, навыки, артефакты и историю
// @Tags Student
// @Accept  json
// @Produce  json
// @Param student_id path int true "ID студента"
// @Success 200 {object} student.ProfileResponse "Успешный ответ"
// @Failure 400 {object} dto.ErrorResponse "Неверный ID студента"
// @Failure 404 {object} dto.ErrorResponse "Студент не найден"
// @Failure 500 {object} dto.ErrorResponse "Внутренняя ошибка сервера"
// @Security ApiKeyAuth
// @Router /student/{student_id}/profile [get]
func (h *ProfileHandler) GetProfile(c *gin.Context) {
	studentID, err := strconv.Atoi(c.Param("student_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid student ID"})
		return
	}

	studentData, err := h.studentService.GetStudentByID(c.Request.Context(), uint(studentID))
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error":   err.Error(),
				"message": fmt.Sprintf("Student by (id:%d) not found", studentID),
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	items, err := h.inventoryService.GetEquipedItems(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	skills, err := h.rankingService.GetSkills(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := student.ProfileResponse{
		Profile: &student.ProfileInfo{
			Student: &student.StudentInfo{
				ID:      studentData.ID,
				Name:    studentData.Name,
				Surname: studentData.Surname,
				Exp:     studentData.Exp,
				Rank:    studentData.Rank.Name,
			},
			EquipedItems: convertItemsToDTO(items),
		},
		Skills: convertSkillsToDTO(skills),
	}

	c.JSON(http.StatusOK, response)
}

func (h *ProfileHandler) GetMissionHistory(c *gin.Context) {

}

func convertSkillsToDTO(skills []*models.Skill) []*student.SkillInfo {
	var result []*student.SkillInfo
	for _, s := range skills {
		result = append(result, &student.SkillInfo{
			ID:    s.ID,
			Name:  s.Name,
			Score: s.Score,
		})
	}
	return result
}

// func convertCoursesToDTO(courses []*models.Course) []*student.CourseInfo {
// 	var result []*student.CourseInfo
// 	for _, c := range courses {
// 		result = append(result, &student.CourseInfo{
// 			ID:    c.ID,
// 			Title: c.Title,
// 			Descr: c.Descr,
// 		})
// 	}
// 	return result
// }
