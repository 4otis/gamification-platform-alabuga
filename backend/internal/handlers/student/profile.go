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
	loggingService   services.LoggingService
}

func NewProfileHandler(studentService services.StudentService,
	inventoryService services.InventoryService,
	rankingService services.RankingService,
	loggingService services.LoggingService) *ProfileHandler {
	return &ProfileHandler{
		studentService:   studentService,
		inventoryService: inventoryService,
		rankingService:   rankingService,
		loggingService:   loggingService,
	}
}

// GetProfile godoc
// @Summary Получить профиль студента
// @Description Возвращает полную информацию о профиле студента: данные студента, навыки, артефакты и историю
// @Tags [ STUDENT ] Profile
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

	skills, err := h.rankingService.GetSkillsByStudentID(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	artifacts, err := h.rankingService.GetArtifactsByStudentID(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	transactions, err := h.loggingService.GetTransactionByStudentID(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := student.ProfileResponse{
		Profile: &student.ProfileInfo{
			Student: &student.StudentInfo{
				ID:         studentData.ID,
				Name:       studentData.Name,
				Surname:    studentData.Surname,
				Patronymic: studentData.Patronymic,
				Exp:        studentData.Exp,
				Rank:       studentData.Rank.Name,
			},
			EquipedItems: convertItemsToDTO(items),
		},
		Skills:       convertStudentsSkillsToDTO(skills),
		Artifacts:    convertArtifactsToDTO(artifacts),
		Transactions: convertTransactionsToDTO(transactions),
	}

	c.JSON(http.StatusOK, response)
}

func (h *ProfileHandler) GetMissionHistory(c *gin.Context) {

}

func convertMissionsSkillsToDTO(skills []*models.MissionsSkills) []*student.SkillInfo {
	var result []*student.SkillInfo
	for _, s := range skills {
		result = append(result, &student.SkillInfo{
			ID:    s.ID,
			Name:  s.Skill.Name,
			Score: s.ScoreReward,
		})
	}
	return result
}

func convertStudentsSkillsToDTO(skills []*models.StudentsSkills) []*student.SkillInfo {
	var result []*student.SkillInfo
	for _, s := range skills {
		result = append(result, &student.SkillInfo{
			ID:    s.ID,
			Name:  s.Skill.Name,
			Score: s.Score,
		})
	}
	return result
}

func convertArtifactsToDTO(artifacts []*models.Artifact) []*student.ArtifactInfo {
	var result []*student.ArtifactInfo
	for _, a := range artifacts {
		result = append(result, &student.ArtifactInfo{
			ID:       a.ID,
			Title:    a.Title,
			Descr:    a.Descr,
			FilePath: a.FilePath,
			RarityID: a.RarityID,
			Rarity:   a.Rarity.Name,
		})
	}
	return result
}

func convertTransactionsToDTO(transactions []*services.TransactionEntry) []*student.TransactionInfo {
	var result []*student.TransactionInfo
	for _, t := range transactions {
		result = append(result, &student.TransactionInfo{
			Position:  t.Position,
			Timestamp: t.Timestamp,
			Title:     t.Title,
			Descr:     t.Descr,
			Type:      t.Type,
			Mana:      t.Mana,
			Skills:    convertMissionsSkillsToDTO(t.Skills),
			Artifact: &student.ArtifactInfo{
				ID:       t.Artifact.ID,
				Title:    t.Artifact.Title,
				Descr:    t.Artifact.Descr,
				FilePath: t.Artifact.FilePath,
				RarityID: t.Artifact.RarityID,
				Rarity:   t.Artifact.Rarity.Name,
			},
		})
	}
	return result
}
