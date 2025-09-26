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

type MainHandler struct {
	studentService   services.StudentService
	missionService   services.MissionService
	courseService    services.CourseService
	rankingService   services.RankingService
	inventoryService services.InventoryService
}

func NewMainHandler(studentService services.StudentService,
	missionService services.MissionService,
	courseService services.CourseService,
	rankingService services.RankingService,
	inventoryService services.InventoryService) *MainHandler {
	return &MainHandler{
		studentService:   studentService,
		missionService:   missionService,
		courseService:    courseService,
		rankingService:   rankingService,
		inventoryService: inventoryService,
	}
}

// GetMainPage godoc
// @Summary Получить главную страницу студента
// @Description Возвращает данные для главной страницы студента: информацию о студенте, активные миссии, курсы и позицию в рейтинге
// @Tags Student
// @Accept  json
// @Produce  json
// @Param student_id path int true "ID студента"
// @Success 200 {object} student.MainResponse "Успешный ответ"
// @Failure 400 {object} dto.ErrorResponse "Неверный ID студента"
// @Failure 404 {object} dto.ErrorResponse "Студент не найден"
// @Failure 500 {object} dto.ErrorResponse "Внутренняя ошибка сервера"
// @Security ApiKeyAuth
// @Router /student/{student_id}/main/ [get]
func (h *MainHandler) GetMainPage(c *gin.Context) {
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

	missions, err := h.missionService.GetAvailableMissions(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	courses, err := h.courseService.GetAvailableCourses(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	position, err := h.rankingService.GetStudentPosition(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	leaderboard, err := h.rankingService.GetLeaderboard(c.Request.Context(), 10) // топ-10
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := student.MainResponse{
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
		Missions:    convertMissionsToDTO(missions),
		Courses:     convertCoursesToDTO(courses),
		CurPosition: position,
		Leaderboard: convertLeaderboardToDTO(leaderboard),
	}

	c.JSON(http.StatusOK, response)
}

// Вспомогательные функции для преобразования моделей в DTO
func convertItemsToDTO(items []*models.Item) []*student.ItemInfo {
	var result []*student.ItemInfo
	for _, i := range items {
		result = append(result, &student.ItemInfo{
			Name:     i.Name,
			FilePath: i.FilePath,
			MinExp:   i.MinExp,
			TypeName: i.Type.Name,
		})
	}
	return result
}

func convertMissionsToDTO(missions []*models.Mission) []*student.MissionInfo {
	var result []*student.MissionInfo
	for _, m := range missions {
		result = append(result, &student.MissionInfo{
			ID:         m.ID,
			Title:      m.Title,
			Descr:      m.Descr,
			ExpReward:  m.ExpReward,
			ManaReward: m.ManaReward,
		})
	}
	return result
}

func convertCoursesToDTO(courses []*models.Course) []*student.CourseInfo {
	var result []*student.CourseInfo
	for _, c := range courses {
		result = append(result, &student.CourseInfo{
			ID:    c.ID,
			Title: c.Title,
			Descr: c.Descr,
		})
	}
	return result
}

func convertLeaderboardToDTO(leaderboard []*services.LeaderboardEntry) []*student.LeaderboardEntry {
	var result []*student.LeaderboardEntry
	for _, l := range leaderboard {
		result = append(result, &student.LeaderboardEntry{
			ID:       l.Student.ID,
			Name:     l.Student.Name,
			Exp:      l.Student.Exp,
			Position: l.Position,
		})
	}
	return result
}
